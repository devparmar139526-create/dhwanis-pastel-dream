import { useEffect, useState } from "react";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-brand-cream/90 to-brand-pink/60 backdrop-blur-sm">
      <div className="text-center p-6 rounded-2xl glass glow-soft">
        <div className="mx-auto mb-4 size-14 rounded-full bg-gradient-to-tr from-brand-pink to-brand-lavender animate-pulse shadow-lg" />
        <h2 className="text-2xl font-semibold text-foreground">Baking your cake... 🎂</h2>
        <p className="mt-2 text-sm text-foreground/70 animate-pulse">Adding sprinkles, lighting candles ✨</p>
      </div>
    </div>
  );
}
