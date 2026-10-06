'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

export default function Couple() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-32 md:py-44 px-6 paper-texture">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="reveal reveal-blur font-display text-xs tracking-[0.5em] text-[#6b1f2e]/60 uppercase mb-6">
            The Bride &amp; Groom
          </p>
          <h2 className="reveal reveal-scale reveal-delay-1 font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e]">
            Two Hearts, One Soul
          </h2>
          <div className="reveal reveal-delay-2 gold-divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-12">
          {/* Bride */}
          <motion.div
            className="reveal-left text-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="relative inline-block mb-8 group">
              <div className="absolute -inset-4 rounded-full bg-[#c9a86a]/10 blur-2xl group-hover:bg-[#c9a86a]/25 transition-all duration-700" />
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#c9a86a]/40 shadow-xl mx-auto transition-transform duration-700 group-hover:scale-[1.03]">
                <div className="w-full h-full bg-gradient-to-br from-[#e8c4b8] to-[#c9a86a]/30 flex items-center justify-center">
                  <span className="font-display text-5xl tracking-[0.1em] text-[#6b1f2e]/70">
                    A
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#fdf8f0] px-4 py-1 rounded-full border border-[#c9a86a]/40">
                <span className="font-display text-[10px] tracking-[0.3em] text-[#6b1f2e]/70">
                  THE BRIDE
                </span>
              </div>
            </div>

            {/* Bride Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase text-[#6b1f2e] mb-1">
                  Angel Joseph
                </h3>
                <p className="text-xs tracking-[0.15em] text-[#6b1f2e]/60 uppercase font-light">
                  Palliparambil House
                </p>
                <p className="text-xs tracking-[0.15em] text-[#6b1f2e]/60 uppercase font-light">
                  Ernakulam
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 justify-center">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a86a]" />
                <span className="text-[#c9a86a] text-xs">✦</span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a86a]" />
              </div>

              {/* Parents Info */}
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#6b1f2e]/50 uppercase mb-1">Father</p>
                  <p className="font-display text-sm text-[#6b1f2e] tracking-[0.1em]">
                    K.V Joseph
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#6b1f2e]/50 uppercase mb-1">Mother</p>
                  <p className="font-display text-sm text-[#6b1f2e] tracking-[0.1em]">
                    Annie Joseph
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            className="reveal-right text-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="relative inline-block mb-8 group">
              <div className="absolute -inset-4 rounded-full bg-[#c9a86a]/10 blur-2xl group-hover:bg-[#c9a86a]/25 transition-all duration-700" />
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#c9a86a]/40 shadow-xl mx-auto transition-transform duration-700 group-hover:scale-[1.03]">
                <div className="w-full h-full bg-gradient-to-br from-[#c9a86a]/40 to-[#6b1f2e]/20 flex items-center justify-center">
                  <span className="font-display text-5xl tracking-[0.1em] text-[#6b1f2e]/70">
                    A
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#fdf8f0] px-4 py-1 rounded-full border border-[#c9a86a]/40">
                <span className="font-display text-[10px] tracking-[0.3em] text-[#6b1f2e]/70">
                  THE GROOM
                </span>
              </div>
            </div>

            {/* Groom Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase text-[#6b1f2e] mb-1">
                  Akhil Johnson
                </h3>
                <p className="text-xs tracking-[0.15em] text-[#6b1f2e]/60 uppercase font-light">
                  Moonjapilly House
                </p>
                <p className="text-xs tracking-[0.15em] text-[#6b1f2e]/60 uppercase font-light">
                  Panorama Nagar Maradu
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 justify-center">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a86a]" />
                <span className="text-[#c9a86a] text-xs">✦</span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a86a]" />
              </div>

              {/* Parents Info */}
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#6b1f2e]/50 uppercase mb-1">Father</p>
                  <p className="font-display text-sm text-[#6b1f2e] tracking-[0.1em]">
                    Johnson M F
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#6b1f2e]/50 uppercase mb-1">Mother</p>
                  <p className="font-display text-sm text-[#6b1f2e] tracking-[0.1em]">
                    Betty Johnson
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative divider at bottom */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a86a]" />
          <span className="text-[#c9a86a] text-lg">♥</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a86a]" />
        </motion.div>
      </div>
    </section>
  );
}