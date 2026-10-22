/**
 * Same-origin image endpoint. Lets our browser trace the pixels of the
 * original credited artwork instead of guessing imaginary SVG contours.
 */
const SOURCE = "https://i.ebayimg.com/images/g/Ey0AAOSwCndh6qnQ/s-l500.jpg";
export const runtime = "nodejs";
export async function GET() {
  try {
    const upstream = await fetch(SOURCE, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioImagePreview/1.0)" }
    });
    if (!upstream.ok) return new Response("Artwork unavailable", { status: 502 });
    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) return new Response("Not an image", { status: 502 });
    return new Response(await upstream.arrayBuffer(), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch {
    return new Response("Artwork source unavailable", { status: 502 });
  }
}
