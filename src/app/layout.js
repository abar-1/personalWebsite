import { Lora, Neuton } from "next/font/google";
import "./globals.css";

const body = Lora({ subsets: ["latin", "latin-ext"], variable: "--body", display: "swap" });
const display = Neuton({ subsets: ["latin", "latin-ext"], weight: ["700"], variable: "--display", display: "swap" });

const site =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000";

const title = "Aneesh Bargaje, software engineer and data scientist";
const description =
  "Computer science and data science at Purdue with a minor in finance. Software engineer, data scientist and private pilot.";

export const metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport = { width: "device-width", initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#121a23" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
