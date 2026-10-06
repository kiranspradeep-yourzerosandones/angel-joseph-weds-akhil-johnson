'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Footer() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="py-24 px-6 bg-[#fdf8f0] paper-texture text-center"
    >
      <div className="max-w-3xl mx-auto">
        <div className="reveal reveal-scale flex justify-center mb-8">
          <svg
            className="w-10 h-10 text-[#c9a86a] heartbeat"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
          </svg>
        </div>

        <p className="reveal reveal-blur reveal-delay-1 font-display text-2xl md:text-4xl tracking-[0.3em] uppercase text-[#6b1f2e] mb-6">
          Angel &amp; Akhil
        </p>

        <p className="reveal reveal-blur reveal-delay-2 text-[#3a2a1f]/70 italic mb-2">
          &ldquo;A cord of three strands is not quickly broken.&rdquo;
        </p>
        <p className="reveal reveal-blur reveal-delay-2 font-display text-xs tracking-[0.3em] text-[#c9a86a] uppercase mt-2">
          — Ecclesiastes 4:12
        </p>

        <div className="reveal reveal-delay-3 gold-divider my-10" />

        <p className="reveal reveal-delay-4 text-xs font-display tracking-[0.3em] text-[#6b1f2e]/50 uppercase">
          14 · 02 · 2025 &nbsp;·&nbsp; Kochi, Kerala
        </p>
        <p className="reveal reveal-delay-4 mt-4 text-sm text-[#3a2a1f]/50">
          With love &amp; blessings from both families
        </p>
      </div>
    </footer>
  );
}