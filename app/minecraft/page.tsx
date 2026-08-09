'use client';
import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Price from '../components/Price';
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MinecraftPage() {
  useEffect(() => {
    // GSAP animations
    gsap.fromTo('.hero-text', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
    
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]">
      <Navbar />
      <main>
        {/* HERO */}
         <section className="relative bg-[#180228] pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[#020202]/80 z-10 mix-blend-multiply"></div>
             {/* Using standard Next image approach or just CSS for background */}
             <div className="absolute inset-0 bg-[url('/assets/games/minecraft-custom-hero.jpeg')] bg-cover bg-center opacity-30"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
               <div className="hero-text shrink-0 w-64 rounded-xl overflow-hidden border border-[#64189D]/20 shadow-[0_0_30px_rgba(100,24,157,0.3)] bg-[#180228]">
                  <div className="bg-[#64189D] text-white text-xs font-black uppercase text-center py-2 tracking-widest">Servidor Estrella</div>
                  <div className="aspect-[3/4] relative bg-black">
                     <Image src="/assets/games/minecraft-custom-cover.jpeg" alt="Minecraft" fill className="object-cover" />
                  </div>
               </div>
               
               <div className="flex-1 text-center lg:text-left">
                 <div className="hero-text flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider">Java Edition</span>
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider">Bedrock Edition</span>
                   <span className="px-3 py-1 rounded-full bg-[#64189D]/20 border border-[#64189D]/50 text-[#64189D] text-xs font-bold uppercase tracking-wider">Crossplay Nativo</span>
                 </div>
                 
                 <h1 className="hero-text text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tight">Minecraft</h1>
                 <h2 className="hero-text text-2xl md:text-3xl font-light text-[#64189D] uppercase mt-2 tracking-widest">Hosting Premium</h2>
                 
                 <p className="hero-text mt-6 text-[#999] text-lg max-w-2xl leading-relaxed">
                   La experiencia definitiva para tu comunidad. Alto rendimiento garantizado con procesadores NVMe, protección DDoS avanzada y un panel de control intuitivo.
                 </p>
                 
                 <div className="hero-text mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                   <a href="#planes" className="bg-[#64189D] hover:bg-[#7b1dc2] text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-[0_4px_20px_rgba(100,24,157,0.4)]">Ver Planes</a>
                   <a href="#caracteristicas" className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white font-bold px-8 py-3.5 rounded-lg transition-all">Características</a>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section id="planes" className="py-24 px-6 bg-[#020202]">
          <div className="max-w-7xl mx-auto">
             <div className="reveal-up text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Elige tu <span className="text-[#64189D]">Plan</span></h2>
               <p className="text-[#888] mt-4 max-w-2xl mx-auto">Planes escalables diseñados para comunidades de todos los tamaños.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Cobre', ram: '2 GB', slots: 'Ilimitados', price: '4,24' },
                  { name: 'Hierro', ram: '4 GB', slots: 'Ilimitados', price: '8,48' },
                  { name: 'Oro', ram: '8 GB', slots: 'Ilimitados', price: '16,96', pop: true },
                  { name: 'Diamante', ram: '12 GB', slots: 'Ilimitados', price: '25,44' }
                ].map((plan, i) => (
                   <div key={i} className={`reveal-up relative bg-[#180228] rounded-2xl border transform transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(100,24,157,0.18)] ${plan.pop ? 'border-[#64189D] -translate-y-1 shadow-[0_10px_30px_rgba(100,24,157,0.2)]' : 'border-white/5'} p-8 flex flex-col`}>
                      {plan.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#64189D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Más Popular</div>}
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-6 border-b border-white/10 pb-6">
                         <span className="text-3xl font-black text-[#64189D]"><Price eur={parseFloat(String(plan.price).replace(',','.'))} /></span>
                         <span className="text-[#666] text-sm">/mes</span>
                      </div>
                      
                      <ul className="space-y-4 mb-8 flex-1">
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-4 h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                           <span className="font-bold text-white">{plan.ram}</span> RAM DDR4/DDR5
                         </li>
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-4 h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                           Slots <span className="font-bold text-white">{plan.slots}</span>
                         </li>
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-4 h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                           NVMe Ilimitado
                         </li>
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-4 h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                           Bases de Datos MySQL
                         </li>
                      </ul>
                      
                      <button className={`w-full py-3 rounded-lg font-bold transition-colors transform hover:-translate-y-0.5 cursor-pointer ${plan.pop ? 'bg-[#64189D] text-white hover:bg-[#7b1dc2]' : 'bg-[#210940] text-[#999] hover:bg-[#64189D] hover:text-white'}`}>
                        Contratar Ahora
                      </button>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        <section id="caracteristicas" className="py-24 px-6 bg-[#0f1220]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-up text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Características</h2>
              <p className="text-[#9aa0b1] mt-4 max-w-2xl mx-auto">Todo lo que recibes al contratar: infraestructura sólida, control total y soporte 24/7.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="reveal-up flex gap-4 p-6 rounded-2xl border border-white/5 bg-[#1a0830]">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v6M5 7h14M4 12h16M3 17h18"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Rendimiento Premium</h4>
                  <p className="text-[#bbb] mt-1 text-sm">CPU de alta frecuencia y NVMe para TPS estables y cargas ultra rápidas.</p>
                </div>
              </div>

              <div className="reveal-up flex gap-4 p-6 rounded-2xl border border-white/5 bg-[#1a0830]">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-3.866 3.582-7 8-7v11M4 6v11a1 1 0 001 1h9M8 3v4"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Panel Intuitivo</h4>
                  <p className="text-[#bbb] mt-1 text-sm">Instala modpacks, administra backups y controla tu servidor con un clic.</p>
                </div>
              </div>

              <div className="reveal-up flex gap-4 p-6 rounded-2xl border border-white/5 bg-[#1a0830]">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Backups Automáticos</h4>
                  <p className="text-[#bbb] mt-1 text-sm">Snapshots diarios para que recuperes tu mundo al instante.</p>
                </div>
              </div>

              <div className="reveal-up flex gap-4 p-6 rounded-2xl border border-white/5 bg-[#1a0830]">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Protección DDoS</h4>
                  <p className="text-[#bbb] mt-1 text-sm">Capa de seguridad que mantiene tu servidor online ante ataques.</p>
                </div>
              </div>

              <div className="reveal-up flex gap-4 p-6 rounded-2xl border border-white/5 bg-[#1a0830]">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM2 20a10 10 0 0120 0"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Soporte 24/7</h4>
                  <p className="text-[#bbb] mt-1 text-sm">Equipo experto siempre disponible para ayudarte con cualquier duda.</p>
                </div>
              </div>

              <div className="reveal-up flex gap-4 p-6 rounded-2xl border border-white/5 bg-[#1a0830]">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#c084fc]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">Compatibilidad Total</h4>
                  <p className="text-[#bbb] mt-1 text-sm">Soporte para Java, Bedrock y cualquier modpack o versión personalizada.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
