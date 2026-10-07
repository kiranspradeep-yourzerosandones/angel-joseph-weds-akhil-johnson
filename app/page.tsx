'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Loader from '@/components/Loader';
import MusicPlayer from '@/components/MusicPlayer';
import FallingPetals from '@/components/FallingPetals';
import ScrollProgressBar from '@/components/ScrollProgressBar';

import Hero from '@/components/Hero';
import BibleVerse from '@/components/BibleVerse';
import Couple from '@/components/Couple';
import Countdown from '@/components/Countdown';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';
import Location from '@/components/Location';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  // Lock scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
      window.scrollTo(0, 0);
    }
    return () => document.body.classList.remove('locked');
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <AnimatePresence>
        {!loading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollProgressBar />
            <FallingPetals count={14} />
            <MusicPlayer autoPlay />

            <Hero />
            <BibleVerse />
            <Couple />
            <Countdown />
            <Events />
            <Gallery />
            <RSVP />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}