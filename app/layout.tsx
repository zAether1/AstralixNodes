import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#64189D",
}

export const metadata: Metadata = {
  title: {
    default: "AstralixNodes - Premium Game Hosting & VPS Servers",
    template: "%s | AstralixNodes"
  },
  description: "AstralixNodes offers premium game server hosting, VPS & dedicated servers. High-performance infrastructure with 99.9% uptime, DDoS protection & 24/7 support. Start your server today.",
  keywords: [
    "game hosting",
    "minecraft hosting",
    "game server hosting",
    "VPS hosting",
    "dedicated servers",
    "cloud servers",
    "gaming servers",
    "AstralixNodes",
    "low latency hosting",
    "DDoS protection",
    "24/7 support",
    "modded game hosting",
  ],
  authors: [{ name: "AstralixNodes" }],
  creator: "AstralixNodes",
  publisher: "AstralixNodes",
  category: "Game Hosting & Server Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astralixnodes.com",
    siteName: "AstralixNodes",
    title: "AstralixNodes - Premium Game Hosting & VPS Servers",
    description: "Premium game hosting, VPS, and dedicated server solutions. High-performance infrastructure for gaming communities with DDoS protection.",
    images: [
      {
        url: "/icons/AstralixNodes.png",
        width: 512,
        height: 512,
        alt: "AstralixNodes Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AstralixNodes - Premium Game Hosting & VPS Servers",
    description: "Premium game hosting and server solutions. High-performance infrastructure for gaming communities with DDoS protection and 24/7 support.",
    images: ["/icons/AstralixNodes.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/AstralixNodes.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/AstralixNodes.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/icons/AstralixNodes.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/icons/AstralixNodes.png"
  },
  alternates: {
    canonical: "https://astralixnodes.com"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="/holy_assets/_next/static/css/cd25a3f32cac0dda.css" />
        <link rel="stylesheet" href="/holy_assets/_next/static/css/ce926a5c9bbb91c0.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AstralixNodes",
              "url": "https://astralixnodes.com",
              "logo": "https://astralixnodes.com/icons/AstralixNodes.png",
              "description": "Premium game hosting, VPS, and dedicated server solutions for gaming communities",
              "serviceType": ["Game Server Hosting", "VPS Hosting", "Dedicated Servers"],
              "areaServed": "Worldwide",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
              }
            })
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased bg-[#020202] text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}