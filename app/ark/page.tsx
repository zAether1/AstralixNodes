import React from 'react';
import Navbar from '../components/Navbar';
import GameHostingTemplate from '../components/GameHostingTemplate';
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

const plans = [
  { name: 'Starter', price: '4.99', ram: '4 GB', cpu: '2 vCores', storage: '50 GB NVMe', slots: 'Ilimitados', pid: '50' },
  { name: 'Advanced', price: '9.99', ram: '8 GB', cpu: '3 vCores', storage: '80 GB NVMe', slots: 'Ilimitados', pid: '51', popular: true },
  { name: 'Pro', price: '16.99', ram: '12 GB', cpu: '4 vCores', storage: '120 GB NVMe', slots: 'Ilimitados', pid: '52' },
  { name: 'Extreme', price: '24.99', ram: '16 GB', cpu: '6 vCores', storage: '200 GB NVMe', slots: 'Ilimitados', pid: '53' },
];

const features = [
  { icon: '🚀', title: 'Rendimiento Extremo', desc: 'Usamos procesadores Ryzen 9 y discos NVMe para garantizar cero lag.' },
  { icon: '🛡️', title: 'Protección DDoS', desc: 'Mitigación DDoS de capa 7 incluida en todos los planes gratuitamente.' },
  { icon: '⚡', title: 'Instalación Instantánea', desc: 'Tu servidor de Ark: Survival Evolved estará en línea segundos después de tu pago.' },
  { icon: '⚙️', title: 'Panel de Control', desc: 'Panel intuitivo basado en Pterodactyl para gestionar todo fácilmente.' }
];

export default function arkPage() {
  return (
    <>
      <Navbar />
      <GameHostingTemplate 
        gameName="Ark: Survival Evolved"
        gameId="ark"
        bgImage="/assets/games/ark.jpeg"
        description="Doma dinosaurios y sobrevive. Servidores optimizados para clústeres y grandes bases con alto consumo de memoria."
        plans={plans}
        features={features}
      />
    </>
  );
}
