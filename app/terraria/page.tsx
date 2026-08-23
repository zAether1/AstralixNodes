import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terraria Server Hosting | AstralixNodes',
  description: 'Hosting premium para Terraria. Alto rendimiento, protección DDoS y soporte 24/7. Cava, lucha, explora y construye en Terraria. Servidores de alto rendimiento para vanilla y tModLoader.',
  openGraph: {
    title: 'Terraria Server Hosting | AstralixNodes',
    description: 'Hosting premium para Terraria. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/terraria',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/terraria.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function terrariaPage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Terraria"
        description="Estamos preparando contenidos especiales para Terraria. Únete a Discord y mantente al día."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/terraria-wp.jpg"
      />
    </>
  );
}
