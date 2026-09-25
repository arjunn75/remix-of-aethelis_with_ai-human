import { createFileRoute } from "@tanstack/react-router";

// Serves images for the AI and Human page from the project's own /media folder.
export const Route = createFileRoute("/api/public/img")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url).searchParams.get("url") ?? "";
        if (!url.startsWith("/media/")) {
          return new Response("Bad request", { status: 400 });
        }
        return new Response(null, { status: 302, headers: { Location: url } });
      },
    },
  },
});
