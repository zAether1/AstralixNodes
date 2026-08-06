'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EstadoPage() {
  const [uptime] = useState('99.99%');
  const [lastIncident] = useState('Hace 43 días');

  useEffect(() => {
    gsap.fromTo('.st-anim', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  const nodes = [
    { region: 'Miami, USA', status: 'Operacional', latency: '24ms', color: 'bg-green-500' },
    { region: 'Nueva York, USA', status: 'Operacional', latency: '35ms', color: 'bg-green-500' },
    { region: 'Madrid, España', status: 'Operacional', latency: '110ms', color: 'bg-green-500' },
    { region: 'Frankfurt, Alemania', status: 'Mantenimiento Programado', latency: '125ms', color: 'bg-yellow-500' },
    { region: 'São Paulo, Brasil', status: 'Operacional', latency: '140ms', color: 'bg-green-500' },
    { region: 'Tokio, Japón', status: 'Operacional', latency: '210ms', color: 'bg-green-500' },
  ];

  return (
    <div className="bg-[#020202] min-h-screen">
      <Navbar />
      
      <div className="pt-40 pb-20 px-6 max-w-[87.5rem] mx-auto">
        <div className="text-center mb-16 st-anim">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 font-bold rounded-lg mb-6">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Todos los sistemas operacionales
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Estado de la <span className="text-[#64189D]">Red</span></h1>
          <p className="text-lg text-[#999] max-w-2xl mx-auto">Monitoreo en tiempo real de nuestra infraestructura global, incidentes y ventanas de mantenimiento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 st-anim">
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <h3 className="text-[#888] font-bold uppercase tracking-wider text-sm mb-2">Uptime Global (90 Días)</h3>
            <span className="text-5xl font-black text-white">{uptime}</span>
          </div>
          <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <h3 className="text-[#888] font-bold uppercase tracking-wider text-sm mb-2">Último Incidente Mayor</h3>
            <span className="text-3xl font-black text-white mt-2">{lastIncident}</span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden mb-12 st-anim">
          <div className="p-6 border-b border-white/5 bg-[#111]">
            <h2 className="text-xl font-bold text-white">Estado por Región</h2>
          </div>
          <div className="divide-y divide-white/5">
            {nodes.map((node, i) => (
              <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{node.region}</h3>
                    <p className="text-[#888] text-sm">Latencia promedio: {node.latency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${node.color}`}></span>
                  <span className="text-white font-bold text-sm">{node.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="st-anim">
          <h2 className="text-2xl font-bold text-white mb-6">Incidentes Recientes</h2>
          <div className="border-l-2 border-[#64189D]/30 pl-6 space-y-8 relative before:absolute before:inset-y-0 before:-left-[1px] before:w-[2px] before:bg-gradient-to-b before:from-[#64189D] before:to-transparent">
            <div>
              <span className="text-sm font-bold text-[#64189D] mb-1 block">15 de Abril, 2026</span>
              <h4 className="text-white font-bold mb-2">Mantenimiento Programado - Frankfurt</h4>
              <p className="text-[#888] text-sm">Se realizó una actualización de los hypervisores a la última versión para mejorar el rendimiento de los procesadores Ryzen 9.</p>
            </div>
            <div>
              <span className="text-sm font-bold text-[#64189D] mb-1 block">02 de Marzo, 2026</span>
              <h4 className="text-white font-bold mb-2">Degradación Menor - Nueva York</h4>
              <p className="text-[#888] text-sm">Se detectó una degradación en la ruta de red hacia ciertos proveedores de internet en la costa este. El tráfico fue enrutado exitosamente mitigando el impacto.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
