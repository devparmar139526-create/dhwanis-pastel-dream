import { useEffect, useState } from "react";

export default function SafeLottie({ src, className, style, autoplay = true, loop = true, speed = 1 }: { src: string; className?: string; style?: any; autoplay?: boolean; loop?: boolean; speed?: number; }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Try to fetch the resource to ensure it's available, CORS-friendly and valid JSON.
    (async () => {
      try {
        const res = await fetch(src, { method: "GET", mode: "cors" });
        if (cancelled) return;
        if (!res.ok) {
          setOk(false);
          return;
        }
        const ct = res.headers.get("content-type") || "";
        // Try parsing JSON body to inspect assets (reject if videos referenced)
        try {
          const json = await res.clone().json();
          // Inspect for assets referencing video formats
          const assets = json?.assets;
          const hasVideo = Array.isArray(assets) && assets.some((a: any) => {
            const path = (a?.u || a?.p || "").toString().toLowerCase();
            return /\.mp4$|\.webm$|\.mov$/.test(path);
          });
          if (hasVideo) {
            setOk(false);
          } else {
            setOk(true);
          }
        } catch (err) {
          // as a fallback: if it isn't JSON, but content-type said json, treat as failure
          setOk(false);
        }
      } catch (e) {
        if (!cancelled) setOk(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (ok === null) {
    return <div className={className} style={style} aria-hidden />;
  }

  if (!ok) {
    // Fallback: subtle animated hearts SVG
    return (
      <div className={className} style={style}>
        <svg viewBox="0 0 120 40" width="100%" height="100%" className="opacity-80">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#ffd6e7" />
              <stop offset="1" stopColor="#e7dcff" />
            </linearGradient>
          </defs>
          <g>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="url(#g)">✨</text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    // @ts-ignore - lottie-player is a web component loaded in index.html
    <lottie-player
      src={src}
      background="transparent"
      speed={speed}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    ></lottie-player>
  );
}
