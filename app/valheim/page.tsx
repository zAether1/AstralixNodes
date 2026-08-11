import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Valheim Server Hosting | AstralixNodes',
  description: 'Hosting premium para Valheim. Alto rendimiento, protección DDoS y soporte 24/7. Conquista el décimo mundo nórdico. Servidores dedicados 24/7 para ti y tus vikingos.',
  openGraph: {
    title: 'Valheim Server Hosting | AstralixNodes',
    description: 'Hosting premium para Valheim. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/valheim',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/valheim.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function valheimPage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Valheim"
        description="Estamos preparando contenidos especiales para Valheim. Únete a Discord para ser el primero en enterarte."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/valheim.png"
      />
    </>
  );
}
