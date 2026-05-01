export const config = { runtime: "edge" };

const HOSTS = {
  exercisedb: "exercisedb.p.rapidapi.com",
  youtube: "youtube-search-and-download.p.rapidapi.com",
};

export default async function handler(req) {
  const url = new URL(req.url);
  const provider = url.searchParams.get("provider");
  const path = url.searchParams.get("path") ?? "";

  const host = HOSTS[provider];
  if (!host) {
    return new Response(JSON.stringify({ error: "unknown provider" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // forward the upstream query string, minus our internal routing params
  const upstreamParams = new URLSearchParams(url.search);
  upstreamParams.delete("provider");
  upstreamParams.delete("path");
  const search = upstreamParams.toString();

  const target = `https://${host}/${path}${search ? `?${search}` : ""}`;

  const upstream = await fetch(target, {
    headers: {
      "X-RapidAPI-Host": host,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") || "application/json",
      "cache-control": "public, max-age=300, s-maxage=86400",
    },
  });
}
