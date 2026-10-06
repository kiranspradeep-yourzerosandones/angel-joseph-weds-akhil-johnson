'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Photo {
  src: string;
  gradient: string;
}

const photos: Photo[] = [
  { 
    src: '/image1.jpeg',
    gradient: 'from-[#e8c4b8] to-[#c9a86a]/50' 
  },
  { 
    src: '/image2.jpeg',
    gradient: 'from-[#c9a86a]/50 to-[#6b1f2e]/30' 
  },
  { 
    src: '/image3.jpeg',
    gradient: 'from-[#6b1f2e]/25 to-[#e8c4b8]' 
  },
  { 
    src: '/image5.jpeg',
    gradient: 'from-[#e8c4b8]/60 to-[#6b1f2e]/20' 
  },
];

const revealClasses = ['reveal-scale', 'reveal', 'reveal-right', 'reveal-left'];

export default function Gallery() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 md:py-44 px-6 paper-texture">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="reveal reveal-blur font-display text-xs tracking-[0.5em] text-[#6b1f2e]/60 uppercase mb-6">
            Our Journey
          </p>
          <h2 className="reveal reveal-scale reveal-delay-1 font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e]">
            Moments We Cherish
          </h2>
          <div className="reveal reveal-delay-2 gold-divider" />
        </div>

        {/* Photo Grid - 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {photos.map((photo, i) => (
            <motion.div
              key={`photo-${i}`}
              className={`${revealClasses[i]} reveal-delay-${i + 1} group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={photo.src}
                  alt={`Gallery photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={i < 2}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-[#6b1f2e]/0 group-hover:bg-[#6b1f2e]/20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Description */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <p className="reveal font-light text-sm md:text-base tracking-wide text-[#6b1f2e]/70 leading-relaxed">
            Every photograph tells a story of love, laughter, and unforgettable moments. 
            These memories have shaped our journey and made us who we are today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}