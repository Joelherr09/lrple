// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Liga Regional Panadería La Estrella",
    template: "%s | Liga Regional Panadería La Estrella",
  },

  description:
    "Competencia oficial del vóleibol regional organizada por la Asociación de Vóleibol Limarí. Calendario, resultados, standings y cobertura digital powered by 4Volei.",

  keywords: [
    "Vóleibol",
    "Voleibol Chile",
    "ASVOLI",
    "4Volei",
    "Liga Regional",
    "Panadería La Estrella",
    "Vóley Limarí",
    "Voleibol Ovalle",
    "Voleibol Coquimbo",
  ],

  authors: [
    {
      name: "Joel Herrera",
      url: "https://joelherr.netlify.app",
    },
  ],

  creator: "Joel Herrera",
  publisher: "4Volei",

  metadataBase: new URL(
    "https://4volei.vercel.app"
  ),

  openGraph: {
    title:
      "Liga Regional Panadería La Estrella",

    description:
      "Calendario oficial, standings y cobertura digital del vóleibol regional.",

    url: "https://4volei.vercel.app",

    siteName:
      "Liga Regional Panadería La Estrella",

    locale: "es_CL",
    type: "website",

    images: [
      {
        url: "/logos/PanaderiaLaEstrella.jpg",
        width: 1200,
        height: 630,
        alt: "Liga Regional Panadería La Estrella",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Liga Regional Panadería La Estrella",

    description:
      "Competencia oficial del vóleibol regional.",

    images: [
      "/logos/PanaderiaLaEstrella.jpg",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#0f0f0f] font-sans text-white antialiased">
        {/* BACKGROUND GLOBAL */}
        <div className="fixed inset-0 -z-50 bg-[#0f0f0f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,178,62,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,92,31,0.18),transparent_30%)]" />

          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#D4B23E]/10 blur-3xl" />

          <div className="absolute bottom-[-220px] right-[-180px] h-[460px] w-[460px] rounded-full bg-[#005C1F]/20 blur-3xl" />
        </div>

        {/* MAIN */}
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}