export const metadata = {
  title: 'Servidor Dedicado | AstralixNodes',
  description: 'Infraestructura premium y alto rendimiento para proyectos profesionales. Hardware dedicado 100% exclusivo.',
  openGraph: {
    title: 'Servidor Dedicado | AstralixNodes',
    description: 'Infraestructura premium y alto rendimiento para proyectos profesionales. Hardware dedicado 100% exclusivo.',
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
    title: 'Servidor Dedicado | AstralixNodes',
    description: 'Infraestructura premium y alto rendimiento para proyectos profesionales. Hardware dedicado 100% exclusivo.',
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
