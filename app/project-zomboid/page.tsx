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
  { icon: (<svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>), title: 'Rendimiento Extremo', desc: 'Usamos procesadores Ryzen 9 y discos NVMe para garantizar cero lag.' },
  { icon: (<svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>), title: 'Protección DDoS', desc: 'Mitigación DDoS de capa 7 incluida en todos los planes gratuitamente.' },
  { icon: (<svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>), title: 'Instalación Instantánea', desc: 'Tu servidor de Project Zomboid estará en línea segundos después de tu pago.' },
  { icon: (<svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>), title: 'Panel de Control', desc: 'Panel intuitivo basado en Pterodactyl para gestionar todo fácilmente.' }
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
