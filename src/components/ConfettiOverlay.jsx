import { useEffect, useRef } from "react";

const COLORS = ["#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#f87171", "#a78bfa", "#facc15"];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

export default function ConfettiOverlay({ show, count = 300, duration = 4000, onDone }) {
  const confettiRef = useRef();

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      if (onDone) onDone();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onDone]);

  if (!show) return null;

  return (
    <div
      ref={confettiRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ width: "100vw", height: "100vh" }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = randomBetween(0, 100);
        const delay = randomBetween(0, 1.5);
        const rotate = randomBetween(0, 360);
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = randomBetween(9, 25);
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              position: "absolute",
              top: "-5%",
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              background: color,
              borderRadius: "2px",
              opacity: 0.9,
              transform: `rotate(${rotate}deg)`,
              animation: `confetti-fall 2s cubic-bezier(0.42,0.00,0.58,1.00) ${delay}s forwards`
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          to {
            top: 105vh;
            transform: rotate(360deg);
            opacity: 0.75;
          }
        }
      `}</style>
    </div>
  );
}