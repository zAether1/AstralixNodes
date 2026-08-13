'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import ScrollReveal from './animations/ScrollReveal';
import GlowCard from './animations/GlowCard';

const competitors = [
  { name: 'AstralixNodes', price: '$0,94/gb', image: '/icons/AstralixNodes.png', fill: 20, color: '#9000FA', isMain: true },
  { name: 'Theminecrafthost', price: '$2,50/gb', image: '/assets/images/theminecrafthost.png', fill: 50, color: '#2a0d4a' },
  { name: 'Sparkedhost', price: '$2,59/gb', image: '/assets/images/sparkedhost.png', fill: 52, color: '#2a0d4a' },
  { name: 'Bisecthosting', price: '$3,00/gb', image: '/assets/images/bisecthosting.png', fill: 60, color: '#2a0d4a' },
  { name: 'ApexHosting', price: '$3,75/gb', image: '/assets/images/apexhosting.png', fill: 75, color: '#2a0d4a' },
  { name: 'Shockbyte', price: '$3,99/gb', image: '/assets/images/shockbyte.png', fill: 80, color: '#2a0d4a' },
  { name: 'Scalacube', price: '$4,99/gb', image: '/assets/images/scalacube.png', fill: 100, color: '#2a0d4a' }
];

export default function PriceComparison() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set('.comp-bar', { width: (i, el: any) => `${el.getAttribute('data-width')}%` });
      return;
    }

    // Title reveal
    gsap.fromTo('.comp-reveal', 
      { opacity: 0, y: 30, filter: 'blur(4px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.15,
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%'
        }
      }
    );

    // Bars reveal with scrub or smooth entry
    const bars = gsap.utils.toArray('.comp-bar');
    bars.forEach((bar: any, index: number) => {
      const width = bar.getAttribute('data-width');
      gsap.fromTo(bar, 
        { width: '0%' },
        { 
          width: `${width}%`,
          duration: 1.4,
          ease: 'power4.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: '.comp-bars-container',
            start: 'top 80%',
          }
        }
      );
    });

    // Pulse animation for AstralixNodes glow
    gsap.to('.astralix-pulse-glow', {
      boxShadow: '0 0 25px rgba(144, 0, 250, 0.6), inset 0 0 10px rgba(144, 0, 250, 0.3)',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-[#0e0320] py-24 px-6 relative overflow-hidden section-glow-top">
      {/* Background ambient light */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#9000FA]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <h2 className="comp-reveal text-4xl md:text-5xl font-black text-white text-center uppercase mb-4 tracking-[0.05em] glow-text">
          COMPARACIÓN DE PRECIOS
        </h2>
        <p className="comp-reveal text-white/50 text-sm text-center mb-16 max-w-3xl mx-auto">
          El siguiente cuadro se calculó utilizando specs de hardware similares a las ofrecidas por AstralixNodes
        </p>

        <div className="comp-bars-container max-w-4xl mx-auto space-y-4">
          {competitors.map((comp, idx) => (
            <div key={idx} className={`comp-reveal flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 ${idx === 0 ? 'pb-3' : ''}`}>
              
              {/* Brand & Price Label */}
              <div className="flex items-center gap-3 sm:min-w-[16.25rem]">
                <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ${comp.isMain ? 'bg-[#9000FA]/10 border border-[#9000FA]/30' : 'grayscale brightness-90 contrast-110 border border-white/5 bg-white/5'}`}>
                  <Image 
                    alt={comp.name} 
                    width={32} 
                    height={32} 
                    className={comp.isMain ? "object-contain p-1" : "object-cover w-full h-full"} 
                    src={comp.image} 
                  />
                </div>
                
                <span className={`${comp.isMain ? 'text-[#9000FA] font-black' : 'text-[#E8E6E6] font-light'} text-sm sm:text-base ${comp.isMain ? 'animate-pulse' : ''}`}>
                  {comp.name}
                </span>

                {comp.isMain && (
                  <svg className="w-4 h-4 flex-shrink-0 text-[#9000FA]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                )}

                <span className={`${comp.isMain ? 'text-[#9000FA]' : 'text-[#E8E6E6]'} text-xs ${comp.isMain ? 'font-black' : 'font-light'} sm:hidden ml-auto`}>
                  {comp.price}
                </span>
              </div>
              
              {/* Bar & Price Display */}
              <div className="flex-1 flex items-center gap-4">
                <div className="flex-1 h-8 sm:h-10 bg-black/30 rounded-lg overflow-hidden border border-white/5 relative">
                  <div 
                    className={`comp-bar h-full rounded-r-md ${comp.isMain ? 'astralix-pulse-glow bg-gradient-to-r from-[#9000FA] to-[#c084fc] shadow-[0_0_15px_rgba(144,0,250,0.4)]' : ''}`}
                    style={{ backgroundColor: comp.isMain ? undefined : comp.color, width: '0%' }}
                    data-width={comp.fill}
                  ></div>
                </div>
                <span className={`hidden sm:inline ${comp.isMain ? 'text-white font-black' : 'text-[#E8E6E6] font-light'} min-w-[7.5rem] text-right text-sm tracking-wider`}>
                  {comp.price}/ram
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="comp-reveal text-white/40 text-center mt-14 text-sm font-medium">
          Esta información fue revisada y actualizada por última vez en Abril de 2026
        </p>
      </div>
    </section>
  );
}
