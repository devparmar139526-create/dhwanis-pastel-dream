import { useEffect, useRef } from "react";

interface Confetti {
  x: number; y: number; r: number; c: string; s: number; a: number; v: number;
}

const COLORS = [
  "#f8b4d9", // pink
  "#c7b7ff", // lavender
  "#ffd6e7", // light pink
  "#fff1f7", // cream pink
  "#e7dcff", // pale lavender
];

export default function ConfettiBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const make = (): Confetti => ({
      x: Math.random() * W,
      y: -10 - Math.random() * H,
      r: 2 + Math.random() * 4,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      s: 0.5 + Math.random() * 1.2,
      a: Math.random() * Math.PI * 2,
      v: 0.5 + Math.random() * 0.8,
    });

    let particles: Confetti[] = Array.from({ length: 120 }, make);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.y += p.s;
        p.x += Math.sin(p.a) * p.v;
        p.a += 0.01;
        if (p.y > H + 10) {
          p.y = -10; p.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    draw();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 -z-10" aria-hidden />;
}
