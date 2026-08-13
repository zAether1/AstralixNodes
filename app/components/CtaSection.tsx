'use client';
import React, { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from './animations/GlowCard';
import MagneticButton from './animations/MagneticButton';
import ScrollReveal from './animations/ScrollReveal';

export default function CtaSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll reveal for CTA block
    gsap.fromTo('.cta-reveal',
      { opacity: 0, scale: 0.96, filter: 'blur(6px)' },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        duration: 0.9, 
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%'
        }
      }
    );

    // Subtle drift animation on ambient bg light
    if (!prefersReducedMotion()) {
      gsap.fromTo('.cta-bg-orb',
        { x: -20, y: -20, scale: 0.95 },
        {
          x: 20,
          y: 20,
          scale: 1.05,
          duration: 10,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        }
      );
    }
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="w-full py-16 px-6 relative overflow-hidden bg-[#0a0118] section-glow-top"
    >
      {/* Background orbs */}
      <div className="cta-bg-orb absolute top-0 left-0 w-[500px] h-[500px] bg-[#9000FA]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="cta-bg-orb absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9000FA]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="cta-reveal max-w-7xl mx-auto relative z-10 opacity-0">
        <GlowCard glowColor="rgba(144, 0, 250, 0.4)" glowIntensity="strong" className="p-8 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#c084fc] font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9000FA] shadow-[0_0_10px_#9000FA] animate-pulse"></span>
                CREA TU SERVIDOR
              </p>
              <h2 className="text-3xl md:text-[42px] font-black uppercase text-white leading-none tracking-tight">
                ¿LISTO PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c084fc] glow-text">COMENZAR</span>?
              </h2>
              <p className="text-sm md:text-base text-white/65 leading-relaxed max-w-2xl">
                ¡Comienza hoy y te ofreceremos un <span className="text-white font-bold">descuento</span> en tu primera factura con nuestra promoción de nuevos clientes! Disponible por tiempo limitado.
              </p>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <MagneticButton as="a" href="/discounts" className="w-full">
                <div className="group flex items-center bg-gradient-to-r from-[#9000FA] to-[#7000C8] border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(144,0,250,0.4)] transition-all duration-300 btn-shine w-full justify-center">
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase tracking-widest text-white/60 font-bold leading-tight mb-1">PROMOCIONES</p>
                      <p className="text-base font-black text-white uppercase leading-tight tracking-wider">CUPONES ACTIVOS</p>
                    </div>
                  </div>
                  <div className="px-5 py-5 text-2xl font-mono text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all bg-white/5 border-l border-white/5 h-full flex items-center">»</div>
                </div>
              </MagneticButton>
            </div>

          </div>
        </GlowCard>
      </div>
    </section>
  );
}
