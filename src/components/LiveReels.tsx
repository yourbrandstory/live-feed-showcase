import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Reel = {
  tag: string;
  title: string;
  views: string;
  gradient: string;
  live?: boolean;
  avatar: string;
  author: string;
};

const REELS: Reel[] = [
  {
    tag: "UGC",
    title: "Summer drop unboxing",
    views: "12.4K",
    gradient: "linear-gradient(135deg,#ff5f8f 0%,#ff2d75 50%,#b81d6b 100%)",
    live: true,
    avatar: "MA",
    author: "@maya.ave",
  },
  {
    tag: "Product",
    title: "Behind the new launch",
    views: "8.1K",
    gradient: "linear-gradient(135deg,#8a5cff 0%,#5b2bd1 60%,#2a1280 100%)",
    avatar: "JL",
    author: "@jordan.lab",
  },
  {
    tag: "Brand",
    title: "Studio tour, ep. 04",
    views: "21.7K",
    gradient: "linear-gradient(135deg,#3aa6ff 0%,#1f6dff 60%,#0b3aa8 100%)",
    live: true,
    avatar: "SO",
    author: "@studio.os",
  },
  {
    tag: "UGC",
    title: "First impressions",
    views: "5.9K",
    gradient: "linear-gradient(135deg,#19e6c6 0%,#0ea5a1 60%,#055e60 100%)",
    avatar: "RV",
    author: "@rae.visuals",
  },
  {
    tag: "Drop",
    title: "Sunset capsule preview",
    views: "34.2K",
    gradient: "linear-gradient(135deg,#ffb347 0%,#ff7a3d 55%,#c0392b 100%)",
    live: true,
    avatar: "LK",
    author: "@lume.kit",
  },
  {
    tag: "Story",
    title: "How it’s made",
    views: "9.6K",
    gradient: "linear-gradient(135deg,#ff6ad5 0%,#a16bff 50%,#4f46e5 100%)",
    avatar: "NB",
    author: "@north.bay",
  },
];

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
  const [paused, setPaused] = useState(false);
  const total = REELS.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(next, 3600);
    return () => window.clearInterval(id);
  }, [next, paused, reduced]);

  // progress 0..1 for the center card, loops every 3.6s
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    let start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) % 3600;
      setProgress(elapsed / 3600);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, index]);

  const visible = useMemo(() => {
    const left = (index - 1 + total) % total;
    const right = (index + 1) % total;
    return [
      { reel: REELS[left], pos: -1, key: `l-${left}` },
      { reel: REELS[index], pos: 0, key: `c-${index}` },
      { reel: REELS[right], pos: 1, key: `r-${right}` },
    ];
  }, [index, total]);

  const onCardClick = (pos: number) => {
    if (pos === -1) prev();
    else if (pos === 1) next();
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      {/* soft blue radial glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(25,198,230,0.28), rgba(25,198,230,0) 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
        {/* LEFT: copy */}
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
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700 }}
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
            A constant stream of your freshest creatives — UGC, product drops,
            brand stories — playing the moment they go live, all in one view.
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

        {/* RIGHT: coverflow */}
        <div
          className="order-2 flex flex-col items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative flex h-[460px] w-full items-center justify-center sm:h-[520px]"
            style={{ perspective: "1200px" }}
          >
            {visible.map(({ reel, pos, key }) => (
              <ReelCard
                key={key}
                reel={reel}
                pos={pos}
                progress={progress}
                reduced={reduced}
                onClick={() => onCardClick(pos)}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous reel"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next reel"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

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

function ReelCard({
  reel,
  pos,
  progress,
  reduced,
  onClick,
}: {
  reel: Reel;
  pos: -1 | 0 | 1 | number;
  progress: number;
  reduced: boolean;
  onClick: () => void;
}) {
  const isCenter = pos === 0;
  const translateX = pos * 190;
  const scale = isCenter ? 1 : 0.8;
  const blur = isCenter ? 0 : 3.5;
  const opacity = isCenter ? 1 : 0.5;
  const z = isCenter ? 30 : 10;

  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={isCenter ? -1 : 0}
      aria-hidden={!isCenter}
      className="absolute overflow-hidden rounded-[22px] text-left transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
      style={{
        width: 248,
        height: 440,
        background: reel.gradient,
        transform: `translateX(${translateX}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        opacity,
        zIndex: z,
        boxShadow: isCenter
          ? "0 30px 60px -20px rgba(0,0,0,0.45), 0 8px 24px -8px rgba(0,0,0,0.25)"
          : "0 12px 30px -12px rgba(0,0,0,0.35)",
        cursor: isCenter ? "default" : "pointer",
      }}
    >
      {/* sheen */}
      {isCenter && !reduced && (
        <span
          aria-hidden
          className="lr-sheen pointer-events-none absolute top-0 h-full w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            animation: "lr-sheen 3.2s ease-in-out infinite",
          }}
        />
      )}

      {/* top row */}
      <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
        {reel.live ? (
          <span
            className="lr-pulse inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
            style={{ animation: reduced ? undefined : "lr-pulse 1.6s ease-in-out infinite" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            Live
          </span>
        ) : (
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            {reel.tag}
          </span>
        )}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
          <span className="text-base leading-none" aria-hidden>⋯</span>
        </span>
      </div>

      {/* play button (center only) */}
      {isCenter && (
        <span
          aria-hidden
          className="lr-bob absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xl"
          style={{
            transform: "translate(-50%, -50%)",
            animation: reduced ? undefined : "lr-bob 2.4s ease-in-out infinite",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}

      {/* bottom block */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-neutral-900 ring-2 ring-white/60"
          >
            {reel.avatar}
          </span>
          {isCenter && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{reel.title}</p>
              <p className="truncate text-[11px] text-white/75">
                {reel.author} · {reel.views} views
              </p>
            </div>
          )}
        </div>

        {isCenter && (
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white"
              style={{
                width: `${Math.round(progress * 100)}%`,
                transition: reduced ? undefined : "width 120ms linear",
              }}
            />
          </div>
        )}
      </div>
    </button>
  );
}

export default LiveReels;