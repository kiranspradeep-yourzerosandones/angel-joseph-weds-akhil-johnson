'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    left: string;
    delay: number;
    duration: number;
    rotation: number;
    size: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const newPetals = [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 8,
    }));
    setPetals(newPetals);
  }, []);

  // ✅ Hero tap - ONLY plays music (won't stop it)
  const handleHeroTap = () => {
    const audio = document.querySelector('audio') as HTMLAudioElement | null;
    if (!audio) return;
    
    // Only play if paused, don't toggle
    if (audio.paused) {
      audio.volume = 0.4;
      audio.play().catch((err) => console.log('Play blocked:', err));
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleHeroTap}
    >
      {/* Premium gradient background */}
      <motion.div
        style={{
          y: y1,
          scale: scale,
        }}
        className="absolute inset-0 bg-gradient-to-b from-[#fdf8f0] via-[#faf4ed] to-[#f5ebe2]"
      />

      {/* Soft atmospheric glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[12%] left-[5%] w-[580px] h-[580px] rounded-full"
          style={{
            boxShadow: '0 0 200px 100px rgba(201, 168, 106, 0.15)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute bottom-[5%] right-[3%] w-[520px] h-[520px] rounded-full"
          style={{
            boxShadow: '0 0 180px 90px rgba(232, 207, 156, 0.12)',
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <motion.div
          className="absolute top-1/2 right-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            boxShadow: '0 0 150px 75px rgba(107, 31, 46, 0.08)',
          }}
          animate={{
            scale: [0.95, 1.15, 0.95],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Decorative ornaments */}
      <motion.svg
        className="absolute top-[8%] right-[8%] w-24 h-24 text-[#c9a86a]/30 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        <path d="M50 10 L50 90 M10 50 L90 50" strokeLinecap="round" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6" />
        <circle cx="50" cy="50" r="15" fill="none" />
        <circle cx="50" cy="50" r="22" fill="none" opacity="0.5" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-[6%] left-[6%] w-32 h-32 text-[#c9a86a]/20 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="35"
            transform={`rotate(${i * 30} 50 50)`}
            opacity={0.6 - i * 0.04}
          />
        ))}
        <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.5" />
      </motion.svg>

      {/* Falling petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute -top-8"
            style={{ left: petal.left, willChange: 'transform' }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [petal.rotation, petal.rotation + 360],
              x: [0, 25, -25, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'linear',
            }}
          >
            <PetalSVG size={petal.size} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{
          y: y2,
          opacity: opacity,
        }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        {/* Top decorative line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={loaded ? { opacity: 1, width: 60 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="mx-auto mb-8 h-px bg-gradient-to-r from-transparent via-[#c9a86a] to-transparent"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-light text-xs md:text-sm tracking-[0.6em] text-[#6b1f2e]/60 uppercase mb-2"
        >
          Together in the presence of God
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="text-[#6b1f2e]/50 text-sm italic font-light mb-10 tracking-wide"
        >
          ദൈവത്തിന്റെ അനുഗ്രഹത്തോടെ
        </motion.p>

        {/* Names section */}
        <div className="space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-3xl md:text-6xl tracking-[0.15em] text-[#2d0d15] font-light mb-1">
              ANGEL JOSEPH
            </h1>
          </motion.div>

          {/* Ampersand separator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            className="flex items-center justify-center gap-6 my-6"
          >
            <motion.span
              className="h-px bg-gradient-to-r from-transparent to-[#c9a86a] w-12"
              animate={loaded ? { opacity: [0.5, 1, 0.5], scaleX: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="font-display text-lg md:text-2xl tracking-[0.3em] text-[#c9a86a] font-light"
              animate={loaded ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            >
              &amp;
            </motion.span>
            <motion.span
              className="h-px bg-gradient-to-l from-transparent to-[#c9a86a] w-12"
              animate={loaded ? { opacity: [0.5, 1, 0.5], scaleX: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-3xl md:text-6xl tracking-[0.15em] text-[#2d0d15] font-light mb-3">
              AKHIL JOHNSON
            </h1>
          </motion.div>
        </div>

        {/* Date and location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 1.5 }}
          className="mt-12 space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.span
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a86a]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <p className="font-display text-sm md:text-base tracking-[0.2em] text-[#3a2a1f] font-light">
              10 · JANUARY · 2027
            </p>
            <motion.span
              className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a86a]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
            />
          </div>

          <motion.p
            className="font-display text-xs md:text-sm tracking-[0.35em] text-[#6b1f2e]/70 uppercase font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            Little Flower Roman Catholic Church · Ernakulam
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        animate={{ y: [0, 12, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="font-display text-[8px] tracking-[0.5em] text-[#c9a86a]/60 uppercase font-light">
          Scroll to explore
        </p>
        <motion.svg
          className="w-4 h-6 text-[#c9a86a]/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>

      {/* Bottom gradient overlay */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(253, 248, 240, 0.8), transparent)',
        }}
      />
    </section>
  );
}

function PetalSVG({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="7"
        cy="7"
        rx="3.5"
        ry="2.5"
        fill="#6B2D44"
        fillOpacity="0.5"
        transform="rotate(45 7 7)"
      />
      <ellipse
        cx="6"
        cy="6"
        rx="1.5"
        ry="1"
        fill="#8B3D5A"
        fillOpacity="0.6"
        transform="rotate(45 6 6)"
      />
    </svg>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';

// export default function Hero() {
//   const [loaded, setLoaded] = useState<boolean>(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end start'],
//   });

//   const y1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
//   const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

//   useEffect(() => {
//     const t = setTimeout(() => setLoaded(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden paper-texture"
//     >
//       {/* Animated gradient background */}
//       <motion.div
//         style={{ y: y1, scale }}
//         className="absolute inset-0 bg-gradient-to-b from-[#fdf8f0] via-[#faf0e0] to-[#f5e6d0]"
//       />

//       {/* Drifting glow orbs — always animated */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-[15%] left-[10%] w-[420px] h-[420px] rounded-full bg-[#c9a86a]/20 blur-[120px] drift" />
//         <div className="absolute bottom-[10%] right-[8%] w-[380px] h-[380px] rounded-full bg-[#e8c4b8]/40 blur-[110px] drift" style={{ animationDelay: '4s' }} />
//         <div className="absolute top-[40%] right-[25%] w-[300px] h-[300px] rounded-full bg-[#6b1f2e]/10 blur-[100px] drift" style={{ animationDelay: '8s' }} />
//       </div>

//       {/* Decorative slow-rotating mandala */}
//       <svg
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-[0.06] slow-rotate"
//         viewBox="0 0 200 200"
//         fill="none"
//         stroke="#6b1f2e"
//         strokeWidth="0.3"
//       >
//         {Array.from({ length: 24 }).map((_, i) => (
//           <ellipse
//             key={i}
//             cx="100"
//             cy="100"
//             rx="90"
//             ry="30"
//             transform={`rotate(${i * 15} 100 100)`}
//           />
//         ))}
//       </svg>

//       {/* Floating leaves — always animated */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[
//           { top: '10%', left: '8%', size: 64, delay: '0s', opacity: '0.3' },
//           { top: '20%', right: '10%', size: 48, delay: '1s', opacity: '0.4' },
//           { bottom: '18%', left: '12%', size: 56, delay: '2s', opacity: '0.25' },
//           { bottom: '25%', right: '15%', size: 40, delay: '3s', opacity: '0.35' },
//         ].map((l, i) => (
//           <motion.svg
//             key={i}
//             className="absolute text-[#c9a86a] leaf-float"
//             style={{
//               ...(l as React.CSSProperties),
//               width: l.size,
//               height: l.size,
//               opacity: Number(l.opacity),
//               animationDelay: l.delay,
//             }}
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             animate={{ y: [0, -14, 0], rotate: [0, 6, -4, 0] }}
//             transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
//           </motion.svg>
//         ))}
//       </div>

//       {/* Content */}
//       <motion.div
//         style={{ y: y2, opacity }}
//         className="relative z-10 text-center px-6 max-w-3xl"
//       >
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={loaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="font-display text-xs md:text-sm tracking-[0.5em] text-[#6b1f2e]/70 uppercase mb-6"
//         >
//           Together with our families
//         </motion.p>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={loaded ? { opacity: 1 } : {}}
//           transition={{ duration: 1.2, delay: 0.5 }}
//           className="text-[#6b1f2e]/60 text-sm italic mb-8"
//         >
//           ദൈവത്തിന്റെ അനുഗ്രഹത്തോടെ
//         </motion.p>

//         {/* Headings updated to match font-display, uppercase, tracking same as metadata */}
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={loaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           className="font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e] mb-4"
//         >
//           <motion.span
//             animate={{ y: [0, -4, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//             className="inline-block"
//           >
//             Angel
//           </motion.span>
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.6 }}
//           animate={loaded ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 1, delay: 1.1 }}
//           className="flex items-center justify-center gap-4 my-2"
//         >
//           <motion.span
//             className="w-16 h-px bg-[#c9a86a]"
//             animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//           />
//           <motion.span
//             className="font-display text-lg md:text-xl tracking-[0.2em] text-[#c9a86a] heartbeat inline-block uppercase"
//           >
//             and
//           </motion.span>
//           <motion.span
//             className="w-16 h-px bg-[#c9a86a]"
//             animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
//           />
//         </motion.div>

//         {/* Headings updated to match font-display, uppercase, tracking same as metadata */}
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={loaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 1.4, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
//           className="font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e] mb-8"
//         >
//           <motion.span
//             animate={{ y: [0, -4, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
//             className="inline-block"
//           >
//             Akhil
//           </motion.span>
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={loaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 1.2, delay: 1.8 }}
//         >
//           <div className="gold-divider" />
//           <motion.p
//             className="font-display text-sm md:text-base tracking-[0.3em] text-[#3a2a1f]/80"
//             animate={{ opacity: [0.7, 1, 0.7] }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             14 · FEBRUARY · 2025
//           </motion.p>
//           <p className="font-display text-xs tracking-[0.4em] text-[#6b1f2e]/60 mt-2 uppercase">
//             St. Mary&apos;s Cathedral · Kochi
//           </p>
//         </motion.div>
//       </motion.div>

//       {/* Scroll indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//         animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
//         transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//       >
//         <span className="font-display text-[9px] tracking-[0.4em] text-[#c9a86a] uppercase">
//           Scroll
//         </span>
//         <svg className="w-5 h-5 text-[#c9a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//         </svg>
//       </motion.div>
//     </section>
//   );
// }