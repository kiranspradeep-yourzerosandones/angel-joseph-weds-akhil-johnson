'use client';

import { useMemo } from 'react';

interface PetalConfig {
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
}

const COLORS = ['#e8c4b8', '#c9a86a', '#f5d5c8', '#d8b98a'];

export default function FallingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 6 + Math.random() * 10,
      delay: Math.random() * 12,
      duration: 12 + Math.random() * 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 360,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.55,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}