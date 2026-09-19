import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/aethelis.html?raw";

// The site is a pre-built static export; serve its HTML document directly at "/".
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
