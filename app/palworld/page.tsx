import React from 'react';
import Navbar from '../components/Navbar';
import GameHostingTemplate from '../components/GameHostingTemplate';
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

const plans = [
  { name: 'Starter', price: '4.99', ram: '4 GB', cpu: '2 vCores', storage: '50 GB NVMe', slots: 'Ilimitados', pid: '20' },
  { name: 'Advanced', price: '9.99', ram: '8 GB', cpu: '3 vCores', storage: '80 GB NVMe', slots: 'Ilimitados', pid: '21', popular: true },
  { name: 'Pro', price: '16.99', ram: '12 GB', cpu: '4 vCores', storage: '120 GB NVMe', slots: 'Ilimitados', pid: '22' },
  { name: 'Extreme', price: '24.99', ram: '16 GB', cpu: '6 vCores', storage: '200 GB NVMe', slots: 'Ilimitados', pid: '23' },
];

const features = [
  { icon: '🚀', title: 'Rendimiento Extremo', desc: 'Usamos procesadores Ryzen 9 y discos NVMe para garantizar cero lag.' },
  { icon: '🛡️', title: 'Protección DDoS', desc: 'Mitigación DDoS de capa 7 incluida en todos los planes gratuitamente.' },
  { icon: '⚡', title: 'Instalación Instantánea', desc: 'Tu servidor de Palworld estará en línea segundos después de tu pago.' },
  { icon: '⚙️', title: 'Panel de Control', desc: 'Panel intuitivo basado en Pterodactyl para gestionar todo fácilmente.' }
];

export default function palworldPage() {
  return (
    <>
      <Navbar />
      <GameHostingTemplate 
        gameName="Palworld"
        gameId="palworld"
        bgImage="/assets/games/palworld.jpeg"
        description="Explora, sobrevive y atrapa Pals en tu propio servidor dedicado. Máximo rendimiento para tu mundo multijugador."
        plans={plans}
        features={features}
      />
    </>
  );
}
