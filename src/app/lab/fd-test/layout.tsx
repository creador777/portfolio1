import type { Metadata } from 'next';
import { Fraunces, Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap'
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap'
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter-tight',
  display: 'swap'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-tight',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'FD Test — Editorial Hero · VDesing Lab',
  description: 'Lab route testing the frontend-design skill on an editorial-direction hero overlay.',
  robots: { index: false, follow: false }
};

export default function FdTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${instrument.variable} ${interTight.variable} ${mono.variable}`}
    >
      {children}
    </div>
  );
}