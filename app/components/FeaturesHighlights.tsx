'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCurrency } from '../contexts/CurrencyContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const games = [
  { id: 'minecraft', name: 'Minecraft', image: '/assets/images/minecraft.jpeg', desc: 'Nuestros planes de Hosting para Servidores de Minecraft comienzan en un precio inigualable, son compatibles con todos los mods y plugins. ¡Comienza tu aventura de Minecraft ahora!' },
  { id: 'project-zomboid', name: 'Project Zomboid', image: '/assets/images/project-zomboid.jpg', desc: 'Sobrevive al apocalipsis zombie en servidores estables y rápidos con máxima capacidad de RAM.' },
  { id: 'palworld', name: 'Palworld', image: '/assets/images/palworld.jpeg', desc: 'Crea tu mundo de Palworld con la latencia más baja y la mejor estabilidad del mercado.' },
  { id: 'hytale', name: 'Hytale', image: '/assets/images/hytale.jpeg', desc: 'Prepárate para Hytale con nuestros servidores optimizados de alto rendimiento.' },
  { id: 'terraria', name: 'Terraria', image: '/assets/images/terraria-8.jpeg', desc: 'Explora y construye en Terraria con tus amigos sin interrupciones ni lag.' },
  { id: 'valheim', name: 'Valheim', image: '/assets/images/valheim.jpeg', desc: 'Conquista a las deidades nórdicas en Valheim con un servidor siempre activo.' }
];

export default function FeaturesHighlights() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { formatPrice } = useCurrency();

  useGSAP(() => {
    // Reveal animations on scroll with Stagger
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        }
      }
    );

    // Animación de los planes (Left Panel)
    gsap.fromTo('.plan-card',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.plan-card',
          start: 'top 85%'
        }
      }
    );

    // Animación del panel derecho (Game Display)
    gsap.fromTo('.game-panel',
      { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.game-panel',
          start: 'top 85%'
        }
      }
    );

  }, { scope: container });

  const nextGame = () => setActiveIndex((prev) => (prev + 1) % games.length);
  const prevGame = () => setActiveIndex((prev) => (prev - 1 + games.length) % games.length);

  const activeGame = games[activeIndex];

  return (
    <section ref={container} className="bg-[#101010] py-16 md:py-20 px-4">
      <div className="reveal max-w-6xl mx-auto">
        
        <div className="mb-10 flex justify-center">
          <div style={{ transform: 'skewX(-12deg)' }} className="inline-block bg-[#282828]/60 px-10 md:px-14 py-3 md:py-4">
            <h2 style={{ transform: 'skewX(12deg)' }} className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide">
              DESTACADOS
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          
          {/* Left Panel: Plans/Coupons */}
          <div className="w-full lg:w-[23.75rem] lg:min-h-[30.625rem] flex-shrink-0 order-2 lg:order-1 flex flex-col gap-2.5 lg:max-h-[37.5rem] lg:overflow-y-auto lg:pr-2">
            
            <div className="bg-[#282828]/60 border-2 border-[#282828] rounded-xl px-5 py-4 flex items-center justify-center gap-2.5 mb-1">
              <span className="text-[#64189D] text-2xl font-black uppercase tracking-wider">AstralixNodes2026</span>
            </div>

            <div className="flex flex-col gap-2.5">
              
              <div className="plan-card opacity-0 bg-[#282828]/60 rounded-xl border-2 border-white/10 px-4 py-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#141414] flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">Plan Básico</div>
                  <div className="text-[#888] text-xs">Ideal para comenzar</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm">$52.92</div>
                </div>
              </div>

              <div className="plan-card opacity-0 bg-[#282828]/60 rounded-xl border-2 border-white/10 px-4 py-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#141414] flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">Plan Pro</div>
                  <div className="text-[#888] text-xs">Para servidores medianos</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm">$117.72</div>
                </div>
              </div>

              <div className="plan-card opacity-0 bg-[#282828]/60 rounded-xl border-2 border-white/10 px-4 py-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#141414] flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">Plan Ultra</div>
                  <div className="text-[#888] text-xs">Máximo rendimiento</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm">$322.92</div> 
                </div>
              </div>

              <Link href="/dedicado" className="plan-card opacity-0 mt-2 block w-full text-center bg-[#282828]/60 hover:bg-[#64189D] text-white border-2 border-[#282828] hover:border-[#64189D] rounded-xl py-3.5 font-bold transition-all duration-300">
                Ver todos los planes
              </Link>
            </div>
          </div>

          {/* Right Panel: Game Display */}
          <div className="game-panel opacity-0 flex-1 order-1 lg:order-2 flex flex-col justify-end relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-0 bg-[#242424]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src={activeGame.image} 
                alt={activeGame.name} 
                fill 
                className="object-cover transition-opacity duration-500"
                style={{ opacity: 0.6 }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/80 to-transparent"></div>
            </div>

            {/* Carousel Navigation Top Right */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button 
                onClick={prevGame}
                className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-[#64189D] hover:border-[#64189D] transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button 
                onClick={nextGame}
                className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-[#64189D] hover:border-[#64189D] transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>

            <div className="relative z-10 p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-end justify-between">
              
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3">
                  {activeGame.name}
                </h3>
                <p className="text-[#a1a1aa] text-sm lg:text-base leading-relaxed max-w-xl">
                  {activeGame.desc}
                </p>
              </div>

              <div className="flex-shrink-0 w-full lg:w-auto">
                <Link href={`/${activeGame.id}`} className="group relative inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 font-bold text-white transition-all duration-300 bg-[#64189D] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(100,24,157,0.3)] hover:shadow-[0_0_30px_rgba(100,24,157,0.5)] hover:-translate-y-1">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center gap-2">
                    COMENZAR AHORA
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                  </span>
                </Link>
              </div>

            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {games.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-[#64189D] w-6' : 'bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
