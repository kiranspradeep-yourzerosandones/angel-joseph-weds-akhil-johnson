'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Location() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="py-32 md:py-44 px-6 bg-gradient-to-b from-[#fdf8f0] via-[#f7e8d5] to-[#fdf8f0]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="reveal reveal-blur font-display text-xs tracking-[0.5em] text-[#6b1f2e]/60 uppercase mb-6">
            Find Us Here
          </p>
          <h2 className="reveal reveal-scale reveal-delay-1 font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e]">
            The Location
          </h2>
          <div className="reveal reveal-delay-2 gold-divider" />
        </div>

        {/* Venue card */}
        <div className="reveal reveal-scale reveal-delay-3 relative bg-[#fdf8f0]/80 backdrop-blur-sm border border-[#c9a86a]/30 rounded-2xl overflow-hidden shadow-xl">
          {/* Info block on top */}
          <div className="p-8 md:p-10 text-center border-b border-[#c9a86a]/20">
            <p className="font-display text-xs tracking-[0.4em] text-[#c9a86a] uppercase mb-4">
              The Wedding Venue
            </p>
            <h3 className="font-display text-xl md:text-3xl tracking-[0.2em] uppercase text-[#6b1f2e] mb-2">
              Little Flower Roman Catholic Church
            </h3>
            <p className="font-mal text-lg md:text-xl text-[#c9a86a] mb-3">
              സെന്റ്‌ മേരീസ് ദേവാലയം
            </p>
            <p className="text-[#3a2a1f]/70 italic text-sm md:text-base mb-6">
              Ernakulam, Kerala, India
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://maps.google.com/?q=Little+Flower+Roman+Catholic+Church+Ernakulam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6b1f2e] text-[#fdf8f0] hover:bg-[#58171f] transition-all duration-500 hover:scale-[1.03] shadow-md"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-display text-xs tracking-[0.25em] uppercase">
                  Open in Maps
                </span>
              </a>

              <a
                href="https://maps.google.com/?q=Little+Flower+Roman+Catholic+Church+Ernakulam&dirflg=d"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c9a86a]/60 text-[#6b1f2e] hover:bg-[#c9a86a]/15 transition-all duration-500 hover:scale-[1.03]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <span className="font-display text-xs tracking-[0.25em] uppercase">
                  Get Directions
                </span>
              </a>
            </div>
          </div>

          {/* Google Maps iframe */}
          <div className="relative w-full h-[320px] md:h-[450px] bg-[#e8e0d0]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.4950754173124!2d76.31222647495807!3d9.942297990160187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872e2d1491cc7%3A0xf63887975483081c!2sLittle%20Flower%20Roman%20Catholic%20Church!5e1!3m2!1sen!2sin!4v1791280768086!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Wedding venue location"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}