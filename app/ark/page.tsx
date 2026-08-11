import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ark: Survival Evolved Server Hosting | AstralixNodes',
  description: 'Hosting premium para Ark: Survival Evolved. Alto rendimiento, protección DDoS y soporte 24/7. Doma dinosaurios y sobrevive. Servidores optimizados para clústeres y grandes bases con alto consumo de memoria.',
  openGraph: {
    title: 'Ark: Survival Evolved Server Hosting | AstralixNodes',
    description: 'Hosting premium para Ark: Survival Evolved. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/ark',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/ark.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function arkPage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Ark: Survival Evolved"
        description="Estamos preparando contenidos especiales para Ark: Survival Evolved. Únete a Discord y entérate primero."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/ark.jpeg"
      />
    </>
  );
}
