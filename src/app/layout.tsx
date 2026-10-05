import type { Metadata } from "next";
import { Great_Vibes, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Patio de Juegos 💖",
  description: "Juegos, sorpresas y cartas de invitación para fechas especiales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${script.variable} ${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
