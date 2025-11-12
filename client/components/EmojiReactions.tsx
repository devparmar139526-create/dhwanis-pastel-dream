import { useCallback } from "react";

export default function EmojiReactions() {
  const spawn = useCallback((emoji: string) => (e: React.MouseEvent) => {
    const x = e.clientX; const y = e.clientY;
    const el = document.createElement("div");
    el.textContent = emoji;
    el.style.position = "fixed";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = "24px";
    el.style.transition = "transform 1.2s ease, opacity 1.2s ease";
    el.style.zIndex = "30";
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = "translate(-50%, -140px) scale(1.6)";
      el.style.opacity = "0";
    });
    setTimeout(() => el.remove(), 1300);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={spawn("💖")} className="px-4 py-2 rounded-full bg-brand-pink/70 shadow">Heart</button>
      <button onClick={spawn("🎂")} className="px-4 py-2 rounded-full bg-brand-cream shadow">Cake</button>
      <button onClick={spawn("🎈")} className="px-4 py-2 rounded-full bg-brand-lavender text-white shadow">Balloon</button>
    </div>
  );
}
