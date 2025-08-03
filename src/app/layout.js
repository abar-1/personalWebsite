export const metadata = {
  title: 'Aneesh Bargaje | Portfolio',
  description: 'Software Developer, Researcher, Cybersecurity Intern',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}