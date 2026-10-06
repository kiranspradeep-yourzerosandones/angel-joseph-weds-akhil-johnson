'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const { progress } = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[950] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#6b1f2e] via-[#c9a86a] to-[#6b1f2e] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}