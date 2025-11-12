import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // --- 1. PASTE YOUR .MP3 LINK HERE ---
  const tracks = [
    {
      src: "/music/happy-birthday.mp3",
      title: "Happy Birthday",
    },
  ];

  // This useEffect is ONLY for cleanup when you leave the page
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []); // Runs only on mount and unmount

  // This is the main function that runs when you click "Play"
  const toggle = async () => {
    if (!available) return; // Don't try if all tracks failed

    // If audio is already loaded, just toggle play/pause
    if (audioRef.current) {
      try {
        if (playing) {
          audioRef.current.pause();
          setPlaying(false);
        } else {
          await audioRef.current.play();
          setPlaying(true);
        }
      } catch (e) {
        console.error("Error toggling audio:", e);
        setAvailable(false);
      }
      return;
    }

    // --- First play logic (audio is not loaded yet) ---
    setPlaying(true); // Set to playing optimistically

    let idx = 0;
    const tryLoad = (i: number) => {
      const src = tracks[i]?.src;
      
      // Safety check: If src is missing or is still the placeholder, stop.
      if (!src || src === "PASTE_YOUR_REAL_MP3_LINK_HERE") {
        console.error("Audio source is missing or is still the placeholder.");
        setAvailable(false);
        setPlaying(false);
        return;
      }

      const a = new Audio(src);
      a.crossOrigin = "anonymous"; // Good for CDN content
      a.preload = "auto";
      a.volume = 0.55;
      a.loop = true; // --- This makes it loop! ---

      const onCanPlay = () => {
        cleanUp();
        audioRef.current = a; // Save the working audio element
        
        // Now we play, which is allowed because we're inside the click handler
        a.play().catch(e => {
          console.error("Play failed:", e);
          setAvailable(false);
          setPlaying(false);
        });
      };

      const onError = (e: any) => {
        console.error(`Failed to load track ${i}:`, src, e);
        cleanUp();
        
        // If we've tried all tracks, mark as unavailable
        if (i >= tracks.length - 1) {
          console.error("All audio tracks failed to load");
          setAvailable(false);
          setPlaying(false);
          return;
        }
        
        idx += 1; // Move to next track index
        tryLoad(idx); // Try loading the next track
      };

      const cleanUp = () => {
        a.removeEventListener("canplay", onCanPlay);
        a.removeEventListener("error", onError);
      };

      console.log(`Attempting to load track ${i}:`, src);
      a.addEventListener("canplay", onCanPlay);
      a.addEventListener("error", onError);
      a.load();
    };

    tryLoad(idx); // Start loading from the first track (index 0)
  };

  return (
    <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full glass glow-soft">
      <button
        onClick={toggle}
        className="px-3 py-1.5 rounded-full bg-brand-pink/70 text-foreground shadow hover:bg-brand-pink transition"
        aria-label={playing ? "Pause music" : "Play music"}
        disabled={!available}
      >
        {playing ? "Pause ⏸" : "Play ▶"}
      </button>
      <span className="text-sm text-foreground/80">{available ? "Soft birthday tune" : "Audio unavailable"}</span>
    </div>
  );
}