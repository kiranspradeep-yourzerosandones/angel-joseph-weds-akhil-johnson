'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface WeddingEvent {
  title: string;
  malayalam: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  icon: string;
  mapUrl: string;
  featured?: boolean;
}

const events: WeddingEvent[] = [
  {
    title: 'Holy Matrimony',
    malayalam: 'വിവാഹം',
  date: 'january 10, 2027',
    time: '4:00 PM',
    venue: 'Little Flower Roman Catholic Church',
    address: 'Ernakulam, Kerala',
    icon: '⛪',
    mapUrl:
      'https://www.google.com/maps/place/Little+Flower+Roman+Catholic+Church/@9.942298,76.3122265,888m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b0872e2d1491cc7:0xf63887975483081c!8m2!3d9.942298!4d76.3148014!16s%2Fg%2F1263bq1ry?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D',
    featured: true,
  },
  {
    title: 'Reception',
    malayalam: 'സൽക്കാരം',
    date: 'january 10, 2027',
    time: '4:00 PM',
    venue: 'VIHARA BY CMK MARADU ERNAKULAM',
    address: 'Ernakulam, Kerala',
    icon: '🥂',
    mapUrl:
      'https://www.google.com/maps/place/Vihara+By+CMK/@9.9258612,76.3238125,888m/data=!3m1!1e3!4m9!3m8!1s0x3b08731c4269f6f1:0x7cf7afd8ac3e77ee!5m2!4m1!1i2!8m2!3d9.9258612!4d76.3263874!16s%2Fg%2F11mlzkqv55?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D',
  },
];

export default function Events() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="py-32 md:py-44 px-6 bg-gradient-to-b from-[#f5e6d0] to-[#fdf8f0]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="reveal reveal-blur font-display text-xs tracking-[0.5em] text-[#6b1f2e]/60 uppercase mb-6">
            Wedding Celebrations
          </p>
          <h2 className="reveal reveal-scale reveal-delay-1 font-display text-3xl md:text-5xl tracking-[0.3em] uppercase text-[#6b1f2e]">
            The Order of Events
          </h2>
          <div className="reveal reveal-delay-2 gold-divider" />
        </div>

        <div className="space-y-8">
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`reveal reveal-delay-${i + 1} group relative bg-[#fdf8f0]/80 backdrop-blur-sm border border-[#c9a86a]/30 rounded-2xl p-8 md:p-10 hover:border-[#c9a86a]/70 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${
                event.featured ? 'md:scale-[1.02] ring-1 ring-[#c9a86a]/20' : ''
              }`}
            >
              <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
                <div className="flex md:flex-col items-center gap-4 md:gap-2">
                  <div className="w-16 h-16 rounded-full bg-[#6b1f2e]/5 border border-[#c9a86a]/40 flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {event.icon}
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="font-display text-lg md:text-xl tracking-[0.3em] uppercase text-[#6b1f2e] mb-3">
                    {event.title}
                  </h3>
                  <p className="font-mal text-xl md:text-2xl text-[#c9a86a] mb-3">
                    {event.malayalam}
                  </p>
                  <p className="text-lg text-[#3a2a1f]/80">{event.venue}</p>
                  <p className="text-sm italic text-[#3a2a1f]/60">
                    {event.address}
                  </p>

                  {/* View on Map button — opens the exact pinned location */}
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-[#c9a86a]/60 text-[#6b1f2e] hover:bg-[#c9a86a]/15 transition-all duration-500 hover:scale-[1.03]"
                  >
                    <svg
                      className="w-3.5 h-3.5"
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
                    <span className="font-display text-[10px] tracking-[0.25em] uppercase">
                      View on Map
                    </span>
                  </a>
                </div>

                <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-[#c9a86a]/30 pt-4 md:pt-0 md:pl-8">
                  <p className="font-display text-sm tracking-[0.2em] text-[#6b1f2e] mb-1 uppercase">
                    {event.date}
                  </p>
                  <p className="font-display text-[#c9a86a] text-base tracking-[0.15em]">
                    {event.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}