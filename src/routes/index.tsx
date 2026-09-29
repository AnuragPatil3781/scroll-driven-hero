import { createFileRoute } from "@tanstack/react-router";
import ScrollVisual from "@/components/ScrollVisual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome Itz Fizz — Scroll Experience" },
      {
        name: "description",
        content:
          "A scroll-driven cinematic hero: a futuristic vehicle animated entirely by your scroll, built with GSAP ScrollTrigger.",
      },
      { property: "og:title", content: "Welcome Itz Fizz — Scroll Experience" },
      {
        property: "og:description",
        content:
          "Crafting scroll-driven experiences where motion meets precision. A GSAP ScrollTrigger animation study.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ScrollVisual />;
}
