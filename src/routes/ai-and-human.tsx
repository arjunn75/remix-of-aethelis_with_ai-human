import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/mindrobotics/index.html?raw";

export const Route = createFileRoute("/ai-and-human")({
  head: () => ({
    meta: [
      { title: "Mind Robotics — Intelligent Robotic Automation" },
      {
        name: "description",
        content:
          "Mind Robotics builds intelligent robotic automation for modern manufacturing.",
      },
      { property: "og:title", content: "Mind Robotics — Intelligent Robotic Automation" },
      {
        property: "og:description",
        content:
          "Mind Robotics builds intelligent robotic automation for modern manufacturing.",
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