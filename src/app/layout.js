export const metadata = {
  title: 'Aneesh Bargaje | Portfolio',
  description: 'Software Developer, Researcher, Cybersecurity Intern',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}