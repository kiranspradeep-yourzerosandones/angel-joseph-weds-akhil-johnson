'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
  initials?: [string, string];
  date?: string;
}

const GOLD = '#c9a86a';
const GOLD_LIGHT = '#e8cf9c';
const CREAM = '#fdf8f0';
const WINE = '#6b1f2e';
const WINE_DEEP = '#4a1420';
const WINE_DARKER = '#2d0d15';

const MESSAGES = [
  'Preparing something beautiful',
  'Arranging the flowers',
  'Lighting the candles',
  'Saving you a seat',
  'Writing your story',
];

const R = 45;
const CIRC = 2 * Math.PI * R;

/** Optimized particle system - reduced calculations */
function useFloatingParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const secondary = ((i * 12347 + 61829) % 233280) / 233280;
        
        return {
          id: i,
          startX: r * 100,
          startY: -20 - r * 30,
          size: 4 + r * 8,
          delay: r * 6,
          duration: 10 + r * 8,
          waveAmplitude: 30 + secondary * 80,
          rotation: r * 720,
          opacity: 0.15 + r * 0.35,
        };
      }),
    [count]
  );
}

/** Optimized orbs - fewer and simpler */
function useFloatingOrbs(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 15485 + 24599) % 233280;
        const r = seed / 233280;
        
        return {
          id: i,
          startX: r * 100,
          startY: 50 + r * 50,
          size: 8 + r * 16,
          delay: r * 4,
          duration: 12 + r * 10,
          opacity: 0.08 + r * 0.12,
          blur: 8 + r * 12,
        };
      }),
    [count]
  );
}

const letterIn = (from: 'left' | 'right'): Variants => ({
  hidden: { 
    opacity: 0, 
    x: from === 'left' ? -80 : 80, 
    filter: 'blur(12px)',
  },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { 
      delay: 0.35, 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] 
    },
  },
});

const ampersandAnimation: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0, 
    rotate: -120,
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      delay: 1.15, 
      duration: 1.1, 
      type: 'spring', 
      bounce: 0.5,
      damping: 8,
    },
  },
};

// Memoized particle component
const FloatingParticle = motion(({ p, wavePoints }: any) => (
  <div
    className="pointer-events-none absolute"
    style={{
      left: `${p.startX}%`,
      top: `${p.startY}%`,
      width: p.size,
      height: p.size * 0.8,
    }}
  >
    <div
      className="w-full h-full rounded-full"
      style={{
        background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
        borderRadius: '50% 50% 50% 0',
        transform: `rotate(45deg)`,
        boxShadow: `0 2px 8px ${GOLD}40`,
      }}
    />
  </div>
));

// Memoized orb component
const FloatingOrb = motion(({ orb }: any) => (
  <div
    aria-hidden
    className="pointer-events-none absolute rounded-full"
    style={{
      left: `${orb.startX}%`,
      top: `${orb.startY}%`,
      width: orb.size,
      height: orb.size,
      background: `radial-gradient(circle at 30% 30%, ${GOLD_LIGHT}40, ${GOLD}20)`,
      filter: `blur(${orb.blur}px)`,
      opacity: orb.opacity,
      willChange: 'transform',
    }}
  />
));

export default function Loader({
  onComplete,
  initials = ['A', 'A'],
  date,
}: LoaderProps) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'progress' | 'complete'>('intro');

  const doneRef = useRef(onComplete);
  useEffect(() => {
    doneRef.current = onComplete;
  }, [onComplete]);

  // Reduce particles significantly for performance
  const particles = useFloatingParticles(reduce ? 0 : 12);
  const orbs = useFloatingOrbs(reduce ? 0 : 3);

  // Optimized progress update - use requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastUpdateTime = Date.now();
    const updateInterval = 95;

    const updateProgress = () => {
      const now = Date.now();
      if (now - lastUpdateTime >= updateInterval) {
        setProgress((p) => {
          const increment = Math.random() * 4 + 1.2;
          const newProgress = Math.min(100, p + increment);
          
          if (newProgress >= 100) {
            setPhase('complete');
          } else if (newProgress >= 20) {
            setPhase('progress');
          }
          
          return newProgress;
        });
        lastUpdateTime = now;
      }

      if (progress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress]);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [progress]);

  const pct = Math.round(progress);
  const messageIndex = Math.min(
    MESSAGES.length - 1, 
    Math.floor(progress / 20)
  );
  const message = MESSAGES[messageIndex];
  const exitEase = [0.76, 0, 0.24, 1] as const;

  // Pre-calculated wave points to avoid recalculation
  const wavePointsMap = useMemo(() => {
    return new Map(particles.map(p => [
      p.id,
      [
        0,
        Math.sin(0) * p.waveAmplitude,
        Math.sin(Math.PI / 4) * p.waveAmplitude,
        Math.sin(Math.PI / 2) * p.waveAmplitude,
        Math.sin((3 * Math.PI) / 4) * p.waveAmplitude,
        Math.sin(Math.PI) * p.waveAmplitude,
        Math.sin((5 * Math.PI) / 4) * p.waveAmplitude,
        Math.sin((3 * Math.PI) / 2) * p.waveAmplitude,
        0,
      ]
    ]))
  }, [particles]);

  return (
    <AnimatePresence onExitComplete={() => doneRef.current()}>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-b from-[#3d1620] via-[#6b1f2e] to-[#2d0d15]"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${pct} percent`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 1.5 } }}
          style={{ willChange: 'opacity' }}
        >
          {/* Diagonal gradient accent */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${GOLD}15 0%, transparent 50%, ${WINE_DARKER}40 100%)`,
              }}
            />
          </div>

          {/* Floating orbs - reduced count */}
          {orbs.map((orb) => (
            <motion.div
              key={`orb-${orb.id}`}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${orb.startX}%`,
                top: `${orb.startY}%`,
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle at 30% 30%, ${GOLD_LIGHT}40, ${GOLD}20)`,
                filter: `blur(${orb.blur}px)`,
                opacity: orb.opacity,
                willChange: 'transform',
              }}
              initial={{
                y: 0,
                x: 0,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.cos(orb.id) * 40, 0],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            />
          ))}

          {/* Organic floating petals - optimized */}
          {particles.map((p) => {
            const wavePoints = wavePointsMap.get(p.id) || [];

            return (
              <motion.div
                key={`particle-${p.id}`}
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  left: `${p.startX}%`,
                  top: `${p.startY}%`,
                  width: p.size,
                  height: p.size * 0.8,
                  willChange: 'transform, opacity',
                }}
                initial={{
                  y: 0,
                  x: 0,
                  rotate: 0,
                  opacity: p.opacity,
                }}
                animate={{
                  y: [0, 1200],
                  x: wavePoints,
                  rotate: [0, p.rotation],
                  opacity: [p.opacity, p.opacity * 0.8, p.opacity * 0.5, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                    borderRadius: '50% 50% 50% 0',
                    transform: `rotate(45deg)`,
                    boxShadow: `0 2px 8px ${GOLD}40`,
                  }}
                />
              </motion.div>
            );
          })}

          {/* Optimized curtain halves */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${WINE_DARKER}, ${WINE} 60%, ${GOLD}08)`,
              boxShadow: `inset -2px 0 24px ${GOLD}22`,
              willChange: 'transform',
            }}
            initial={{ x: 0 }}
            exit={{ x: '-100%', transition: { duration: 1.2, delay: 0.4, ease: exitEase } }}
          >
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 1px,
                  ${CREAM} 1px,
                  ${CREAM} 2px
                )`,
              }} 
            />
          </motion.div>

          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none"
            style={{
              background: `linear-gradient(270deg, ${WINE_DARKER}, ${WINE} 60%, ${GOLD}08)`,
              boxShadow: `inset 2px 0 24px ${GOLD}22`,
              willChange: 'transform',
            }}
            initial={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 1.2, delay: 0.4, ease: exitEase } }}
          >
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 1px,
                  ${CREAM} 1px,
                  ${CREAM} 2px
                )`,
              }}
            />
          </motion.div>

          {/* Single optimized breathing glow */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
              style={{ 
                background: `${GOLD}20`,
                willChange: 'transform, opacity',
              }}
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            />
          )}

          {/* Corner brackets - simplified */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
            <motion.div
              key={c}
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                top: c[0] === 't' ? 20 : undefined,
                bottom: c[0] === 'b' ? 20 : undefined,
                left: c[1] === 'l' ? 20 : undefined,
                right: c[1] === 'r' ? 20 : undefined,
                width: 40,
                height: 40,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <svg 
                className="w-full h-full" 
                viewBox="0 0 40 40"
                fill="none"
                stroke={GOLD}
                strokeWidth="1"
                strokeOpacity="0.6"
              >
                {c === 'tl' && (
                  <>
                    <line x1="5" y1="5" x2="20" y2="5" />
                    <line x1="5" y1="5" x2="5" y2="20" />
                  </>
                )}
                {c === 'tr' && (
                  <>
                    <line x1="20" y1="5" x2="35" y2="5" />
                    <line x1="35" y1="5" x2="35" y2="20" />
                  </>
                )}
                {c === 'bl' && (
                  <>
                    <line x1="5" y1="20" x2="5" y2="35" />
                    <line x1="5" y1="35" x2="20" y2="35" />
                  </>
                )}
                {c === 'br' && (
                  <>
                    <line x1="35" y1="20" x2="35" y2="35" />
                    <line x1="20" y1="35" x2="35" y2="35" />
                  </>
                )}
              </svg>
            </motion.div>
          ))}

          {/* Centre stage */}
          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-4"
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5, ease: 'easeIn' } }}
          >
            <div className="relative flex h-56 w-56 items-center justify-center md:h-72 md:w-72">
              {/* Progress ring */}
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 100 100"
                aria-hidden
                style={{ willChange: 'filter' }}
              >
                <circle 
                  cx="50" 
                  cy="50" 
                  r={R} 
                  fill="none" 
                  stroke={`${GOLD}20`} 
                  strokeWidth="0.8" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="38" 
                  fill="none" 
                  stroke={`${GOLD}12`} 
                  strokeWidth="0.4" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  fill="none" 
                  stroke={`${GOLD}15`} 
                  strokeWidth="0.5" 
                />

                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={GOLD} />
                    <stop offset="100%" stopColor={GOLD_LIGHT} />
                  </linearGradient>
                </defs>

                <motion.circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  animate={{ strokeDashoffset: CIRC * (1 - progress / 100) }}
                  transition={{ duration: 0.25, ease: 'linear' }}
                  style={{ willChange: 'stroke-dashoffset' }}
                />
              </svg>

              {/* Orbiting spark */}
              <motion.div
                aria-hidden
                className="absolute inset-0"
                animate={{ rotate: progress * 3.6 }}
                transition={{ duration: 0.25, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <div
                  className="absolute left-1/2 top-[6%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ 
                      background: CREAM,
                      boxShadow: `
                        0 0 20px 6px ${GOLD}60,
                        0 0 40px 10px ${GOLD}30,
                        inset 0 0 8px ${CREAM}80
                      `,
                    }}
                  />
                </div>
              </motion.div>

              {/* Monogram */}
              <div className="flex items-center justify-center gap-1 md:gap-4">
                <motion.span
                  className="font-display text-6xl md:text-7xl font-light tracking-tight"
                  style={{ color: CREAM }}
                  variants={letterIn('left')}
                  initial="hidden"
                  animate="show"
                >
                  {initials[0]}
                </motion.span>

                <motion.span
                  className="font-display text-4xl md:text-5xl italic font-light"
                  style={{ color: GOLD }}
                  variants={ampersandAnimation}
                  initial="hidden"
                  animate="show"
                >
                  &amp;
                </motion.span>

                <motion.span
                  className="font-display text-6xl md:text-7xl font-light tracking-tight"
                  style={{ color: CREAM }}
                  variants={letterIn('right')}
                  initial="hidden"
                  animate="show"
                >
                  {initials[1]}
                </motion.span>
              </div>

              {/* Percentage display - optimized */}
              <motion.div
                className="absolute bottom-[20%] text-center"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ willChange: 'transform' }}
              >
                <p
                  className="font-display text-lg md:text-xl tabular-nums font-light"
                  style={{ color: GOLD }}
                >
                  {pct}
                </p>
                <p className="text-xs tracking-widest" style={{ color: `${GOLD}80` }}>
                  COMPLETE
                </p>
              </motion.div>
            </div>

            {/* Date line */}
            {date && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 1 }}
              >
                <p
                  className="font-display text-sm md:text-base font-light tracking-wider"
                  style={{ color: `${CREAM}90` }}
                >
                  {date}
                </p>
                <div 
                  className="mx-auto mt-2 w-8 h-px"
                  style={{ background: `${GOLD}60` }}
                />
              </motion.div>
            )}

            {/* Status messages */}
            <div className="mt-12 h-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <p
                    className="font-display text-sm md:text-base font-light italic tracking-wide"
                    style={{ color: `${CREAM}85` }}
                  >
                    {message}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Loading dots */}
            <motion.div
              className="mt-6 flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ 
                    background: GOLD,
                    willChange: 'transform, opacity',
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.7, 1.1, 0.7],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface LoaderProps {
//   onComplete: () => void;
// }

// export default function Loader({ onComplete }: LoaderProps) {
//   const [progress, setProgress] = useState<number>(0);
//   const [gone, setGone] = useState<boolean>(false);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setProgress((p) => {
//         if (p >= 100) {
//           clearInterval(id);
//           return 100;
//         }
//         return Math.min(100, p + Math.random() * 6 + 2);
//       });
//     }, 90);
//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => {
//     if (progress >= 100) {
//       const t = setTimeout(() => {
//         setGone(true);
//         setTimeout(onComplete, 900);
//       }, 400);
//       return () => clearTimeout(t);
//     }
//   }, [progress, onComplete]);

//   const pct = Math.round(progress);

//   return (
//     <AnimatePresence>
//       {!gone && (
//         <motion.div
//           className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#6b1f2e]"
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0, y: -40 }}
//           transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {/* Soft radial glow */}
//           <div className="absolute inset-0">
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#c9a86a]/15 blur-[140px] hero-glow" />
//           </div>

//           {/* Ring + monogram */}
//           <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
//             <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="45"
//                 fill="none"
//                 stroke="rgba(201, 168, 106, 0.2)"
//                 strokeWidth="1"
//               />
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="45"
//                 fill="none"
//                 stroke="#c9a86a"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeDasharray={2 * Math.PI * 45}
//                 strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
//                 style={{ transition: 'stroke-dashoffset 0.25s linear' }}
//               />
//             </svg>

//             <div className="text-center">
//               <motion.p
//   initial={{ opacity: 0, y: 10 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.3, duration: 0.9 }}
//   className="font-display text-3xl md:text-4xl tracking-[0.2em] uppercase text-[#fdf8f0]"
// >
//   A <span className="text-[#c9a86a]">&</span> A
// </motion.p>
//               <p className="font-display text-[9px] tracking-[0.4em] text-[#c9a86a] uppercase mt-2">
//                 {pct}%
//               </p>
//             </div>
//           </div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 1 }}
//             className="font-display text-[10px] tracking-[0.5em] text-[#fdf8f0]/50 uppercase mt-10"
//           >
//             Preparing something beautiful
//           </motion.p>

//           {/* Floating dots */}
//           <div className="flex gap-2 mt-8">
//             {[0, 1, 2].map((i) => (
//               <motion.span
//                 key={i}
//                 className="w-1.5 h-1.5 rounded-full bg-[#c9a86a]"
//                 animate={{ opacity: [0.3, 1, 0.3] }}
//                 transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
//               />
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }