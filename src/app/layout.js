export const metadata = {
  title: 'Aneesh Bargaje | Portfolio',
  description: 'Software Developer, Researcher, Cybersecurity Intern',

  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}