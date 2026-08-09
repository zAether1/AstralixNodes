'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GamePlan, GameFeature } from '../types/games';
import Footer from './Footer';
import Price from './Price';

gsap.registerPlugin(ScrollTrigger);

interface GameHostingTemplateProps {
  gameName: string;
  gameId: string;
  bgImage: string;
  description: string;
  plans: GamePlan[];
  features: GameFeature[];
}

export default function GameHostingTemplate({ gameName, gameId, bgImage, description, plans, features }: GameHostingTemplateProps) {
  
  useEffect(() => {
    gsap.fromTo('.gh-hero-text', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
    
    const cards = gsap.utils.toArray('.gh-plan-card');
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    const feats = gsap.utils.toArray('.gh-feature');
    feats.forEach((feat: any) => {
      gsap.fromTo(feat,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feat,
            start: 'top 90%',
          }
        }
      );
    });
  }, []);

  return (
    <div className="bg-[#020202] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage} 
            alt={gameName} 
            fill 
            className="object-cover opacity-20 filter blur-sm scale-105" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent z-10" />
        </div>

        <div className="max-w-[87.5rem] mx-auto w-full relative z-20">
          <div className="max-w-3xl">
            <div className="gh-hero-text inline-block px-4 py-2 bg-[#64189D]/20 border border-[#64189D]/30 text-[#64189D] font-bold tracking-widest uppercase text-xs rounded-lg mb-6 backdrop-blur-sm">
              Game Hosting Premium
            </div>
            <h1 className="gh-hero-text text-5xl md:text-7xl font-black text-white leading-none tracking-tight uppercase mb-6">
              Servidores de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#64189D]">
                {gameName}
              </span>
            </h1>
            <p className="gh-hero-text text-[#999] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              {description}
            </p>
            <div className="gh-hero-text flex flex-wrap gap-4">
              <a href="#planes" className="bg-[#64189D] hover:bg-[#7b1dc2] transition-colors text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2">
                Ver Planes
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Planes Section */}
      <section id="planes" className="py-24 px-6 relative z-20 bg-[#020202]">
        <div className="max-w-[87.5rem] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Planes <span className="text-[#64189D]">Disponibles</span></h2>
            <p className="text-[#888] mt-4 max-w-2xl mx-auto">Configuraciones optimizadas para garantizar el mejor rendimiento sin lag para tu comunidad de {gameName}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
              <div key={idx} className="gh-plan-card bg-[#141414] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#64189D]/50 transition-all duration-300 flex flex-col h-full">
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#64189D] text-white text-[10px] font-black tracking-wider uppercase py-1 px-3 rounded-bl-lg z-10">
                    Más Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white"><Price eur={parseFloat(String(plan.price).replace(',','.'))} /></span>
                    <span className="text-[#666] text-sm">/mes</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#888] text-sm">RAM</span>
                    <span className="text-white font-bold text-sm">{plan.ram}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#888] text-sm">CPU</span>
                    <span className="text-white font-bold text-sm">{plan.cpu}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#888] text-sm">Almacenamiento</span>
                    <span className="text-white font-bold text-sm">{plan.storage}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#888] text-sm">Slots</span>
                    <span className="text-white font-bold text-sm">{plan.slots}</span>
                  </div>
                </div>

                <a href={`https://clientes.astralixnodes.com/cart.php?a=add&pid=${plan.pid}`} className="block w-full text-center bg-white/5 hover:bg-[#64189D] border border-white/10 hover:border-transparent text-white font-bold py-3 rounded-xl transition-all mt-auto">
                  Comprar Ahora
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5 relative z-20">
        <div className="max-w-[87.5rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">Por qué elegir <span className="text-[#64189D]">AstralixNodes</span></h2>
              <p className="text-[#888] text-lg mb-8 leading-relaxed">
                Nuestra infraestructura global garantiza baja latencia y alta disponibilidad para tu servidor de {gameName}. Olvídate del lag y concéntrate en jugar.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="gh-feature flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#64189D]/20 flex items-center justify-center flex-shrink-0">
                       <span className="text-2xl">{feat.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{feat.title}</h4>
                      <p className="text-[#666] text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(100,24,157,0.2)]">
               <Image src={bgImage} alt={`${gameName} Gameplay`} fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
