'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '../contexts/CurrencyContext';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from './animations/GlowCard';
import MagneticButton from './animations/MagneticButton';
import ScrollReveal from './animations/ScrollReveal';
import AnimatedHeading from './animations/AnimatedHeading';

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

  const gameImageRef = useRef<HTMLDivElement>(null);
  const gameTextRef = useRef<HTMLDivElement>(null);

  const nextGame = () => {
    animateSlideChange(() => {
      setActiveIndex((prev) => (prev + 1) % games.length);
    });
  };

  const prevGame = () => {
    animateSlideChange(() => {
      setActiveIndex((prev) => (prev - 1 + games.length) % games.length);
    });
  };

  const selectGame = (index: number) => {
    if (index === activeIndex) return;
    animateSlideChange(() => {
      setActiveIndex(index);
    });
  };

  const animateSlideChange = (updateState: () => void) => {
    if (prefersReducedMotion()) {
      updateState();
      return;
    }

    const tl = gsap.timeline({
      onComplete: updateState,
    });

    tl.to([gameImageRef.current, gameTextRef.current], {
      opacity: 0,
      scale: 0.98,
      y: 5,
      filter: 'blur(4px)',
      duration: 0.25,
      ease: 'power2.in',
    });
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    
    gsap.fromTo([gameImageRef.current, gameTextRef.current],
      { opacity: 0, scale: 1.02, y: -5, filter: 'blur(4px)' },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.45,
        ease: MOTION.ease.out,
      }
    );
  }, [activeIndex]);

  const activeGame = games[activeIndex];

  return (
    <section ref={container} className="bg-[#0e0320] py-20 md:py-28 px-6 relative overflow-hidden section-glow-top">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#9000FA]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[87.5rem] mx-auto relative z-10">
        
        {/* Title Section */}
        <div className="mb-14 text-center">
          <ScrollReveal variant="fade-down" className="inline-block">
            <div style={{ transform: 'skewX(-12deg)' }} className="bg-[#9000FA]/10 border border-[#9000FA]/30 px-10 md:px-14 py-3 md:py-4 rounded-lg shadow-[0_0_30px_rgba(144,0,250,0.1)]">
              <h2 style={{ transform: 'skewX(12deg)' }} className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider glow-text">
                DESTACADOS
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          
          {/* Left Panel: Plans/Coupons */}
          <div className="w-full lg:w-[23.75rem] lg:min-h-[30.625rem] flex-shrink-0 order-2 lg:order-1 flex flex-col gap-4">
            
            <ScrollReveal variant="fade-right" delay={0.1}>
              <div className="bg-[#9000FA]/10 border border-[#9000FA]/30 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.3)]">
                <span className="text-white/80 text-sm font-bold uppercase tracking-wider">Usa el cupón</span>
                <span className="text-[#9000FA] text-2xl font-black uppercase tracking-widest glow-text animate-pulse">PRIMERMES</span>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-4">
              
              <ScrollReveal variant="fade-right" delay={0.2}>
                <GlowCard glowColor="rgba(144,0,250,0.3)" glowIntensity="normal" className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#9000FA]/10 border border-[#9000FA]/30 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm">Plan Básico</div>
                    <div className="text-white/50 text-xs">Ideal para comenzar</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-sm">{formatPrice(4.24)}</div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              <ScrollReveal variant="fade-right" delay={0.3}>
                <GlowCard glowColor="rgba(144,0,250,0.3)" glowIntensity="normal" className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#9000FA]/10 border border-[#9000FA]/30 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm">Plan Pro</div>
                    <div className="text-white/50 text-xs">Para servidores medianos</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-sm">{formatPrice(8.48)}</div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              <ScrollReveal variant="fade-right" delay={0.4}>
                <GlowCard glowColor="rgba(144,0,250,0.3)" glowIntensity="normal" className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#9000FA]/10 border border-[#9000FA]/30 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-sm">Plan Ultra</div>
                    <div className="text-white/50 text-xs">Máximo rendimiento</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-sm">{formatPrice(16.96)}</div>
                  </div>
                </GlowCard>
              </ScrollReveal>

              <ScrollReveal variant="fade-right" delay={0.5}>
                <MagneticButton as="a" href="/minecraft" className="w-full">
                  <div className="w-full text-center bg-[#9000FA] hover:bg-[#7000C8] text-white border border-[#9000FA]/30 rounded-xl py-3.5 font-bold transition-all duration-300 shadow-[0_0_20px_rgba(144,0,250,0.2)] hover:shadow-[0_0_30px_rgba(144,0,250,0.4)] btn-shine cursor-pointer">
                    Ver todos los planes
                  </div>
                </MagneticButton>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Panel: Game Display */}
          <div className="flex-1 order-1 lg:order-2 flex flex-col justify-end relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-0 bg-[#140528] border border-white/5 shadow-2xl">
            {/* Background Image Container */}
            <div ref={gameImageRef} className="absolute inset-0 select-none">
              <Image 
                src={activeGame.image} 
                alt={activeGame.name} 
                fill 
                className="object-cover"
                style={{ opacity: 0.4 }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0320] via-[#0e0320]/80 to-transparent"></div>
            </div>

            {/* Carousel Navigation Top Right */}
            <div className="absolute top-6 right-6 z-10 flex gap-2.5">
              <button 
                onClick={prevGame}
                className="w-11 h-11 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white hover:text-white hover:bg-[#9000FA] hover:border-[#9000FA] transition-all duration-300 backdrop-blur-md cursor-pointer"
                aria-label="Previous game"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button 
                onClick={nextGame}
                className="w-11 h-11 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white hover:text-white hover:bg-[#9000FA] hover:border-[#9000FA] transition-all duration-300 backdrop-blur-md cursor-pointer"
                aria-label="Next game"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>

            {/* Bottom Content Area */}
            <div ref={gameTextRef} className="relative z-10 p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-end justify-between">
              
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-wider mb-3 glow-text">
                  {activeGame.name}
                </h3>
                <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-xl">
                  {activeGame.desc}
                </p>
              </div>

              <div className="flex-shrink-0 w-full lg:w-auto">
                <MagneticButton as="a" href={`/${activeGame.id}`} className="w-full lg:w-auto">
                  <div className="group relative inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 font-bold text-white transition-all duration-300 bg-[#9000FA] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(144,0,250,0.3)] hover:shadow-[0_0_30px_rgba(144,0,250,0.5)] btn-shine cursor-pointer text-center">
                    <span className="relative flex items-center justify-center gap-2">
                      COMENZAR AHORA
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </span>
                  </div>
                </MagneticButton>
              </div>

            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
              {games.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => selectGame(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx ? 'bg-[#9000FA] w-6 shadow-[0_0_10px_rgba(144,0,250,0.5)]' : 'bg-white/30 hover:bg-white/50 w-2'}`}
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
