'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface BibleVerse {
  language: 'english' | 'malayalam';
  reference: string;
  text: string;
}

const verses: BibleVerse[] = [
  {
    language: 'english',
    reference: 'Philippians 2:2',
    text: '"then make my joy complete by being like-minded, having the same love, being one in spirit and of one mind"',
  },
  {
    language: 'malayalam',
    reference: 'ഫിലിപ്പിയർ 2:2',
    text: '"ഒരേ ചിന്താഗതിയും ഒരേ സ്നേഹവും ആത്മാവിൽ ഐക്യവും ഒരേ മനസ്സും പുലർത്തിക്കൊണ്ട് എന്റെ സന്തോഷം പൂർണ്ണമാക്കുവിൻ."',
  },
];

export default function BibleVerse() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [currentVerse, setCurrentVerse] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  // Optimized cycle handler
  const handleCycle = useCallback(() => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  }, []);

  // Optimized auto-cycle
  useEffect(() => {
    intervalRef.current = setInterval(handleCycle, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleCycle]);

  // Handle manual click with debounce
  const handleDotClick = useCallback((index: number) => {
    setCurrentVerse(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Restart cycle after manual selection
    intervalRef.current = setInterval(handleCycle, 6000);
  }, [handleCycle]);

  const verse = verses[currentVerse];

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-44 px-6 bg-[#6b1f2e] text-[#fdf8f0] overflow-hidden"
    >
      {/* Glow - optimized with willChange */}
      <motion.div
        style={{ scale: glowScale, willChange: 'transform' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a86a]/20 blur-[140px]"
      />

      <motion.div style={{ y, willChange: 'transform' }} className="relative max-w-3xl mx-auto text-center">
        {/* Cross Icon - Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-10"
          aria-hidden
        >
          <svg className="w-12 h-12 text-[#c9a86a]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
          </svg>
        </motion.div>

        {/* Section Label - Animated based on verse */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${currentVerse}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-display text-xs tracking-[0.5em] text-[#c9a86a] uppercase mb-8"
            style={{ willChange: 'opacity, transform' }}
          >
            {currentVerse === 0 ? 'A Sacred Promise' : 'ഒരു വിശുദ്ധ വാഗ്ദാനം'}
          </motion.p>
        </AnimatePresence>

        {/* Bible Verse Container - Fixed Height */}
        <div className="h-[220px] md:h-[240px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={currentVerse}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="font-display text-2xl md:text-4xl tracking-[0.15em] leading-relaxed text-[#fdf8f0] px-4"
              style={{
                fontStyle: verse.language === 'malayalam' ? 'normal' : 'italic',
                willChange: 'opacity, transform, filter',
              }}
            >
              {verse.text}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Reference - Fixed Width to prevent overlap */}
        <div className="h-[40px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`ref-${currentVerse}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="font-display text-sm tracking-[0.3em] text-[#c9a86a] uppercase whitespace-nowrap"
              style={{ willChange: 'opacity, transform' }}
            >
              — {verse.reference}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Language Indicator Dots - Optimized */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3 }}
        >
          {verses.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className="w-2 h-2 rounded-full cursor-pointer transition-colors"
              animate={{
                backgroundColor: currentVerse === index ? '#c9a86a' : '#c9a86a40',
                scale: currentVerse === index ? 1.3 : 1,
              }}
              transition={{ duration: 0.25, type: 'spring', bounce: 0.4 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              aria-label={`Switch to ${verses[index].language} version`}
              style={{ willChange: 'transform, background-color' }}
            />
          ))}
        </motion.div>

        {/* Divider - Optimized */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#c9a86a] to-transparent"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Language Label - Fixed Height */}
        <div className="h-[24px] flex items-center justify-center mt-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={`lang-${currentVerse}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[10px] tracking-[0.3em] text-[#c9a86a]/60 uppercase"
              style={{ willChange: 'opacity' }}
            >
              {verse.language === 'english' ? 'English' : 'മലയാളം'}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}