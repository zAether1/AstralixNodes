'use client';
import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DedicadosPage() {
  useEffect(() => {
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
        <section className="relative bg-[#180228] min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-[#180228]/60 via-[#020202]/80 to-[#020202] z-10 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-[url('/assets/images/minecraft-hero-bg.webp')] bg-cover bg-center opacity-30"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
             <div className="hero-text inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
                Disponibilidad Inmediata
             </div>
             
             <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                MINECRAFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#64189D]">DEDICADO</span>
             </h1>
             
             <p className="hero-text mt-8 text-[#999] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Recursos 100% exclusivos, rendimiento hasta un <strong className="text-white">85% superior</strong> al alojamiento compartido. Hardware premium Ryzen con refrigeración líquida extrema.
             </p>
             
             <div className="hero-text mt-10">
                <a href="#planes" className="inline-flex items-center gap-3 bg-[#64189D] hover:bg-[#7b1dc2] text-white font-bold text-lg px-8 py-4 rounded-lg transition-all shadow-[0_0_30px_rgba(100,24,157,0.3)]">
                   Ver Hardware y Planes
                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
             </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 px-6 bg-[#020202] border-t border-white/5">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 <div className="reveal-up group relative overflow-hidden bg-gradient-to-br from-[#180228] to-[#10011c] border border-white/5 hover:border-[#64189D]/50 rounded-3xl p-8 lg:p-12 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                       <svg className="w-32 h-32 text-[#64189D]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                    </div>
                    <div className="relative z-10">
                       <div className="inline-block px-4 py-2 bg-[#64189D]/20 text-[#64189D] font-bold tracking-widest uppercase text-xs rounded-lg mb-6">Procesadores Ryzen</div>
                       <h3 className="text-3xl font-black text-white mb-4">Poder Extremo</h3>
                       <p className="text-[#888] leading-relaxed mb-8">Nuestra infraestructura está construida exclusivamente sobre procesadores AMD Ryzen serie 9000, garantizando el mejor rendimiento de un solo hilo para servidores de Minecraft Dedicado exigentes.</p>
                       <div className="flex items-center gap-4">
                          <div className="flex-1 bg-black/40 rounded-lg p-4 border border-white/5">
                             <div className="text-white font-bold mb-1">Ryzen 9 9900X</div>
                             <div className="text-[#64189D] text-sm font-mono">Hasta 5.6 GHz</div>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="reveal-up group relative overflow-hidden bg-gradient-to-br from-[#180228] to-[#10011c] border border-white/5 hover:border-[#64189D]/50 rounded-3xl p-8 lg:p-12 transition-all duration-500">
                    <div className="relative z-10">
                       <div className="inline-block px-4 py-2 bg-[#64189D]/20 text-[#64189D] font-bold tracking-widest uppercase text-xs rounded-lg mb-6">Refrigeración Líquida</div>
                       <h3 className="text-3xl font-black text-white mb-4">Overclock Estable</h3>
                       <p className="text-[#888] leading-relaxed mb-8">No nos conformamos con las frecuencias base. Gracias a nuestros sistemas de refrigeración líquida personalizados, mantenemos el hardware overclockeado de forma 100% estable 24/7.</p>
                       
                       <div className="space-y-4 mt-6">
                          <div>
                             <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#888] mb-2">
                                <span>Frecuencia Base</span>
                                <span>4.4 GHz</span>
                             </div>
                             <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                <div className="h-full bg-white/30 w-[70%]"></div>
                             </div>
                          </div>
                          <div>
                             <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#64189D] mb-2">
                                <span>Overclock AstralixNodes</span>
                                <span>5.6 GHz</span>
                             </div>
                             <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#64189D] to-purple-400 w-[95%] shadow-[0_0_10px_rgba(100,24,157,0.8)]"></div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 
              </div>
           </div>
        </section>

        {/* PLANES */}
        <section id="planes" className="py-24 px-6 bg-[#10011c]">
          <div className="max-w-7xl mx-auto">
             <div className="reveal-up text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Nodos <span className="text-[#64189D]">Dedicados</span></h2>
               <p className="text-[#888] mt-4 max-w-2xl mx-auto">Crea tu propia network dividiendo estos recursos exclusivos en múltiples servidores virtuales utilizando nuestro Server Splitter.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ryzen 9 - 16GB', core: '4 Cores / 8 Threads', ram: '16 GB DDR5', storage: '120 GB NVMe', price: '21,08' },
                  { name: 'Ryzen 9 - 32GB', core: '8 Cores / 16 Threads', ram: '32 GB DDR5', storage: '240 GB NVMe', price: '42,16', pop: true },
                  { name: 'Ryzen 9 - 64GB', core: '12 Cores / 24 Threads', ram: '64 GB DDR5', storage: '480 GB NVMe', price: '84,32' }
                ].map((plan, i) => (
                   <div key={i} className={`reveal-up relative bg-[#180228] rounded-2xl border ${plan.pop ? 'border-[#64189D] shadow-[0_10px_30px_rgba(100,24,157,0.2)] transform -translate-y-2' : 'border-white/5'} p-8 flex flex-col`}>
                      {plan.pop && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#64189D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Más Popular</div>}
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-6 border-b border-white/10 pb-6">
                         <span className="text-4xl font-black text-[#64189D]">€{plan.price}</span>
                         <span className="text-[#666] text-sm">/mes</span>
                      </div>
                      
                      <ul className="space-y-4 mb-8 flex-1">
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-5 h-5 text-[#64189D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
                           <span className="font-bold text-white">{plan.core}</span>
                         </li>
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-5 h-5 text-[#64189D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                           <span className="font-bold text-white">{plan.ram}</span>
                         </li>
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-5 h-5 text-[#64189D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                           <span className="font-bold text-white">{plan.storage}</span>
                         </li>
                         <li className="flex items-center gap-3 text-sm text-[#ddd]">
                           <svg className="w-5 h-5 text-[#64189D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                           Ubicaciones Premium
                         </li>
                      </ul>
                      
                      <button className={`w-full py-3.5 rounded-lg font-bold transition-colors ${plan.pop ? 'bg-[#64189D] text-white hover:bg-[#7b1dc2]' : 'bg-[#210940] text-[#999] hover:bg-[#64189D] hover:text-white'}`}>
                        Desplegar Dedicado
                      </button>
                   </div>
                ))}
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
