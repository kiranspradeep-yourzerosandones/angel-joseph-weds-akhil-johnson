'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

export default function Footer() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="py-24 px-6 bg-[#fdf8f0] paper-texture text-center"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="reveal reveal-scale flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg
            className="w-10 h-10 text-[#c9a86a]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
          </svg>
        </motion.div>

        <motion.p
          className="reveal reveal-blur reveal-delay-1 font-display text-2xl md:text-4xl tracking-[0.3em] uppercase text-[#6b1f2e] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Angel &amp; Akhil
        </motion.p>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="reveal reveal-blur reveal-delay-2 text-[#3a2a1f]/70 italic text-lg md:text-xl">
            &ldquo;A sacred beginning blessed by God.&rdquo;
          </p>
          <p className="reveal reveal-blur reveal-delay-2 font-display text-xs tracking-[0.3em] text-[#c9a86a] uppercase mt-4">
            — Ephesians 5:25
          </p>
        </motion.div>

        <motion.div
          className="reveal reveal-delay-3 gold-divider my-10"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="reveal reveal-delay-4 text-xs font-display tracking-[0.3em] text-[#6b1f2e]/50 uppercase">
            10 · 01 · 2027 &nbsp;·&nbsp; Ernakulam, Kerala
          </p>
          <p className="reveal reveal-delay-4 text-sm text-[#3a2a1f]/50">
            With love &amp; blessings from both families
          </p>
        </motion.div>

        {/* Additional blessing message */}
        <motion.div
          className="mt-8 pt-6 border-t border-[#c9a86a]/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs text-[#6b1f2e]/40 italic">
            May God bless this union with love, faith, and eternal happiness.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}