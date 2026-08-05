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
      <div className="absolute inset-0 hero-bg opacity-0">
        <div className="absolute inset-0 lg:hidden">
          <Image 
            alt="Minecraft characters - AstralixNodes servers" 
            fill 
            className="object-cover object-center" 
            src="/holy_assets/assets/images/hero-minecraft.avif" 
            priority
          />
        </div>
        <video 
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-[70%_center]" 
          muted 
          loop 
          playsInline 
          autoPlay 
          poster="/holy_assets/assets/images/hero-minecraft-poster.avif"
        >
          <source src="/holy_assets/assets/videos/hero-minecraft.webm" type="video/webm"/>
          <source src="/holy_assets/assets/videos/hero-minecraft.mp4" type="video/mp4"/>
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black lg:bg-none"></div>
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

              <Link href="/nosotros" className="hero-feature opacity-0 group flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 640 512" fill="black"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l67.4 0C344.2 304 424 383.8 424 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l36.7 0C543.3 320 640 416.7 640 506c0 3.3-2.7 6-6 6l-24.7 0zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" opacity=".4"></path><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Confiado por <strong className="font-bold text-white">+150</strong> creadores.</span>
                <svg className="w-3 h-3 text-[#64189D] flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
              </Link>

              <Link href="/faq" className="hero-feature opacity-0 group flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 448 512" fill="black"><path d="M0 96C0 43 43 0 96 0l96 0 32 0 0 64-32 0L96 64C69.5 64 48 85.5 48 112l0 48 96 0 32 0 0 64-32 0-96 0 0 176c0 26.5 21.5 48 48 48l256 0c26.5 0 48-21.5 48-48l0-48 0-64 0-80 0-64-80 0-32 0 0-64 32 0 80 0c35.3 0 64 28.7 64 64l0 64 0 80 0 64 0 48c0 53-43 96-96 96L96 512c-53 0-96-43-96-96L0 96z" opacity=".4"></path><path d="M176 64L96 64C69.5 64 48 85.5 48 112l0 48 128 0 0-96zm0 160L48 224l0 176c0 26.5 21.5 48 48 48l80 0 0-224z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap"><strong className="font-bold text-white">+500</strong> guías y tutoriales.</span>
                <svg className="w-3 h-3 text-[#64189D] flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
              <Link href="/minecraft" className="hero-btn opacity-0 group flex items-center bg-[#64189D] hover:bg-[#3A0E5C] transition-all duration-300 rounded-md overflow-hidden">
                <span className="flex items-center justify-center bg-black/10 px-4 self-stretch">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M2 20h20v-4H2m2-2h16V6H4m4-4h8v2H8z"></path></svg>
                </span>
                <span className="px-5 py-3 text-center sm:text-left">
                  <span className="block text-black text-xs font-medium">Adquirir un</span>
                  <span className="block text-black font-black text-sm uppercase tracking-wide">SERVIDOR DE MINECRAFT</span>
                </span>
                <span className="flex items-center justify-center px-4 self-stretch">
                  <svg className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
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
