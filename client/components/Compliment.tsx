import { useEffect, useMemo, useState } from "react";

const COMPLIMENTS = [
  "Dhwani, your smile can fix Mondays 🌷",
  "You're sunshine in human form ☀️💗",
  "You deserve confetti every day 🎉💕",
  "Your laughter is a melody everyone loves 🎶",
  "You make ordinary days sparkle ✨",
];

export default function Compliment() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * COMPLIMENTS.length));
  const target = useMemo(() => COMPLIMENTS[idx], [idx]);

  useEffect(() => {
    setText("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="text-center">
      <p className="text-lg md:text-xl font-medium min-h-[2.5rem]">{text}</p>
      <button
        className="mt-3 px-4 py-1.5 rounded-full bg-brand-cream text-foreground/80 hover:bg-brand-pink/60 transition shadow"
        onClick={() => setIdx((n) => (n + 1) % COMPLIMENTS.length)}
      >
        New compliment ✨
      </button>
    </div>
  );
}
