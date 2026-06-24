import { createFileRoute } from "@tanstack/react-router";
import { LiveReels } from "@/components/LiveReels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Next Chapter — Live reels" },
      { name: "description", content: "A constant stream of your freshest creatives — UGC, product drops, brand stories — all in one live view." },
      { property: "og:title", content: "Next Chapter — Live reels" },
      { property: "og:description", content: "A constant stream of your freshest creatives — UGC, product drops, brand stories — all in one live view." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-white">
      <LiveReels />
    </main>
  );
}
