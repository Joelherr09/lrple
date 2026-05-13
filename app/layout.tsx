// app/layout.tsx
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";

import Footer from "@/components/layout/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Liga Regional Panadería La Estrella",
    template: "%s | Liga Regional Panadería La Estrella",
  },
  description:
    "Competencia oficial del vóleibol regional organizada por la Asociación de Vóleibol Limarí.",
  // ... resto de tu metadata sin cambios
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#0f0f0f] font-manrope text-white antialiased">
        {/* BACKGROUND GLOBAL */}
        <div className="fixed inset-0 -z-50 bg-[#0f0f0f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,178,62,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,92,31,0.18),transparent_30%)]" />

          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#D4B23E]/10 blur-3xl" />
          <div className="absolute bottom-[-220px] right-[-180px] h-[460px] w-[460px] rounded-full bg-[#005C1F]/20 blur-3xl" />
        </div>

        {/* MAIN */}
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}