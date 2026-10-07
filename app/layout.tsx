// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Angel Joseph & Akhil Johnson | Wedding Invitation',
  description:
    'With the blessings of God and our families, we invite you to celebrate the wedding of Angel Joseph & Akhil Johnson on January 10th, 2027 at Little Flower Roman Catholic Church, Ernakulam.',
  keywords: ['wedding', 'invitation', 'Angel Joseph', 'Akhil Johnson', 'Christian wedding', '2027', 'Ernakulam'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://angel-weds-akhil.vercel.app',
    siteName: 'Angel & Akhil Wedding',
    title: 'Angel Joseph & Akhil Johnson | Wedding Invitation',
    description:
      'Join us as we celebrate the union of two souls. Wedding on January 10th, 2027 at Little Flower Roman Catholic Church, Ernakulam.',
    images: [
      {
        url: 'https://angel-weds-akhil.vercel.app/image4.jpeg',
        width: 1200,
        height: 630,
        alt: 'Angel Joseph & Akhil Johnson Wedding Invitation',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angel Joseph & Akhil Johnson | Wedding Invitation',
    description:
      'Join us for a divine celebration of love and union on January 10th, 2027.',
    images: ['https://angel-weds-akhil.vercel.app/image4.jpeg'],
  },
  metadataBase: new URL('https://angel-weds-akhil.vercel.app'),
  robots: 'index, follow',
  authors: [{ name: 'Angel Joseph & Akhil Johnson' }],
  alternates: {
    canonical: 'https://angel-weds-akhil.vercel.app',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#6b1f2e',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Angel & Akhil Wedding" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: 'Wedding of Angel Joseph & Akhil Johnson',
              description: 'A Christian wedding celebration',
              startDate: '2027-01-10T16:00:00+05:30',
              endDate: '2027-01-10T23:59:00+05:30',
              eventStatus: 'EventScheduled',
              location: {
                '@type': 'Place',
                name: 'Little Flower Roman Catholic Church',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Ernakulam',
                  addressLocality: 'Kochi',
                  addressRegion: 'Kerala',
                  postalCode: '682000',
                  addressCountry: 'IN',
                },
              },
            }),
          }}
        />

        {/* Prevent zoom, pinch, drag - Desktop */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // ✅ Disable mouse wheel zoom (Desktop)
              document.addEventListener('wheel', (e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                }
              }, { passive: false });

              // ✅ Disable keyboard zoom shortcuts
              document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 187 || e.keyCode === 189)) {
                  e.preventDefault();
                }
                // Ctrl+0 (reset zoom)
                if ((e.ctrlKey || e.metaKey) && e.key === '0') {
                  e.preventDefault();
                }
              });

              // ✅ Disable pinch zoom (Mobile)
              document.addEventListener('touchmove', (e) => {
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              }, { passive: false });

              // ✅ Disable gesture zoom
              document.addEventListener('gesturestart', (e) => {
                e.preventDefault();
              });

              // ✅ Disable double-tap zoom
              let lastTouchEnd = 0;
              document.addEventListener('touchend', (e) => {
                const now = new Date().getTime();
                if (now - lastTouchEnd <= 300) {
                  e.preventDefault();
                }
                lastTouchEnd = now;
              }, false);

              // ✅ Force zoom level to 100%
              const meta = document.querySelector('meta[name="viewport"]');
              if (meta) {
                meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}