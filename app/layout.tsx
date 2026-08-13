import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

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
  metadataBase: new URL("https://astralixnodes.net"),
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
  authors: [{ name: "AstralixNodes", url: "https://astralixnodes.net" }],
  creator: "AstralixNodes",
  publisher: "AstralixNodes",
  category: "Game Hosting & Server Solutions",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://astralixnodes.net",
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
    canonical: "https://astralixnodes.net"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased bg-[#020202] text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AstralixNodes",
              "url": "https://astralixnodes.net",
              "logo": "https://astralixnodes.net/icons/AstralixNodes.png",
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
        <CurrencyProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </CurrencyProvider>
        <Analytics />
        <Script id="crisp-chat" strategy="afterInteractive">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID="5c60d237-f2e7-43c7-9917-14d601af7570";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
        </Script>
      </body>
    </html>
  );
}