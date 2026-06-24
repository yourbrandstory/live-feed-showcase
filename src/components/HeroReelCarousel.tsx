import { useRef, useEffect, memo, useState } from "react";
import { motion } from "framer-motion";
import type { ReelItem } from "@/data/reels";

interface CardConfig {
  width: number;
  height: number;
  offset: number;
  containerHeight: number;
}

function useResponsiveCardConfig(): CardConfig {
  const [config, setConfig] = useState<CardConfig>({
    width: 248,
    height: 440,
    offset: 190,
    containerHeight: 520,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setConfig({ width: 220, height: 391, offset: 140, containerHeight: 410 });
      } else if (w < 1024) {
        setConfig({ width: 260, height: 462, offset: 165, containerHeight: 480 });
      } else {
        setConfig({ width: 248, height: 440, offset: 190, containerHeight: 520 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
}

interface HeroReelCarouselProps {
  reels: ReelItem[];
  activeIndex: number;
  progress: number;
  reduced: boolean;
  onNext: () => void;
  onPrev: () => void;
  onCenterClick: (index: number) => void;
}

function getPosition(idx: number, activeIndex: number, total: number): number | null {
  if (idx === activeIndex) return 0;
  if (idx === (activeIndex - 1 + total) % total) return -1;
  if (idx === (activeIndex + 1) % total) return 1;
  return null;
}

export function HeroReelCarousel({
  reels,
  activeIndex,
  progress,
  reduced,
  onNext,
  onPrev,
  onCenterClick,
}: HeroReelCarouselProps) {
  const total = reels.length;
  const cardConfig = useResponsiveCardConfig();

  return (
    <div
      className="relative flex w-full items-center justify-center"
      style={{ height: cardConfig.containerHeight, perspective: "1200px" }}
    >
      {reels.map((reel, idx) => {
        const pos = getPosition(idx, activeIndex, total);
        if (pos === null) return null;
        return (
          <ReelCardVideo
            key={reel.id}
            reel={reel}
            pos={pos}
            isCenter={pos === 0}
            progress={progress}
            reduced={reduced}
            cardWidth={cardConfig.width}
            cardHeight={cardConfig.height}
            offset={cardConfig.offset}
            onClick={() => {
              if (pos === -1) onPrev();
              else if (pos === 1) onNext();
              else onCenterClick(idx);
            }}
          />
        );
      })}
    </div>
  );
}

const ReelCardVideo = memo(function ReelCardVideo({
  reel,
  pos,
  isCenter,
  progress,
  reduced,
  cardWidth,
  cardHeight,
  offset,
  onClick,
}: {
  reel: ReelItem;
  pos: number;
  isCenter: boolean;
  progress: number;
  reduced: boolean;
  cardWidth: number;
  cardHeight: number;
  offset: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const translateX = pos * offset;
  const scale = isCenter ? 1 : 0.95;
  const blur = isCenter ? 0 : 2;
  const opacity = isCenter ? 1 : 0.8;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      tabIndex={isCenter ? 0 : -1}
      aria-hidden={!isCenter}
      className="absolute overflow-hidden rounded-[22px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2"
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex: isCenter ? 30 : 10,
        cursor: isCenter ? "pointer" : "pointer",
      }}
      initial={false}
      animate={{
        x: translateX,
        scale: scale,
        filter: `blur(${blur}px)`,
        opacity: opacity,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      <video
        ref={videoRef}
        src={reel.video}
        preload="metadata"
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ borderRadius: "22px" }}
      />

      {isCenter && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "50%",
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
            borderRadius: "0 0 22px 22px",
          }}
        />
      )}

      {isCenter && !reduced && (
        <span
          aria-hidden
          className="lr-sheen pointer-events-none absolute top-0 h-full w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            animation: "lr-sheen 3.2s ease-in-out infinite",
          }}
        />
      )}

      <div className="absolute left-3 right-3 top-3 z-10 flex items-start justify-between">
        {reel.live ? (
          <span
            className="lr-pulse inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
            style={{
              animation: reduced ? undefined : "lr-pulse 1.6s ease-in-out infinite",
            }}
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
          <span className="text-base leading-none" aria-hidden>
            ⋯
          </span>
        </span>
      </div>

      {isCenter && (
        <span
          aria-hidden
          className="lr-bob absolute left-1/2 top-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xl"
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

      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-neutral-900 ring-2 ring-white/60">
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
    </motion.button>
  );
});
