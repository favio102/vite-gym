export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const subpath = url.pathname.replace(/^\/api\/exercisedb\/?/, "");
  const target = `https://exercisedb.p.rapidapi.com/${subpath}${url.search}`;

  const upstream = await fetch(target, {
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
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
