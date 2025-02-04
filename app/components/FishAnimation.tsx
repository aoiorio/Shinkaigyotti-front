"use client";
import type React from "react"

const FishAnimation: React.FC = () => {
  const fishEmojis = ["🐠", "🐡", "🦈", "🐙", "🦑", "🐳", "🐬", "🦀", "🦞", "🦐"]

  return (
    <div className="fish-container fixed inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`fish fish-${i + 1}`}
          style={
            {
              "--speed": `${Math.random() * 30 + 20}s`,
              "--delay": `${Math.random() * -30}s`,
              "--top": `${Math.random() * 100}%`,
            } as React.CSSProperties
          }
        >
          {fishEmojis[Math.floor(Math.random() * fishEmojis.length)]}
        </div>
      ))}
      <style jsx>{`
        @keyframes swim {
          0% {
            transform: translateX(100vw) rotate(0deg);
          }
          50% {
            transform: translateX(50vw) rotate(5deg) translateY(20px);
          }
          100% {
            transform: translateX(-100%) rotate(0deg);
          }
        }
        .fish {
          position: absolute;
          font-size: 24px;
          opacity: 0.7;
          animation: swim var(--speed) linear var(--delay) infinite;
          top: var(--top);
        }
        .fish-1, .fish-2, .fish-3 { font-size: 48px; }
        .fish-4, .fish-5, .fish-6 { font-size: 36px; }
        .fish-7, .fish-8, .fish-9 { font-size: 28px; }
        .fish-10, .fish-11, .fish-12 { font-size: 20px; }
        .fish-13, .fish-14, .fish-15 { font-size: 16px; }
      `}</style>
    </div>
  )
}

export default FishAnimation

