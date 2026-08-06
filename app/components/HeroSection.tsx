'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background fade
    tl.fromTo('.hero-bg', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 }
    )
    // Subtitle fade down
    .fromTo('.hero-subtitle',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=1.0'
    )
    // Title scale/fade in
    .fromTo('.hero-title',
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1 },
      '-=0.6'
    )
    // Feature items stagger
    .fromTo('.hero-feature',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
      '-=0.5'
    )
    // Buttons fade up
    .fromTo('.hero-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-black overflow-hidden min-h-[31.25rem] md:min-h-[37.5rem] lg:min-h-[43.75rem]">
      {/* Background */}
      <div className="absolute inset-0 hero-bg opacity-0 z-0">
        <Image 
          alt="Minecraft servers - AstralixNodes" 
          fill 
          className="object-cover object-[65%_center] md:object-[60%_center] w-full h-full" 
          src="/assets/images/Minecraft-Principio-pagina.jpg" 
          priority
        />
        {/* Overlays para legibilidad y mezcla */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="max-w-[43.75rem]">
          <div className="space-y-10">
            
            <div className="space-y-4">
              <p className="hero-subtitle opacity-0 text-[#64189D] text-sm font-medium uppercase tracking-[0.15em]">ADQUIERE AHORA</p>
              <h1 className="hero-title opacity-0 text-white font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.05em] leading-[1.1] lg:whitespace-nowrap">
                MINECRAFT HOSTING
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div className="hero-feature opacity-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 576 512" fill="black"><path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80z" opacity=".4"></path><path d="M0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Soporte para <strong className="font-bold text-white">Java &amp; Bedrock</strong>.</span>
              </div>
              
              <div className="hero-feature opacity-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="black"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" opacity=".4"></path><path d="M256 0L256 503.2c-8.4 4-17.6 6-26.4 2c-172.3-82.5-213.1-264-213.6-363.2c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Protección <strong className="font-bold text-white">Anti-DDoS</strong> avanzada.</span>
              </div>
              
              <div className="hero-feature opacity-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 640 512" fill="black"><path d="M0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96l-214.1 0C9.6 320 0 310.4 0 298.7zM405.3 320l-214.1 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C378.2 192 432 239.8 432 298.7c0 11.8-9.6 21.3-26.7 21.3zM608 224a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zM160 224A112 112 0 1 0 -64 224a112 112 0 1 0 224 0z" opacity=".4"></path><path d="M320 368c-26.5 0-51.4-6.8-73.2-18.7C229.5 368.6 216 393.5 216 422.3c0 41.2 33.4 74.5 74.7 74.5l58.6 0c41.2 0 74.7-33.4 74.7-74.5c0-28.8-13.5-53.7-30.8-73C371.4 361.2 346.5 368 320 368zM416 224a96 96 0 1 0 -192 0 96 96 0 1 0 192 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Slots ilimitados.</span>
              </div>

              <div className="hero-feature opacity-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 576 512" fill="black"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2z" opacity=".4"></path><path d="M17 201.8L45.9 215l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 215l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 245.2l-60.9-28.2C8.5 213.1 0 204.6 0 195.2c0-8.4 6.8-14.4 17-16.5v23.1zM17 329.8L45.9 343l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 343l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 373.2l-60.9-28.2C8.5 341.1 0 332.6 0 323.2c0-8.4 6.8-14.4 17-16.5v23.1z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Todas las versiones y modpacks.</span>
              </div>


            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              <Link href="/minecraft" className="hero-btn opacity-0 group flex items-center bg-[#64189D] hover:bg-[#3A0E5C] transition-all duration-300 rounded-md overflow-hidden">
                <span className="flex items-center justify-center bg-black/10 px-4 self-stretch">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 20h20v-4H2m2-2h16V6H4m4-4h8v2H8z"></path></svg>
                </span>
                <span className="px-5 py-3 text-center sm:text-left">
                  <span className="block text-white/80 text-xs font-medium">Adquirir un</span>
                  <span className="block text-white font-black text-sm uppercase tracking-wide">SERVIDOR DE MINECRAFT</span>
                </span>
                <span className="flex items-center justify-center px-4 self-stretch">
                  <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </Link>
              
              <Link href="/nosotros" className="hero-btn opacity-0 group flex items-center gap-2 text-white/70 hover:text-[#64189D] transition-all text-sm font-medium border-b border-white/20 hover:border-[#64189D]/50 pb-0.5">
                Acerca de AstralixNodes
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
