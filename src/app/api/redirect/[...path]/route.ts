import { redirectTarget } from "@/lib/old-urls";

/**
 * Receives every request that matches no page or file (see `rewrites.fallback` in next.config.ts)
 * and sends it permanently to the most relevant page – or answers 404 for non-pages.
 */
async function handle(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const target = redirectTarget("/" + path.join("/"));
  if (!target) return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return new Response(null, {
    status: 301,
    headers: { location: new URL(target, request.url).toString(), "cache-control": "public, max-age=86400" },
  });
}

export { handle as GET, handle as HEAD };
