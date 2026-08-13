'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import { GamePlan, GameFeature } from '../types/games';
import Footer from './Footer';
import GlowCard from './animations/GlowCard';
import MagneticButton from './animations/MagneticButton';
import AnimatedHeading from './animations/AnimatedHeading';
import ScrollReveal from './animations/ScrollReveal';

interface GameHostingTemplateProps {
  gameName: string;
  gameId: string;
  bgImage: string;
  description: string;
  plans: GamePlan[];
  features: GameFeature[];
}

export default function GameHostingTemplate({ gameName, gameId, bgImage, description, plans, features }: GameHostingTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(['.gh-hero-text', '.gh-plan-card', '.gh-feature'], { opacity: 1, y: 0, x: 0 });
      return;
    }

    // Hero entrance animations
    gsap.fromTo('.gh-hero-text', 
      { y: 40, opacity: 0, filter: 'blur(6px)' }, 
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.1, ease: MOTION.ease.out }
    );

    // Parallax effect on the hero background image
    gsap.fromTo('.gh-hero-bg',
      { yPercent: -5 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gh-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Plan card reveal
    gsap.fromTo('.gh-plan-card',
      { opacity: 0, y: 50, filter: 'blur(4px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.1,
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: '.gh-plan-cards-container',
          start: 'top 85%',
        }
      }
    );

    // Features reveal
    gsap.fromTo('.gh-feature',
      { opacity: 0, x: -30, filter: 'blur(4px)' },
      { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.08,
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: '.gh-features-container',
          start: 'top 90%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#020202] min-h-screen">
      {/* Hero Section */}
      <section className="gh-hero-section relative pt-40 pb-32 px-6 overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="gh-hero-bg absolute inset-0 w-full h-full scale-105">
            <Image 
              src={bgImage} 
              alt={gameName} 
              fill 
              className="object-cover opacity-20 filter blur-sm" 
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent z-10" />
        </div>

        <div className="max-w-[87.5rem] mx-auto w-full relative z-20">
          <div className="max-w-3xl">
            <div className="gh-hero-text inline-block px-4 py-2 bg-[#9000FA]/15 border border-[#9000FA]/30 text-[#9000FA] font-bold tracking-widest uppercase text-xs rounded-lg mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(144,0,250,0.15)] opacity-0">
              Game Hosting Premium
            </div>
            <h1 className="gh-hero-text text-5xl md:text-7xl font-black text-white leading-none tracking-tight uppercase mb-6 opacity-0">
              Servidores de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9000FA] glow-text">
                {gameName}
              </span>
            </h1>
            <p className="gh-hero-text text-white/55 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl opacity-0">
              {description}
            </p>
            <div className="gh-hero-text flex flex-wrap gap-4 opacity-0">
              <MagneticButton as="a" href="#planes">
                <div className="bg-[#9000FA] hover:bg-[#7000C8] transition-colors text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(144,0,250,0.25)] hover:shadow-[0_0_35px_rgba(144,0,250,0.45)] btn-shine cursor-pointer">
                  Ver Planes
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Planes Section */}
      <section id="planes" className="py-24 px-6 relative z-20 bg-[#020202] section-glow-top">
        <div className="max-w-[87.5rem] mx-auto">
          <div className="text-center mb-16">
            <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              Planes Disponibles
            </AnimatedHeading>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">Configuraciones optimizadas para garantizar el mejor rendimiento sin lag para tu comunidad de {gameName}.</p>
          </div>

          <div className="gh-plan-cards-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
              <div key={idx} className="gh-plan-card opacity-0 h-full flex">
                <GlowCard 
                  glowColor={plan.popular ? "rgba(144,0,250,0.4)" : "rgba(144,0,250,0.25)"}
                  glowIntensity={plan.popular ? "strong" : "subtle"}
                  className={`relative p-6 rounded-2xl flex flex-col h-full w-full ${plan.popular ? 'border-[#9000FA]/40 shadow-[0_0_20px_rgba(144,0,250,0.1)]' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#9000FA] text-white text-[10px] font-black tracking-wider uppercase py-1.5 px-3.5 rounded-tr-xl rounded-bl-xl z-10 shadow-md">
                      Más Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">${plan.price}</span>
                      <span className="text-white/40 text-sm">/mes</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-1 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/50 text-sm">RAM</span>
                      <span className="text-white font-bold text-sm">{plan.ram}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/50 text-sm">CPU</span>
                      <span className="text-white font-bold text-sm">{plan.cpu}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/50 text-sm">Almacenamiento</span>
                      <span className="text-white font-bold text-sm">{plan.storage}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white/50 text-sm">Slots</span>
                      <span className="text-white font-bold text-sm">{plan.slots}</span>
                    </div>
                  </div>

                  <MagneticButton as="a" href={`https://clientes.astralixnodes.com/cart.php?a=add&pid=${plan.pid}`} className="w-full mt-auto">
                    <div className={`block w-full text-center py-3 rounded-xl font-bold transition-all border cursor-pointer ${plan.popular ? 'bg-[#9000FA] border-[#9000FA] text-white shadow-[0_0_15px_rgba(144,0,250,0.3)] hover:bg-[#7000C8]' : 'bg-white/5 hover:bg-[#9000FA] border-white/10 hover:border-transparent text-white'}`}>
                      Comprar Ahora
                    </div>
                  </MagneticButton>
                </GlowCard>
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
              <ScrollReveal variant="fade-right">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">Por qué elegir <span className="text-[#9000FA] glow-text">AstralixNodes</span></h2>
                <p className="text-white/50 text-lg mb-10 leading-relaxed">
                  Nuestra infraestructura global garantiza baja latencia y alta disponibilidad para tu servidor de {gameName}. Olvídate del lag y concéntrate en jugar.
                </p>
              </ScrollReveal>

              <div className="gh-features-container grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feat, idx) => (
                  <div key={idx} className="gh-feature opacity-0 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#9000FA]/10 border border-[#9000FA]/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(144,0,250,0.1)]">
                       <span className="text-2xl">{feat.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{feat.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <ScrollReveal variant="scale" className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(144,0,250,0.25)]">
               <Image src={bgImage} alt={`${gameName} Gameplay`} fill className="object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
