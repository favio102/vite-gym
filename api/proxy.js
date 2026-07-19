export const config = { runtime: "edge" };

const HOSTS = {
  youtube: "youtube-search-and-download.p.rapidapi.com",
};

// Allowlist of upstream paths the app actually calls. Anything else is rejected
// so the proxy cannot be used to reach arbitrary (and more expensive) endpoints.
const ALLOWED_PATHS = {
  youtube: ["search"],
};

const UPSTREAM_TIMEOUT_MS = 8000;

const jsonError = (status, code, message) =>
  new Response(JSON.stringify({ error: { code, message } }), {
    status,
    headers: { "content-type": "application/json" },
  });

// The proxy spends a paid API quota, so it must only serve our own pages.
// Browsers send Referer on same-origin fetches and Origin on cross-origin ones;
// direct scripted calls (curl and friends) send neither and are rejected.
const isSameOrigin = (req) => {
  const self = new URL(req.url).host;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const callerHost = origin || referer;
  if (!callerHost) return false;

  try {
    return new URL(callerHost).host === self;
  } catch {
    return false;
  }
};

export default async function handler(req) {
  const url = new URL(req.url);
  const provider = url.searchParams.get("provider");
  const path = url.searchParams.get("path") ?? "";

  const host = HOSTS[provider];
  if (!host) {
    return jsonError(400, "UNKNOWN_PROVIDER", "Unknown provider");
  }

  if (!isSameOrigin(req)) {
    return jsonError(403, "FORBIDDEN_ORIGIN", "Requests must come from the app");
  }

  if (!ALLOWED_PATHS[provider].includes(path)) {
    return jsonError(400, "UNKNOWN_PATH", "Unsupported path");
  }

  // forward the upstream query string, minus our internal routing params
  const upstreamParams = new URLSearchParams(url.search);
  upstreamParams.delete("provider");
  upstreamParams.delete("path");
  const search = upstreamParams.toString();

  const target = `https://${host}/${path}${search ? `?${search}` : ""}`;

  let upstream;
  try {
    upstream = await fetch(target, {
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("Upstream request failed", {
      provider,
      path,
      message: error.message,
    });
    return jsonError(504, "UPSTREAM_TIMEOUT", "The video service did not respond");
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") || "application/json",
      "cache-control": "public, max-age=300, s-maxage=86400",
    },
  });
}
