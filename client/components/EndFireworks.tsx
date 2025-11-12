import { useEffect, useRef } from "react";
import SafeLottie from "./SafeLottie";

export default function EndFireworks() {
  const playerRef = useRef<any>(null);
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom) {
        playerRef.current?.play && playerRef.current.play();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 w-28 h-28 pointer-events-none opacity-80">
      <SafeLottie
        src="https://lottie.host/2bdf3a1e-1d8b-4c4c-9f31-3c62af3816a5/qU1K7PcgQ9.json"
        style={{ width: "100%", height: "100%" }}
        autoplay={false}
        loop
      />
    </div>
  );
}
