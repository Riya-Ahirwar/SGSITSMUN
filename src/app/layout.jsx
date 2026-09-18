import "./globals.css";

export const metadata = {
  title: "SGSITS MUN 2026 | DIGIT — Model United Nations, Indore",
  description:
    "SGSITS MUN 2026 — DIGIT: Democracy, Innovation, Global, Inclusion, Technology. A Model United Nations conference in Indore on 10 & 11 October.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
