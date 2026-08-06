import React from 'react';
import CloudHostingTemplate from '../components/CloudHostingTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discord Bot Hosting | AstralixNodes',
  description: 'Mantén tu bot de Discord siempre en línea. Soporte nativo para Node.js, Python, Java y más con nuestra infraestructura de alta disponibilidad.',
  openGraph: {
    title: 'Discord Bot Hosting | AstralixNodes',
    description: 'Mantén tu bot de Discord siempre en línea. Soporte nativo para Node.js, Python, Java y más con nuestra infraestructura de alta disponibilidad.',
    url: 'https://astralixnodes.com/discord-bot',
    siteName: 'AstralixNodes',
    images: [{ url: '/assets/services/discord-bg.png', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  }
};

const plans = [
  { name: 'Básico', price: '4.99', features: ['1 vCore CPU', '2 GB RAM', '30 GB NVMe Storage', '1 IPv4 Dedicada', '1 Gbps de red'], pid: '110' },
  { name: 'Estándar', price: '9.99', features: ['2 vCore CPU', '4 GB RAM', '60 GB NVMe Storage', '1 IPv4 Dedicada', '1 Gbps de red'], pid: '111', popular: true },
  { name: 'Avanzado', price: '18.99', features: ['4 vCore CPU', '8 GB RAM', '120 GB NVMe Storage', '1 IPv4 Dedicada', '1 Gbps de red'], pid: '112' },
  { name: 'Empresarial', price: '34.99', features: ['8 vCore CPU', '16 GB RAM', '250 GB NVMe Storage', '1 IPv4 Dedicada', '1 Gbps de red'], pid: '113' },
];

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    ),
    title: 'NVMe Ultra Rápido',
    desc: 'Almacenamiento 100% NVMe en todos los nodos para velocidades de lectura/escritura hasta 6x más rápidas que los SSD tradicionales.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    ),
    title: 'Seguridad Empresarial',
    desc: 'Mitigación DDoS avanzada incluida. Tu infraestructura siempre estará protegida contra ataques capa 3/4 y capa 7.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
    ),
    title: 'Despliegue Global',
    desc: 'Múltiples centros de datos estratégicos alrededor del mundo para acercarte a tu audiencia con la latencia más baja.'
  }
];

export default function CloudPage() {
  return (
    <CloudHostingTemplate 
      title="Discord Bot Hosting"
      subtitle="Hosting 24/7"
      bgImage="/assets/services/discord-bg.png"
      description="Mantén tu bot de Discord siempre en línea. Soporte nativo para Node.js, Python, Java y más con nuestra infraestructura de alta disponibilidad."
      plans={plans}
      benefits={benefits}
    />
  );
}
