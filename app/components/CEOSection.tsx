'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

export default function CEOSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set('.ceo-reveal-container', { opacity: 1, y: 0 });
      return;
    }

    // Scroll reveal timeline for CEO block
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.ceo-photo-container',
      { opacity: 0, scale: 0.85, rotate: -3 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: MOTION.ease.snap }
    )
    .fromTo('.ceo-text-reveal',
      { opacity: 0, y: 30, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.12, ease: MOTION.ease.out },
      '-=0.6'
    )
    .fromTo('.ceo-quote-reveal',
      { opacity: 0, x: -20, borderLeftWidth: 0 },
      { opacity: 1, x: 0, borderLeftWidth: 4, duration: 0.8, ease: MOTION.ease.out },
      '-=0.4'
    );

  }, { scope: container });

  return (
    <section ref={container} className="bg-gradient-to-br from-[#9000FA] via-[#7000C8] to-[#180228] overflow-hidden py-24 sm:py-28 relative section-glow-top">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 sm:gap-16 relative z-10">
        
        {/* CEO Profile Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="ceo-photo-container opacity-0 relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#180228] shadow-[0_0_50px_rgba(24,2,40,0.6)] bg-[#180228]">
            <Image 
              src="/icons/Foto-1-08-2026.png" 
              alt="Carlos Jahir - CEO AstralixNodes" 
              fill 
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* CEO Content Details */}
        <div className="w-full md:w-2/3 text-center md:text-left">
          <p className="ceo-text-reveal opacity-0 text-[#180228] font-black tracking-widest uppercase mb-2 text-xs md:text-sm">Fundador & CEO</p>
          <h2 className="ceo-text-reveal opacity-0 text-4xl md:text-5xl font-black text-white mb-2 leading-tight uppercase">Carlos Jahir</h2>
          <p className="ceo-text-reveal opacity-0 text-white/70 text-lg md:text-xl font-bold mb-6 italic">@_zAether</p>
          
          <div className="ceo-text-reveal opacity-0 text-white/90 text-sm md:text-base leading-relaxed mb-8 space-y-4 text-left font-medium">
            <p>El camino comenzó en 2023 con la visión de <strong>ZerithNodes</strong>. Aunque el proyecto fue pausado temporalmente, esa pausa nos permitió reinventarnos, escalar nuestra tecnología y planear algo mucho más grande.</p>
            <p>En 2026 regresamos con una identidad renovada, infraestructura de última generación y un enfoque claro hacia Latinoamérica y Europa. Así nació <strong>AstralixNodes</strong>.</p>
          </div>

          <blockquote className="ceo-quote-reveal opacity-0 text-white text-lg md:text-xl font-bold italic border-l-4 border-[#180228] pl-6 py-2.5 text-left bg-black/10 rounded-r-xl pr-4 shadow-md backdrop-blur-sm">
            "Construimos AstralixNodes con un solo objetivo en mente: brindarte el rendimiento puro y la estabilidad que todo creador merece. Sin compromisos, sin ataduras, solo potencia y un soporte que sí entiende tus problemas."
          </blockquote>
        </div>

      </div>
    </section>
  );
}
