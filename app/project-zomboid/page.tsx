import React from 'react';
import Navbar from '../components/Navbar';
import GameHostingTemplate from '../components/GameHostingTemplate';
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

const plans = [
  { name: 'Starter', price: '4.99', ram: '4 GB', cpu: '2 vCores', storage: '50 GB NVMe', slots: 'Ilimitados', pid: '10' },
  { name: 'Advanced', price: '9.99', ram: '8 GB', cpu: '3 vCores', storage: '80 GB NVMe', slots: 'Ilimitados', pid: '11', popular: true },
  { name: 'Pro', price: '16.99', ram: '12 GB', cpu: '4 vCores', storage: '120 GB NVMe', slots: 'Ilimitados', pid: '12' },
  { name: 'Extreme', price: '24.99', ram: '16 GB', cpu: '6 vCores', storage: '200 GB NVMe', slots: 'Ilimitados', pid: '13' },
];

const features = [
  { icon: '🚀', title: 'Rendimiento Extremo', desc: 'Usamos procesadores Ryzen 9 y discos NVMe para garantizar cero lag.' },
  { icon: '🛡️', title: 'Protección DDoS', desc: 'Mitigación DDoS de capa 7 incluida en todos los planes gratuitamente.' },
  { icon: '⚡', title: 'Instalación Instantánea', desc: 'Tu servidor de Project Zomboid estará en línea segundos después de tu pago.' },
  { icon: '⚙️', title: 'Panel de Control', desc: 'Panel intuitivo basado en Pterodactyl para gestionar todo fácilmente.' }
];

export default function projectzomboidPage() {
  return (
    <>
      <Navbar />
      <GameHostingTemplate 
        gameName="Project Zomboid"
        gameId="project-zomboid"
        bgImage="/assets/games/project-zomboid.jpeg"
        description="Sobrevive al apocalipsis zombie con tus amigos. Servidores optimizados para manejar miles de zombies sin lag."
        plans={plans}
        features={features}
      />
    </>
  );
}
