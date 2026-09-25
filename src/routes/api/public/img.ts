import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/img")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url).searchParams.get("url") ?? "";
        if (!url.startsWith("https://www.datocms-assets.com/")) {
          return new Response("Bad request", { status: 400 });
        }
        const r = await fetch(url);
        return new Response(r.body, {
          status: r.status,
          headers: {
            "Content-Type": r.headers.get("content-type") ?? "image/png",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
