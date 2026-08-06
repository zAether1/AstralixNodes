import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
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
  metadataBase: new URL("https://astralixnodes.com"),
  applicationName: "AstralixNodes",
  title: {
    default: "AstralixNodes - Premium Game Hosting & VPS Servers",
    template: "%s | AstralixNodes"
  },
  description: "AstralixNodes ofrece game hosting premium, VPS y servidores dedicados. Infraestructura de alto rendimiento con 99.9% de uptime, protección DDoS y soporte 24/7.",
  keywords: [
    "game hosting",
    "minecraft hosting",
    "servidores dedicados",
    "vps hosting",
    "cloud servers",
    "AstralixNodes",
    "protección ddos",
    "hosting latinoamerica",
    "hosting de juegos"
  ],
  authors: [{ name: "AstralixNodes", url: "https://astralixnodes.com" }],
  creator: "AstralixNodes",
  publisher: "AstralixNodes",
  category: "Game Hosting & Server Solutions",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://astralixnodes.com",
    siteName: "AstralixNodes",
    title: "AstralixNodes - Infraestructura Premium",
    description: "Game hosting y servidores VPS de alto rendimiento. Experimenta la latencia ultrabaja, protección DDoS y hardware NVMe para tu comunidad.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@astralixnodes",
    creator: "@astralixnodes",
    title: "AstralixNodes - Infraestructura Premium",
    description: "Game hosting y servidores VPS de alto rendimiento con protección DDoS y hardware NVMe.",
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
        <CurrencyProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}