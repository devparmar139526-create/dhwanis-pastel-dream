export default function FloatingElements() {
  const items = [
    { char: "💗", delay: "0s", left: "10%", top: "20%" },
    { char: "🦋", delay: "1s", left: "80%", top: "30%" },
    { char: "✨", delay: "2s", left: "20%", top: "60%" },
    { char: "🎵", delay: "1.5s", left: "70%", top: "70%" },
    { char: "⭐", delay: "0.5s", left: "40%", top: "15%" },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {items.map((i, idx) => (
        <div
          key={idx}
          style={{ left: i.left, top: i.top, animationDelay: i.delay }}
          className="absolute text-3xl md:text-5xl animate-float-slow"
        >
          <span className="drop-shadow-[0_0_10px_hsla(var(--brand-pink)/0.6)]">{i.char}</span>
        </div>
      ))}
    </div>
  );
}
