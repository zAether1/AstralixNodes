export const metadata = {
  title: 'Minecraft Dedicado | AstralixNodes',
  description: 'Servidores de Minecraft completamente dedicados con recursos garantizados, NVMe SSDs y procesadores de última generación.',
  openGraph: {
    title: 'Minecraft Dedicado | AstralixNodes',
    description: 'Servidores de Minecraft completamente dedicados con recursos garantizados, NVMe SSDs y procesadores de última generación.',
    url: 'https://astralixnodes.com/minecraft-dedicado',
    siteName: 'AstralixNodes',
    images: [
      {
        url: '/assets/branding/og-image.png', // Assuming a generic OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft Dedicado | AstralixNodes',
    description: 'Servidores de Minecraft completamente dedicados con recursos garantizados, NVMe SSDs y procesadores de última generación.',
    images: ['/assets/branding/og-image.png'],
  },
};

export default function MinecraftDedicadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
