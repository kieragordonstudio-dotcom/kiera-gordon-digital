import type { Metadata } from 'next';
import { Instrument_Serif, Manrope } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kiera-gordon-digital.onrender.com'),
  title: 'Kiera Gordon Digital | Websites for independent beauty businesses',
  description:
    'Premium, booking-ready websites for salons and independent beauty businesses.',
  openGraph: {
    title: 'Kiera Gordon Digital',
    description:
      'Premium, booking-ready websites for salons and independent beauty businesses.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 909,
        alt: 'Kiera Gordon Digital social preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiera Gordon Digital',
    description:
      'Premium, booking-ready websites for salons and independent beauty businesses.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
