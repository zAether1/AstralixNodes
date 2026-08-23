import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hytale Server Hosting | AstralixNodes',
  description: 'Hosting premium para Hytale. Alto rendimiento, protección DDoS y soporte 24/7. Prepárate para la aventura en Hytale. Hosting preparado para el lanzamiento oficial con soporte de mods.',
  openGraph: {
    title: 'Hytale Server Hosting | AstralixNodes',
    description: 'Hosting premium para Hytale. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/hytale',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/hytale.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function hytalePage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Hytale"
        description="Estamos preparando contenidos especiales para Hytale. Únete a Discord para recibir noticias primero."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/hytale.jpeg"
      />
    </>
  );
}
