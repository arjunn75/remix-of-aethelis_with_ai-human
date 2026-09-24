import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/financial-literacy.html?raw";

export const Route = createFileRoute("/financial-literacy")({
  head: () => ({
    meta: [
      { title: "Financial Literacy — Understand the Rules of Money" },
      {
        name: "description",
        content: "Financial literacy makes the invisible rules of money easier to understand.",
      },
      { property: "og:title", content: "Financial Literacy — Understand the Rules of Money" },
      {
        property: "og:description",
        content: "Understand the rules of money and make confident financial choices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
