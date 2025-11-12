import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    dotRef.current = dot;

    const move = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      for (let i = 0; i < 2; i++) {
        const s = document.createElement("span");
        s.className = "sparkle";
        s.style.left = `${e.clientX + (Math.random() * 10 - 5)}px`;
        s.style.top = `${e.clientY + (Math.random() * 10 - 5)}px`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      dot.remove();
    };
  }, []);

  return null;
}
