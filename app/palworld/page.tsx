import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palworld Server Hosting | AstralixNodes',
  description: 'Hosting premium para Palworld. Alto rendimiento, protección DDoS y soporte 24/7. Explora, sobrevive y atrapa Pals en tu propio servidor dedicado. Máximo rendimiento para tu mundo multijugador.',
  openGraph: {
    title: 'Palworld Server Hosting | AstralixNodes',
    description: 'Hosting premium para Palworld. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/palworld',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/palworld.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function palworldPage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Palworld"
        description="Estamos preparando contenidos especiales para Palworld. Únete a Discord y recibe novedades primero."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/palworld.jpeg"
      />
    </>
  );
}
