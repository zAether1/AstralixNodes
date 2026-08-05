'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const competitors = [
  { name: 'AstralixNodes', price: '$0,94/gb', image: '/icons/AstralixNodes.png', fill: 20, color: '#64189D', isMain: true },
  { name: 'Theminecrafthost', price: '$2,50/gb', image: '/holy_assets/assets/images/theminecrafthost.png', fill: 50, color: '#2d2e2e' },
  { name: 'Sparkedhost', price: '$2,59/gb', image: '/holy_assets/assets/images/sparkedhost.png', fill: 52, color: '#2d2e2e' },
  { name: 'Bisecthosting', price: '$3,00/gb', image: '/holy_assets/assets/images/bisecthosting.png', fill: 60, color: '#2d2e2e' },
  { name: 'ApexHosting', price: '$3,75/gb', image: '/holy_assets/assets/images/apexhosting.png', fill: 75, color: '#2d2e2e' },
  { name: 'Shockbyte', price: '$3,99/gb', image: '/holy_assets/assets/images/shockbyte.png', fill: 80, color: '#2d2e2e' },
  { name: 'Scalacube', price: '$4,99/gb', image: '/holy_assets/assets/images/scalacube.png', fill: 100, color: '#2d2e2e' }
];

export default function PriceComparison() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title and text reveal
    gsap.fromTo('.comp-reveal', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        }
      }
    );

    // Bars animation
    const bars = gsap.utils.toArray('.comp-bar');
    bars.forEach((bar: any, index: number) => {
      const width = bar.getAttribute('data-width');
      gsap.fromTo(bar, 
        { width: '0%' },
        { 
          width: `${width}%`,
          duration: 1.2,
          ease: 'power3.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: '.comp-bars-container',
            start: 'top 80%'
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-[#191919] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="comp-reveal text-4xl md:text-5xl font-black text-white text-center uppercase mb-4 tracking-[0.05em]">
          COMPARACIÓN DE PRECIOS
        </h2>
        <p className="comp-reveal text-[#888] text-sm text-center mb-16 max-w-3xl mx-auto">
          El siguiente cuadro se calculó utilizando specs de hardware similares a las ofrecidas por AstralixNodes
        </p>

        <div className="comp-bars-container max-w-4xl mx-auto space-y-3">
          {competitors.map((comp, idx) => (
            <div key={idx} className={`comp-reveal flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 ${idx === 0 ? 'pb-2' : ''}`}>
              
              <div className="flex items-center gap-3 sm:min-w-[16.25rem]">
                <div className={`w-6 h-6 sm:w-[30px] sm:h-[30px] rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ${comp.isMain ? '' : 'grayscale brightness-90 contrast-110'}`}>
                  <Image 
                    alt={comp.name} 
                    width={30} 
                    height={30} 
                    className={comp.isMain ? "object-contain" : "object-cover w-full h-full"} 
                    src={comp.image} 
                  />
                </div>
                
                <span className={`${comp.isMain ? 'text-[#64189D] font-black' : 'text-[#E8E6E6] font-light'} text-sm sm:text-base ${comp.isMain ? 'animate-pulse' : ''}`}>
                  {comp.name}
                </span>

                {comp.isMain && (
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#64189D"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                )}

                <span className={`${comp.isMain ? 'text-[#64189D]' : 'text-[#E8E6E6]'} text-xs ${comp.isMain ? 'font-black' : 'font-light'} sm:hidden ml-auto`}>
                  {comp.price}
                </span>
              </div>
              
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-8 sm:h-10 bg-transparent rounded-sm overflow-hidden">
                  <div 
                    className="comp-bar h-full" 
                    style={{ backgroundColor: comp.color, width: '0%' }}
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
        
        <p className="comp-reveal text-[#E8E6E6] text-center mt-12 text-base">
          Esta información fue revisada y actualizada por última vez en Abril de 2026
        </p>
      </div>
    </section>
  );
}
