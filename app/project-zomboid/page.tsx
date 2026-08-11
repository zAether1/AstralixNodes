import React from 'react';
import Navbar from '../components/Navbar';
import ComingSoonBlock from '../components/ComingSoonBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Zomboid Server Hosting | AstralixNodes',
  description: 'Hosting premium para Project Zomboid. Alto rendimiento, protección DDoS y soporte 24/7. Sobrevive al apocalipsis zombie con tus amigos. Servidores optimizados para manejar miles de zombies sin lag.',
  openGraph: {
    title: 'Project Zomboid Server Hosting | AstralixNodes',
    description: 'Hosting premium para Project Zomboid. Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/project-zomboid',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/project-zomboid.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

export default function projectzomboidPage() {
  return (
    <>
      <Navbar />
      <ComingSoonBlock
        title="Project Zomboid"
        description="Estamos preparando contenidos especiales para Project Zomboid. Únete a Discord para ser el primero en conocerlo."
        ctaText="Unirme a Discord"
        bgImage="/assets/games/bg-project-zomboid-games.jpg"
      />
    </>
  );
}
