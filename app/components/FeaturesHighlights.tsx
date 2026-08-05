'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const games = [
  { id: 'minecraft', name: 'Minecraft', image: '/banners/minecraft-banners.webp', desc: 'Nuestros planes de Hosting para Servidores de Minecraft comienzan en $4.24, son compatibles con todos los mods y plugins. ¡Comienza tu aventura de Minecraft ahora!' },
  { id: 'hytale', name: 'Hytale', image: '/banners/node.webp', desc: 'Prepárate para Hytale con nuestros servidores optimizados de alto rendimiento.' },
  { id: 'palworld', name: 'Palworld', image: '/banners/valheim-banner.webp', desc: 'Crea tu mundo de Palworld con la latencia más baja y la mejor estabilidad del mercado.' },
  { id: 'rust', name: 'Rust', image: '/banners/rust-banner.webp', desc: 'Servidores de Rust sin lag, con protección Anti-DDoS para que tu wipe sea perfecto.' },
  { id: 'ark', name: 'ARK: Survival Evolved', image: '/banners/ark-banners.webp', desc: 'Domina los dinosaurios en ARK con nuestros servidores de alto rendimiento.' },
  { id: 'terraria', name: 'Terraria', image: '/banners/cs2-banner.webp', desc: 'Explora y construye en Terraria con tus amigos sin interrupciones.' },
  { id: 'zomboid', name: 'Project Zomboid', image: '/banners/gmod-banner.webp', desc: 'Sobrevive al apocalipsis zombie en servidores estables y rápidos.' }
];

export default function FeaturesHighlights() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Reveal animations on scroll
    const els = gsap.utils.toArray('.reveal');
    els.forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: container });

  const nextGame = () => setActiveIndex((prev) => (prev + 1) % games.length);
  const prevGame = () => setActiveIndex((prev) => (prev - 1 + games.length) % games.length);

  // To create a continuous loop effect, we can duplicate the array or just render a subset.
  // For simplicity, we just use the active index to determine the center.
  const getVisibleGames = () => {
    const result = [];
    for (let i = -1; i <= 5; i++) {
      let idx = (activeIndex + i + games.length) % games.length;
      result.push({ ...games[idx], keyIndex: i });
    }
    return result;
  };

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
          <div className="w-full lg:w-[23.75rem] lg:min-h-[30.625rem] flex-shrink-0 order-2 lg:order-1 flex flex-col gap-2.5 lg:max-h-[37.5rem] lg:overflow-y-auto lg:pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 24, 157, 0.7) rgba(0,0,0,0.4)' }}>
            
            <div className="bg-[#282828]/60 border-2 border-[#282828] rounded-xl px-5 py-4 flex items-center justify-center gap-2.5 mb-1">
              <span className="text-white text-lg font-extrabold">Usa el cupón</span>
              <span className="text-[#64189D] text-2xl font-black uppercase tracking-wider">PRIMERMES</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#282828]/60 rounded-xl border-2 border-white/10 px-4 py-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#141414] flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm">Plan {i === 1 ? 'Básico' : i === 2 ? 'Pro' : 'Ultra'}</div>
                    <div className="text-[#888] text-xs">Ideal para comenzar</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">${(i * 4.24).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/minecraft" className="block w-full bg-[#282828]/60 text-[#64189D] rounded-lg py-3.5 px-6 text-sm font-bold uppercase tracking-wide text-center transition-all hover:bg-[#1a1a1a] hover:-translate-y-0.5 mt-2">
              VER TODOS LOS PLANES
            </Link>

          </div>

          {/* Right Panel: Game Slider */}
          <div className="flex-1 order-1 lg:order-2 min-w-0 lg:flex">
            <div className="bg-[#282828]/60 rounded-xl border-2 border-[#282828] p-5 md:p-6 lg:flex-1 lg:flex lg:flex-col lg:justify-center lg:min-h-[30.625rem] w-full">
              
              <div className="relative overflow-hidden rounded-xl py-2.5 select-none">
                <button onClick={prevGame} aria-label="Juego anterior" className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/80 border-2 border-[#64189D]/40 text-white flex items-center justify-center transition-all hover:bg-[#64189D]/90 hover:border-[#64189D] hover:text-white">
                  ‹
                </button>
                <button onClick={nextGame} aria-label="Juego siguiente" className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/80 border-2 border-[#64189D]/40 text-white flex items-center justify-center transition-all hover:bg-[#64189D]/90 hover:border-[#64189D] hover:text-white">
                  ›
                </button>
                
                <div className="flex gap-3 items-center px-2.5 transition-transform duration-500 ease-in-out overflow-x-auto no-scrollbar" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                  {getVisibleGames().map((g) => {
                    const isActive = g.keyIndex === 0;
                    return (
                      <div 
                        key={`${g.id}-${g.keyIndex}`} 
                        onClick={() => {
                          if (g.keyIndex > 0) nextGame();
                          else if (g.keyIndex < 0) prevGame();
                        }}
                        className="flex-shrink-0 cursor-pointer rounded-xl w-[84px] h-[124px] sm:w-[94px] sm:h-[137px] md:w-[112px] md:h-[162px] flex items-center justify-center"
                      >
                        <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isActive ? 'opacity-100 w-full h-full border-2 border-[#64189D]' : 'opacity-40 grayscale-[20%] brightness-[0.7] w-[70px] h-[100px] sm:w-[80px] sm:h-[115px] md:w-[110px] md:h-[160px] hover:opacity-60 hover:scale-105'}`}>
                          <Image alt={g.name} width={265} height={382} className="w-full h-full object-cover rounded-xl" src={g.image} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeGame.id}>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide">{activeGame.name}</h3>
                  {activeGame.id === 'minecraft' && (
                    <span className="bg-[#64189D] text-white text-xs font-extrabold uppercase tracking-wide px-3 py-1 rounded-md">POPULAR</span>
                  )}
                </div>
                <p className="text-sm md:text-base text-[#e0e0e0] leading-relaxed">
                  {activeGame.desc}
                </p>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
