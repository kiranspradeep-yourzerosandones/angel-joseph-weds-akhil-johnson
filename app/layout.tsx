// app/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Angel Joseph & Akhil Johnson | Wedding Invitation',
  description:
    'With the blessings of God and our families, we invite you to celebrate the wedding of Angel Joseph & Akhil Johnson on January 1st, 2027 at Little Flower Roman Catholic Church, Ernakulam.',
  keywords: ['wedding', 'invitation', 'Angel Joseph', 'Akhil Johnson', 'Christian wedding', '2027', 'Ernakulam'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://angel-weds-akhil.vercel.app',
    siteName: 'Angel & Akhil Wedding',
    title: 'Angel Joseph & Akhil Johnson | Wedding Invitation',
    description:
      'Join us as we celebrate the union of two souls. Wedding on January 1st, 2027 at Little Flower Roman Catholic Church, Ernakulam.',
    images: [
      {
        url: 'https://angel-weds-akhil.vercel.app/image4.jpeg',
        width: 1200,
        height: 630,
        alt: 'Angel Joseph & Akhil Johnson Wedding Invitation',
        type: 'image/jpeg',
      },
      {
        url: 'https://angel-weds-akhil.vercel.app/image4.jpeg',
        width: 800,
        height: 800,
        alt: 'Angel & Akhil Wedding',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angel Joseph & Akhil Johnson | Wedding Invitation',
    description:
      'Join us for a divine celebration of love and union on January 1st, 2027.',
    images: ['https://angel-weds-akhil.vercel.app/image4.jpeg'],
  },
  metadataBase: new URL('https://angel-weds-akhil.vercel.app'),
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  authors: [{ name: 'Angel Joseph & Akhil Johnson' }],
  alternates: {
    canonical: 'https://angel-weds-akhil.vercel.app',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#6b1f2e" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Angel & Akhil Wedding" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: 'Wedding of Angel Joseph & Akhil Johnson',
              description: 'A Christian wedding celebration of Angel Joseph and Akhil Johnson',
              startDate: '2027-01-01T16:00:00+05:30',
              endDate: '2027-01-01T23:59:00+05:30',
              eventAttendanceMode: 'OfflineEventAttendanceMode',
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
                url: 'https://goo.gl/maps/littleflowerchurch',
              },
              organizer: [
                {
                  '@type': 'Person',
                  name: 'Angel Joseph',
                  image: 'https://angel-weds-akhil.vercel.app/image1.jpeg',
                },
                {
                  '@type': 'Person',
                  name: 'Akhil Johnson',
                  image: 'https://angel-weds-akhil.vercel.app/image2.jpeg',
                },
              ],
              image: 'https://angel-weds-akhil.vercel.app/image4.jpeg',
              url: 'https://angel-weds-akhil.vercel.app',
              offers: {
                '@type': 'Offer',
                url: 'https://angel-weds-akhil.vercel.app#rsvp',
                category: 'EventTicket',
                availability: 'https://schema.org/PreOrder',
                price: '0',
                priceCurrency: 'INR',
              },
            }),
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Cinzel:wght@400;600&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Cinzel:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}