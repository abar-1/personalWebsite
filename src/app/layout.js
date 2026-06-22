import { Inter, JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jbmono',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const metadata = {
  title: 'Aneesh Bargaje — Data Science + CS @ Purdue',
  description:
    'Aneesh Bargaje — Data Science + Computer Science at Purdue. Building ML systems and the software around them. Seeking SWE, AI/ML, and Data Science internships.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
