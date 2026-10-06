'use client';

import { useMemo } from 'react';

interface PetalSpec {
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  shape: 'flower' | 'petal';
}

const COLORS = [
  '#e91e63',
  '#c2185b',
  '#f06292',
  '#ec407a',
  '#ad1457',
  '#f8bbd0',
];

export default function BougainvilleaPetals({
  count = 16,
}: {
  count?: number;
}) {
  const petals = useMemo<PetalSpec[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: ((i * 37) % 100),
      size: 8 + ((i * 5) % 12),
      delay: ((i * 3) % 14),
      duration: 14 + ((i * 2) % 10),
      color: COLORS[i % COLORS.length],
      rotate: (i * 47) % 360,
      shape: i % 3 === 0 ? 'flower' : 'petal',
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `bougainFall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.shape === 'flower' ? (
            <svg viewBox="0 0 20 20" className="w-full h-full">
              {[0, 120, 240].map((a) => (
                <ellipse
                  key={a}
                  cx={10}
                  cy={6}
                  rx={4}
                  ry={6}
                  fill={p.color}
                  opacity={0.85}
                  transform={`rotate(${a} 10 10)`}
                />
              ))}
              <circle cx={10} cy={10} r={1.5} fill="#fdf8f0" opacity={0.9} />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <path
                d="M2 10 Q 10 0 18 10 Q 10 20 2 10 Z"
                fill={p.color}
                opacity={0.8}
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}