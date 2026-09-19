import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/aethelis.html?raw";

// Mirrors the original server: any unknown path falls back to the site document.
export const Route = createFileRoute("/$")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
