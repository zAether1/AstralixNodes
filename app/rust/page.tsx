import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rust Server Hosting | AstralixNodes',
  description: 'Hosting premium para Rust. Alto rendimiento, protección DDoS y soporte 24/7. Sobrevive en el mundo hostil de Rust. Nodos potentes capaces de manejar cientos de jugadores y entidades sin tirones.',
  openGraph: {
    title: 'Rust Server Hosting | AstralixNodes',
    description: 'Hosting premium para Rust. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/rust',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/rust.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function rustPage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Rust"
        description="Estamos preparando contenidos especiales para Rust. Únete a Discord para enterarte primero."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/rust.jpeg"
      />
    </>
  );
}
