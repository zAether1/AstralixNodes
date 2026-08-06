import React from 'react';
import Navbar from '../components/Navbar';
import GameHostingTemplate from '../components/GameHostingTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FiveM (GTA V) Server Hosting | AstralixNodes',
  description: 'Hosting premium para FiveM (GTA V). Alto rendimiento, protección DDoS y soporte 24/7. Crea el mejor servidor de Roleplay en GTA V. Máxima potencia de CPU para manejar cientos de jugadores y scripts pesados.',
  openGraph: {
    title: 'FiveM (GTA V) Server Hosting | AstralixNodes',
    description: 'Hosting premium para FiveM (GTA V). Alto rendimiento, protección DDoS y soporte 24/7.',
    url: 'https://astralixnodes.com/fivem',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/games/fivem.jpeg', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

const plans = [
  { name: 'Starter', price: '4.99', ram: '4 GB', cpu: '2 vCores', storage: '50 GB NVMe', slots: 'Ilimitados', pid: '80' },
  { name: 'Advanced', price: '9.99', ram: '8 GB', cpu: '3 vCores', storage: '80 GB NVMe', slots: 'Ilimitados', pid: '81', popular: true },
  { name: 'Pro', price: '16.99', ram: '12 GB', cpu: '4 vCores', storage: '120 GB NVMe', slots: 'Ilimitados', pid: '82' },
  { name: 'Extreme', price: '24.99', ram: '16 GB', cpu: '6 vCores', storage: '200 GB NVMe', slots: 'Ilimitados', pid: '83' },
];

const features = [
  { icon: '🚀', title: 'Rendimiento Extremo', desc: 'Usamos procesadores Ryzen 9 y discos NVMe para garantizar cero lag.' },
  { icon: '🛡️', title: 'Protección DDoS', desc: 'Mitigación DDoS de capa 7 incluida en todos los planes gratuitamente.' },
  { icon: '⚡', title: 'Instalación Instantánea', desc: 'Tu servidor de FiveM (GTA V) estará en línea segundos después de tu pago.' },
  { icon: '⚙️', title: 'Panel de Control', desc: 'Panel intuitivo basado en Pterodactyl para gestionar todo fácilmente.' }
];

export default function fivemPage() {
  return (
    <>
      <Navbar />
      <GameHostingTemplate 
        gameName="FiveM (GTA V)"
        gameId="fivem"
        bgImage="/assets/games/fivem.jpeg"
        description="Crea el mejor servidor de Roleplay en GTA V. Máxima potencia de CPU para manejar cientos de jugadores y scripts pesados."
        plans={plans}
        features={features}
      />
    </>
  );
}
