import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Angel & Akhil | Wedding Invitation',
  description:
    'With the blessings of God and our families, we invite you to celebrate the wedding of Angel Joseph & Akhil Johnson.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}