import { useCallback, useEffect, useRef, useState } from "react";
import { reels } from "@/data/reels";
import { HeroReelCarousel } from "@/components/HeroReelCarousel";
import { VideoPreviewModal } from "@/components/VideoPreviewModal";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export function LiveReels() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const total = reels.length;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState("");

  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Auto slide running");
      setIndex((prev) => {
        const next = (prev + 1) % reels.length;
        console.log("Current reel:", next);
        return next;
      });
      setProgress(0);
    }, 6000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    let start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) % 6000;
      setProgress(elapsed / 6000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, index]);

  const restartInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      console.log("Auto slide running");
      setIndex((prev) => {
        const next = (prev + 1) % reels.length;
        console.log("Current reel:", next);
        return next;
      });
      setProgress(0);
    }, 6000);
  }, []);

  const openModal = useCallback((reelIndex: number) => {
    setModalVideo(reels[reelIndex].video);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
    setProgress(0);
    restartInterval();
  }, [total, restartInterval]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
    restartInterval();
  }, [total, restartInterval]);

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
        <div className="order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 backdrop-blur">
            <span
              className="relative inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor: "#19c6e6",
                boxShadow: "0 0 0 4px rgba(25,198,230,0.18), 0 0 12px rgba(25,198,230,0.9)",
              }}
            />
            Live reel wall
          </span>

          <h2
            className="mt-6 text-[44px] leading-[1.02] tracking-tight text-neutral-900 sm:text-[56px] lg:text-[72px]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            <span className="block">One feed.</span>
            <span className="block">Every reel.</span>
            <span className="relative inline-block italic">
              always live.
              <svg
                aria-hidden
                viewBox="0 0 320 24"
                className="absolute left-0 right-0 -bottom-3 h-5 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 16 C 60 4, 140 22, 210 10 S 300 12, 316 6"
                  fill="none"
                  stroke="#19c6e6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p
            className="mt-8 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "#5b5b5b", fontFamily: "var(--font-sans)" }}
          >
            A constant stream of your freshest creatives — UGC, product drops, brand stories —
            playing the moment they go live, all in one view.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
            >
              See it live <span aria-hidden>→</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
            >
              How it works
            </button>
          </div>

          <p className="mt-6 text-xs tracking-wide text-neutral-400">
            Auto-synced. Always fresh. Built for you.
          </p>
        </div>

        <div className="order-2 flex flex-col items-center">
          <HeroReelCarousel
            reels={reels}
            activeIndex={index}
            progress={progress}
            reduced={reduced}
            onNext={handleNext}
            onPrev={handlePrev}
            onCenterClick={openModal}
          />

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous reel"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reel"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

      <VideoPreviewModal isOpen={modalOpen} onClose={closeModal} videoSrc={modalVideo} />

      <style>{`
        @keyframes lr-bob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        @keyframes lr-sheen {
          0% { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(220%) skewX(-18deg); }
        }
        @keyframes lr-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.55); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lr-bob, .lr-sheen, .lr-pulse { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

export default LiveReels;
