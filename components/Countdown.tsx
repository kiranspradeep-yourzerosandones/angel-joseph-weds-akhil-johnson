'use client';

import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Target: 10 January 2027, 10:30 AM (local time)
 * Change the string below to adjust the date/time.
 * Format: YYYY-MM-DDTHH:MM:SS
 */
const TARGET = new Date('2027-01-10T10:30:00').getTime();

export default function Countdown() {
  const ref = useScrollReveal<HTMLElement>();
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section
      ref={ref}
      className="py-32 md:py-44 px-6 bg-gradient-to-b from-[#fdf8f0] via-[#f7e8d5] to-[#fdf8f0]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="reveal reveal-blur font-display text-xs tracking-[0.5em] text-[#6b1f2e]/60 uppercase mb-6">
          Counting Down To Forever
        </p>

        <h2 className="reveal reveal-scale reveal-delay-1 font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e] mb-4">
          The Big Day
        </h2>

        <div className="reveal reveal-delay-2 gold-divider" />

        <div className="reveal reveal-delay-3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {items.map((it, i) => (
            <div
              key={it.label}
              className="relative bg-[#fdf8f0]/80 backdrop-blur border border-[#c9a86a]/30 rounded-2xl py-8 px-4 hover:border-[#c9a86a]/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="font-display text-4xl md:text-5xl tracking-[0.1em] text-[#6b1f2e] mb-3 tabular-nums">
                {String(it.value).padStart(2, '0')}
              </div>
              <div className="font-display text-[10px] tracking-[0.35em] text-[#6b1f2e]/60 uppercase">
                {it.label}
              </div>
              {i < items.length - 1 && (
                <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-[#c9a86a] text-2xl">
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}