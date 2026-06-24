import reel1 from "@/assets/reels/reel1.mp4";
import reel2 from "@/assets/reels/reel2.mp4";
import reel3 from "@/assets/reels/reel3.mov";

export type ReelItem = {
  id: number;
  video: string;
  title: string;
  tag: string;
  views: string;
  gradient: string;
  live?: boolean;
  avatar: string;
  author: string;
};

export const reels: ReelItem[] = [
  {
    id: 1,
    video: reel1,
    title: "Reel 1",
    tag: "UGC",
    views: "12.4K",
    gradient: "linear-gradient(135deg,#ff5f8f 0%,#ff2d75 50%,#b81d6b 100%)",
    live: true,
    avatar: "MA",
    author: "@maya.ave",
  },
  {
    id: 2,
    video: reel2,
    title: "Reel 2",
    tag: "Product",
    views: "8.1K",
    gradient: "linear-gradient(135deg,#8a5cff 0%,#5b2bd1 60%,#2a1280 100%)",
    avatar: "JL",
    author: "@jordan.lab",
  },
  {
    id: 3,
    video: reel3,
    title: "Reel 3",
    tag: "Brand",
    views: "21.7K",
    gradient: "linear-gradient(135deg,#3aa6ff 0%,#1f6dff 60%,#0b3aa8 100%)",
    live: true,
    avatar: "SO",
    author: "@studio.os",
  },
];
