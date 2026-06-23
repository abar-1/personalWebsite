import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

import {
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  IBM_Plex_Mono,
} from "next/font/google";

const ibmSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-sans",
});

const ibmSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-serif",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
});

export const metadata = {
  title: 'Aneesh Bargaje — Data Science + CS @ Purdue',
  description:
    'Aneesh Bargaje — Data Science + Computer Science at Purdue. Building ML systems and the software around them. Seeking SWE, AI/ML, and Data Science internships.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#131316',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${ibmSans.variable} ${ibmSerif.variable} ${ibmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
