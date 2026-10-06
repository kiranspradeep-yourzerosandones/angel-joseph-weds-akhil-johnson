'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BibleVerse() {
  const ref = useScrollReveal<HTMLElement>();
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section
      ref={(node) => {
        containerRef.current = node;
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="relative py-32 md:py-44 px-6 bg-[#6b1f2e] text-[#fdf8f0] overflow-hidden"
    >
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a86a]/20 blur-[140px]"
      />

      <motion.div style={{ y }} className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-10"
        >
          <svg className="w-12 h-12 text-[#c9a86a] heartbeat" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
          </svg>
        </motion.div>

        <p className="reveal reveal-blur font-display text-xs tracking-[0.5em] text-[#c9a86a] uppercase mb-8">
          A Sacred Promise
        </p>

        <blockquote className="reveal reveal-blur reveal-delay-2 font-display text-2xl md:text-4xl tracking-[0.15em] uppercase leading-relaxed text-[#fdf8f0] mb-8">
          &ldquo;What therefore God hath joined together, let not man put
          asunder.&rdquo;
        </blockquote>

        <p className="reveal reveal-blur reveal-delay-3 font-display text-sm tracking-[0.3em] text-[#c9a86a] uppercase">
          — Matthew 19:6
        </p>

        <div className="reveal reveal-scale reveal-delay-4 gold-divider mt-12" />
      </motion.div>
    </section>
  );
}