import { useMemo, useRef, useState } from "react";

const PAGES = [
  {
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80&auto=format&fit=crop",
    caption: "Your smile lights every room ✨",
  },
  {
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&q=80&auto=format&fit=crop",
    caption: "Butterflies follow your laughter 🦋",
  },
  {
    img: "https://images.unsplash.com/photo-1541782814450-c4b3cb9d3f5f?w=1200&q=80&auto=format&fit=crop",
    caption: "Confetti feels jealous of your sparkle 🎊",
  },
  {
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
    caption: "Every moment with you is a page to keep 💕",
  },
];

export default function Flipbook() {
  const [page, setPage] = useState(0);
  const flipSound = useMemo(() => new Audio("https://cdn.pixabay.com/download/audio/2021/10/01/audio_9f9bfc2a35.mp3?filename=page-flip-110186.mp3"), []);
  const turning = useRef(false);

  const next = () => {
    if (turning.current) return;
    setPage((p) => {
      if (p < PAGES.length - 1) flipSound.currentTime = 0, flipSound.play();
      return Math.min(p + 1, PAGES.length - 1);
    });
  };
  const prev = () => {
    if (turning.current) return;
    setPage((p) => {
      if (p > 0) flipSound.currentTime = 0, flipSound.play();
      return Math.max(p - 1, 0);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      <div className="relative h-[360px] md:h-[460px] perspective-[2000px]">
        {PAGES.map((p, i) => {
          const flipped = i <= page;
          return (
            <div
              key={i}
              className="absolute inset-0 origin-left [transform-style:preserve-3d] transition-transform duration-700"
              style={{ transform: `translateZ(${i}px) rotateY(${flipped ? -180 : 0}deg)` }}
            >
              <div className="absolute inset-0 bg-white/70 glass rounded-xl overflow-hidden border border-white/50 shadow-lg">
                <img src={p.img} alt="scrapbook" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-cream/90 to-transparent">
                  <p className="font-medium text-foreground/90">{p.caption}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-brand-cream/80 rounded-xl backface-hidden" />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button onClick={prev} className="px-4 py-2 rounded-full bg-brand-lavender text-white shadow hover:opacity-90">Prev</button>
        <span className="text-sm text-foreground/70">Page {page + 1} / {PAGES.length}</span>
        <button onClick={next} className="px-4 py-2 rounded-full bg-brand-pink text-foreground shadow hover:opacity-90">Next</button>
      </div>
    </div>
  );
}
