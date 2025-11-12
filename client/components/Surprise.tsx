import { useRef, useState } from "react";
import SafeLottie from "./SafeLottie";

export default function Surprise() {
  const [show, setShow] = useState(false);
  const playerRef = useRef<any>(null);

  const onClick = () => {
    setShow(true);
    setTimeout(() => {
      playerRef.current?.play && playerRef.current.play();
    }, 50);
  };

  return (
    <div className="text-center">
      {!show ? (
        <button onClick={onClick} className="px-6 py-3 rounded-full bg-brand-lavender text-white shadow glow-soft hover:opacity-90">
          Tap for a Surprise 🎀
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-xl font-semibold">You are the reason everyone smiles today, Dhwani 💖</p>
          <div className="relative h-56">
            <SafeLottie
              src="https://lottie.host/1a3c6c48-9f23-4a4b-9cfa-2d9bfe0b75c8/DK7jT7YcQO.json"
              style={{ width: "100%", height: "100%" }}
              autoplay
              loop
            />
          </div>
        </div>
      )}
    </div>
  );
}
