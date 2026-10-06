'use client';

import { motion } from 'framer-motion';

interface BougainvilleaProps {
  side?: 'left' | 'right';
  scale?: number;
}

export default function BougainvilleaTree({
  side = 'left',
  scale = 1,
}: BougainvilleaProps) {
  const isLeft = side === 'left';

  const BloomCluster = ({
    cx,
    cy,
    r = 30,
    hue = 0,
    delay = 0,
  }: {
    cx: number;
    cy: number;
    r?: number;
    hue?: number;
    delay?: number;
  }) => {
    const palettes = [
      ['#c2185b', '#e91e63', '#f06292', '#ec407a'],
      ['#d81b60', '#ff4081', '#f8bbd0', '#ec407a'],
      ['#ad1457', '#e91e63', '#f48fb1', '#f06292'],
    ];
    const colors = palettes[hue % palettes.length];

    return (
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.85, 1, 0.85],
          scale: [0.98, 1.03, 0.98],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 6 + (delay % 3),
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2 + delay;
          const dist = r * (0.3 + ((i * 7) % 10) / 10);
          const fx = cx + Math.cos(angle) * dist;
          const fy = cy + Math.sin(angle) * dist;
          const sz = 4 + ((i * 3) % 6);
          const c = colors[i % colors.length];
          return (
            <g key={i} transform={`translate(${fx} ${fy})`}>
              {[0, 120, 240].map((a) => (
                <ellipse
                  key={a}
                  cx={0}
                  cy={-sz * 0.55}
                  rx={sz * 0.55}
                  ry={sz * 0.85}
                  fill={c}
                  transform={`rotate(${a})`}
                  opacity={0.9}
                />
              ))}
              <circle r={sz * 0.25} fill="#fdf8f0" opacity={0.85} />
            </g>
          );
        })}
      </motion.g>
    );
  };

  const Leaf = ({
    x,
    y,
    rot = 0,
    s = 1,
  }: {
    x: number;
    y: number;
    rot?: number;
    s?: number;
  }) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path
        d="M0 0 Q 4 -6 0 -14 Q -4 -6 0 0 Z"
        fill="#2d5016"
        opacity={0.85}
      />
      <line x1={0} y1={0} x2={0} y2={-14} stroke="#1e3a0f" strokeWidth={0.4} />
    </g>
  );

  return (
    <motion.div
      className="hidden md:block absolute pointer-events-none"
      style={{
        [isLeft ? 'bottom' : 'top']: '-2%',
        [isLeft ? 'left' : 'right']: '-4%',
        width: '520px',
        height: '680px',
        transform: isLeft
          ? `scale(${scale})`
          : `scaleX(-1) scale(${scale})`,
        transformOrigin: isLeft ? 'bottom left' : 'top right',
        zIndex: 4,
      }}
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
    >
      <motion.div
        animate={{ rotate: [-0.6, 0.8, -0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transformOrigin: 'bottom left',
          width: '100%',
          height: '100%',
        }}
      >
        <svg viewBox="0 0 520 680" className="w-full h-full overflow-visible">
          <motion.path
            d="M 40 680 Q 60 560 90 460 Q 130 340 200 260 Q 260 200 330 160 Q 400 120 460 100"
            stroke="#5a3a22"
            strokeWidth={16}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: 'easeOut', delay: 0.8 }}
          />
          <motion.path
            d="M 40 680 Q 55 590 80 510 Q 120 410 190 330"
            stroke="#6b4428"
            strokeWidth={8}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 1.2 }}
          />

          <motion.path
            d="M 150 400 Q 220 380 280 340 Q 340 300 400 260"
            stroke="#6b4428"
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.6 }}
          />
          <motion.path
            d="M 260 260 Q 320 210 380 190"
            stroke="#6b4428"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.9 }}
          />
          <motion.path
            d="M 330 160 Q 370 130 420 130"
            stroke="#6b4428"
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 2.1 }}
          />
          <motion.path
            d="M 200 340 Q 240 320 280 300"
            stroke="#6b4428"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.3 }}
          />

          <Leaf x={90} y={520} rot={-20} s={1.1} />
          <Leaf x={70} y={580} rot={-35} s={1} />
          <Leaf x={130} y={430} rot={10} s={1.2} />
          <Leaf x={180} y={360} rot={-15} s={1.1} />
          <Leaf x={240} y={300} rot={20} s={1} />
          <Leaf x={300} y={240} rot={-25} s={1.1} />
          <Leaf x={360} y={190} rot={15} s={1} />
          <Leaf x={420} y={140} rot={-20} s={1.1} />
          <Leaf x={150} y={400} rot={30} s={0.9} />
          <Leaf x={220} y={330} rot={-40} s={1} />

          <BloomCluster cx={460} cy={100} r={38} hue={0} delay={0} />
          <BloomCluster cx={420} cy={130} r={32} hue={1} delay={0.4} />
          <BloomCluster cx={380} cy={180} r={36} hue={2} delay={0.8} />
          <BloomCluster cx={340} cy={200} r={40} hue={0} delay={1.2} />
          <BloomCluster cx={300} cy={250} r={34} hue={1} delay={0.2} />
          <BloomCluster cx={260} cy={270} r={38} hue={2} delay={0.6} />
          <BloomCluster cx={230} cy={330} r={32} hue={0} delay={1.0} />
          <BloomCluster cx={180} cy={350} r={36} hue={1} delay={1.4} />
          <BloomCluster cx={150} cy={400} r={30} hue={2} delay={0.3} />
          <BloomCluster cx={400} cy={160} r={30} hue={1} delay={0.9} />
          <BloomCluster cx={280} cy={210} r={28} hue={2} delay={1.1} />

          <BloomCluster cx={470} cy={140} r={24} hue={2} delay={0.5} />
          <BloomCluster cx={490} cy={180} r={22} hue={0} delay={0.8} />
          <BloomCluster cx={210} cy={380} r={22} hue={1} delay={1.3} />
          <BloomCluster cx={120} cy={440} r={24} hue={2} delay={0.7} />
        </svg>
      </motion.div>
    </motion.div>
  );
}