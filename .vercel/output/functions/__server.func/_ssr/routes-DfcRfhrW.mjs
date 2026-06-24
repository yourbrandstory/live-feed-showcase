import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { a as Pause, i as Play, n as VolumeX, r as Volume2, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DfcRfhrW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = require_react_dom();
var reels = [
	{
		id: 1,
		video: "/assets/reel1-Ck5NJD68.mp4",
		title: "Reel 1",
		tag: "UGC",
		views: "12.4K",
		gradient: "linear-gradient(135deg,#ff5f8f 0%,#ff2d75 50%,#b81d6b 100%)",
		live: true,
		avatar: "MA",
		author: "@maya.ave"
	},
	{
		id: 2,
		video: "/assets/reel2-BWpRfZfl.mp4",
		title: "Reel 2",
		tag: "Product",
		views: "8.1K",
		gradient: "linear-gradient(135deg,#8a5cff 0%,#5b2bd1 60%,#2a1280 100%)",
		avatar: "JL",
		author: "@jordan.lab"
	},
	{
		id: 3,
		video: "/assets/reel3-D3aO2QwH.mov",
		title: "Reel 3",
		tag: "Brand",
		views: "21.7K",
		gradient: "linear-gradient(135deg,#3aa6ff 0%,#1f6dff 60%,#0b3aa8 100%)",
		live: true,
		avatar: "SO",
		author: "@studio.os"
	}
];
function useResponsiveCardConfig() {
	const [config, setConfig] = (0, import_react.useState)({
		width: 248,
		height: 440,
		offset: 190,
		containerHeight: 520
	});
	(0, import_react.useEffect)(() => {
		const update = () => {
			const w = window.innerWidth;
			if (w < 640) setConfig({
				width: 220,
				height: 391,
				offset: 140,
				containerHeight: 410
			});
			else if (w < 1024) setConfig({
				width: 260,
				height: 462,
				offset: 165,
				containerHeight: 480
			});
			else setConfig({
				width: 248,
				height: 440,
				offset: 190,
				containerHeight: 520
			});
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);
	return config;
}
function getPosition(idx, activeIndex, total) {
	if (idx === activeIndex) return 0;
	if (idx === (activeIndex - 1 + total) % total) return -1;
	if (idx === (activeIndex + 1) % total) return 1;
	return null;
}
function HeroReelCarousel({ reels, activeIndex, progress, reduced, onNext, onPrev, onCenterClick }) {
	const total = reels.length;
	const cardConfig = useResponsiveCardConfig();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative flex w-full items-center justify-center",
		style: {
			height: cardConfig.containerHeight,
			perspective: "1200px"
		},
		children: reels.map((reel, idx) => {
			const pos = getPosition(idx, activeIndex, total);
			if (pos === null) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelCardVideo, {
				reel,
				pos,
				isCenter: pos === 0,
				progress,
				reduced,
				cardWidth: cardConfig.width,
				cardHeight: cardConfig.height,
				offset: cardConfig.offset,
				onClick: () => {
					if (pos === -1) onPrev();
					else if (pos === 1) onNext();
					else onCenterClick(idx);
				}
			}, reel.id);
		})
	});
}
var ReelCardVideo = (0, import_react.memo)(function ReelCardVideo({ reel, pos, isCenter, progress, reduced, cardWidth, cardHeight, offset, onClick }) {
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		videoRef.current?.play().catch(() => {});
	}, []);
	const translateX = pos * offset;
	const scale = isCenter ? 1 : .95;
	const blur = isCenter ? 0 : 2;
	const opacity = isCenter ? 1 : .8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		onClick,
		tabIndex: isCenter ? 0 : -1,
		"aria-hidden": !isCenter,
		className: "absolute overflow-hidden rounded-[22px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2",
		style: {
			width: cardWidth,
			height: cardHeight,
			zIndex: isCenter ? 30 : 10,
			cursor: isCenter ? "pointer" : "pointer"
		},
		initial: false,
		animate: {
			x: translateX,
			scale,
			filter: `blur(${blur}px)`,
			opacity,
			boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
		},
		transition: {
			duration: .55,
			ease: [
				.4,
				0,
				.2,
				1
			]
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src: reel.video,
				preload: "metadata",
				loop: true,
				muted: true,
				playsInline: true,
				className: "absolute inset-0 h-full w-full object-cover",
				style: { borderRadius: "22px" }
			}),
			isCenter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0",
				style: {
					height: "50%",
					background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
					borderRadius: "0 0 22px 22px"
				}
			}),
			isCenter && !reduced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "lr-sheen pointer-events-none absolute top-0 h-full w-1/3",
				style: {
					background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
					animation: "lr-sheen 3.2s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 right-3 top-3 z-10 flex items-start justify-between",
				children: [reel.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "lr-pulse inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white",
					style: { animation: reduced ? void 0 : "lr-pulse 1.6s ease-in-out infinite" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-white" }), "Live"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur",
					children: reel.tag
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base leading-none",
						"aria-hidden": true,
						children: "⋯"
					})
				})]
			}),
			isCenter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "lr-bob absolute left-1/2 top-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xl",
				style: {
					transform: "translate(-50%, -50%)",
					animation: reduced ? void 0 : "lr-bob 2.4s ease-in-out infinite"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 24 24",
					className: "h-6 w-6",
					fill: "currentColor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5v14l11-7z" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 z-10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-neutral-900 ring-2 ring-white/60",
						children: reel.avatar
					}), isCenter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold text-white",
							children: reel.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-[11px] text-white/75",
							children: [
								reel.author,
								" · ",
								reel.views,
								" views"
							]
						})]
					})]
				}), isCenter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-1 w-full overflow-hidden rounded-full bg-white/25",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-white",
						style: {
							width: `${Math.round(progress * 100)}%`,
							transition: reduced ? void 0 : "width 120ms linear"
						}
					})
				})]
			})
		]
	});
});
function VideoPreviewModal({ isOpen, onClose, videoSrc }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const videoRef = (0, import_react.useRef)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const [isMuted, setIsMuted] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			setIsPlaying(true);
			setIsMuted(false);
			setProgress(0);
		}
	}, [isOpen, videoSrc]);
	(0, import_react.useEffect)(() => {
		const el = videoRef.current;
		if (!el || !isOpen) return;
		if (isPlaying) el.play().catch(() => {});
		else el.pause();
		return () => {
			if (el) el.pause();
		};
	}, [isPlaying, isOpen]);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		const handler = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [isOpen, onClose]);
	const togglePlay = (0, import_react.useCallback)(() => setIsPlaying((p) => !p), []);
	const toggleMute = (0, import_react.useCallback)(() => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted;
			setIsMuted(videoRef.current.muted);
		}
	}, []);
	const handleTimeUpdate = (0, import_react.useCallback)(() => {
		const el = videoRef.current;
		if (el && el.duration) setProgress(el.currentTime / el.duration);
	}, []);
	const handleBackdropClick = (0, import_react.useCallback)((e) => {
		if (e.target === e.currentTarget) onClose();
	}, [onClose]);
	if (!mounted) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2 },
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4",
		onClick: handleBackdropClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .92,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			exit: {
				scale: .92,
				opacity: 0
			},
			transition: {
				duration: .25,
				ease: [
					.4,
					0,
					.2,
					1
				]
			},
			className: "relative flex max-h-full max-w-full flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Close preview",
					className: "absolute -top-12 right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					src: videoSrc,
					className: "max-h-[80vh] max-w-[95vw] rounded-lg shadow-2xl",
					onClick: togglePlay,
					onTimeUpdate: handleTimeUpdate,
					onLoadedMetadata: handleTimeUpdate,
					loop: true,
					playsInline: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex w-full max-w-[95vw] items-center gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: togglePlay,
							"aria-label": isPlaying ? "Pause" : "Play",
							className: "flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15",
							children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleMute,
							"aria-label": isMuted ? "Unmute" : "Mute",
							className: "flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15",
							children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 w-full overflow-hidden rounded-full bg-white/25",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-white transition-[width] duration-200",
									style: { width: `${Math.round(progress * 100)}%` }
								})
							})
						})
					]
				})
			]
		})
	}) }), document.body);
}
function usePrefersReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setReduced(mq.matches);
		onChange();
		mq.addEventListener?.("change", onChange);
		return () => mq.removeEventListener?.("change", onChange);
	}, []);
	return reduced;
}
function LiveReels() {
	const reduced = usePrefersReducedMotion();
	const [index, setIndex] = (0, import_react.useState)(0);
	const total = reels.length;
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [modalVideo, setModalVideo] = (0, import_react.useState)("");
	const [progress, setProgress] = (0, import_react.useState)(0);
	const rafRef = (0, import_react.useRef)(null);
	const intervalRef = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			console.log("Auto slide running");
			setIndex((prev) => {
				const next = (prev + 1) % reels.length;
				console.log("Current reel:", next);
				return next;
			});
			setProgress(0);
		}, 6e3);
		intervalRef.current = interval;
		return () => clearInterval(interval);
	}, []);
	(0, import_react.useEffect)(() => {
		if (reduced) {
			setProgress(1);
			return;
		}
		let start = performance.now();
		const tick = (t) => {
			setProgress((t - start) % 6e3 / 6e3);
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [reduced, index]);
	const restartInterval = (0, import_react.useCallback)(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			console.log("Auto slide running");
			setIndex((prev) => {
				const next = (prev + 1) % reels.length;
				console.log("Current reel:", next);
				return next;
			});
			setProgress(0);
		}, 6e3);
	}, []);
	const openModal = (0, import_react.useCallback)((reelIndex) => {
		setModalVideo(reels[reelIndex].video);
		setModalOpen(true);
	}, []);
	const closeModal = (0, import_react.useCallback)(() => {
		setModalOpen(false);
	}, []);
	const handleNext = (0, import_react.useCallback)(() => {
		setIndex((prev) => (prev + 1) % total);
		setProgress(0);
		restartInterval();
	}, [total, restartInterval]);
	const handlePrev = (0, import_react.useCallback)(() => {
		setIndex((prev) => (prev - 1 + total) % total);
		setProgress(0);
		restartInterval();
	}, [total, restartInterval]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative w-full overflow-hidden bg-white",
		style: {
			backgroundImage: "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",
			backgroundSize: "44px 44px"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative inline-block h-2 w-2 rounded-full",
								style: {
									backgroundColor: "#19c6e6",
									boxShadow: "0 0 0 4px rgba(25,198,230,0.18), 0 0 12px rgba(25,198,230,0.9)"
								}
							}), "Live reel wall"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-6 text-[44px] leading-[1.02] tracking-tight text-neutral-900 sm:text-[56px] lg:text-[72px]",
							style: {
								fontFamily: "var(--font-serif)",
								fontWeight: 700
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: "One feed."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: "Every reel."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative inline-block italic",
									children: ["always live.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										"aria-hidden": true,
										viewBox: "0 0 320 24",
										className: "absolute left-0 right-0 -bottom-3 h-5 w-full",
										preserveAspectRatio: "none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M4 16 C 60 4, 140 22, 210 10 S 300 12, 316 6",
											fill: "none",
											stroke: "#19c6e6",
											strokeWidth: "4",
											strokeLinecap: "round"
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 max-w-xl text-base leading-relaxed sm:text-lg",
							style: {
								color: "#5b5b5b",
								fontFamily: "var(--font-sans)"
							},
							children: "A constant stream of your freshest creatives — UGC, product drops, brand stories — playing the moment they go live, all in one view."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2",
								children: ["See it live ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2",
								children: "How it works"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs tracking-wide text-neutral-400",
							children: "Auto-synced. Always fresh. Built for you."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-2 flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroReelCarousel, {
						reels,
						activeIndex: index,
						progress,
						reduced,
						onNext: handleNext,
						onPrev: handlePrev,
						onCenterClick: openModal
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handlePrev,
							"aria-label": "Previous reel",
							className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "←"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleNext,
							"aria-label": "Next reel",
							className: "inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19c6e6] focus-visible:ring-offset-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "→"
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoPreviewModal, {
				isOpen: modalOpen,
				onClose: closeModal,
				videoSrc: modalVideo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
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
      ` })
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveReels, {})
	});
}
//#endregion
export { Index as component };
