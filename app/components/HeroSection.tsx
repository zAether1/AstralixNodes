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
    // Parallax del fondo con ScrollTrigger
    gsap.to('.hero-bg-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // HUD y elementos técnicos de fondo
    tl.fromTo('.hero-hud-element',
      { opacity: 0, scale: 0.8, rotation: -15 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, stagger: 0.1 }
    )
    .fromTo('.hero-bg', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 },
      '<0.5'
    )
    .fromTo('.hero-subtitle',
      { y: -20, opacity: 0, letterSpacing: '0em' },
      { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 0.8 },
      '-=1.0'
    )
    .fromTo('.hero-title',
      { scale: 0.9, opacity: 0, y: 30, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
      '-=0.6'
    )
    .fromTo('.hero-feature',
      { opacity: 0, x: -30, filter: 'blur(5px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' },
      '-=0.5'
    )
    .fromTo('.hero-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    );

    gsap.fromTo('.hero-image-zoom', 
      { scale: 1 }, 
      { scale: 1.05, duration: 25, ease: 'sine.inOut', repeat: -1, yoyo: true }
    );

    gsap.to('.hero-particles', { opacity: 1, duration: 3, delay: 1 });
    
    for(let i = 0; i < 20; i++) {
      gsap.to(`.particle-${i}`, {
        y: `-=${Math.random() * 150 + 50}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        opacity: Math.random() * 0.6 + 0.2,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 8 + 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * -10
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if(!container.current) return;
      const rect = container.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to('.mouse-spotlight', {
        x: x - 300,
        y: y - 300,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    // Botones Magnéticos
    const magnets = document.querySelectorAll('.hero-btn');
    magnets.forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: any) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          scale: 1.05,
          rotation: x * 0.05,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, { scope: container });

  return (
    <section ref={container} className="relative bg-[#020202] overflow-hidden min-h-[31.25rem] md:min-h-[40rem] lg:min-h-[45rem] flex flex-col justify-center">
      {/* Spotlight effect */}
      <div className="mouse-spotlight pointer-events-none absolute w-[600px] h-[600px] bg-[#9000FA]/5 rounded-full blur-[80px] z-0 hidden md:block"></div>
      
      <div className="absolute inset-0 hero-bg-parallax z-0">

      {/* 1. Imagen de Minecraft (fondo) */}
      <div className="absolute inset-0 hero-bg opacity-0 z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full hero-image-zoom origin-center">
          <Image 
            alt="Minecraft servers - AstralixNodes" 
            fill 
            className="object-cover object-[65%_center] md:object-[70%_center] w-full h-full" 
            src="/assets/images/Minecraft-Principio-pagina.jpg" 
            priority
          />
        </div>

        {/* 2. Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
        
        {/* 3. Glow púrpura */}
        <div className="absolute top-1/2 left-[15%] md:left-[25%] -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#64189D]/30 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-1/2 right-[10%] md:right-[15%] -translate-y-1/2 w-[300px] md:w-[500px] h-[400px] md:h-[600px] bg-[#64189D]/15 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>

        {/* 4. Partículas / Luciérnagas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hero-particles opacity-0">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i}
              className={`absolute w-1 h-1 bg-[#d4a5ff] rounded-full particle-${i}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
                boxShadow: '0 0 8px 2px rgba(100,24,157,0.6)'
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* HUD Elements & Grid CSS Objects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] rounded-full border border-white/5 border-dashed opacity-20 animate-spin-slow"></div>
        <div className="absolute top-[20%] left-[10%] w-[100px] h-[100px] translate-x-[50px] translate-y-[50px] rounded-full border border-[#9000FA]/20 border-dotted opacity-30 animate-[spin_10s_linear_infinite_reverse]"></div>
        
        {/* Tecnical Reticle */}
        <div className="hero-hud-element absolute top-[50%] right-[15%] w-[300px] h-[300px] opacity-0 flex items-center justify-center">
           <div className="absolute w-[2px] h-[20px] bg-white/20 top-0"></div>
           <div className="absolute w-[2px] h-[20px] bg-white/20 bottom-0"></div>
           <div className="absolute w-[20px] h-[2px] bg-white/20 left-0"></div>
           <div className="absolute w-[20px] h-[2px] bg-white/20 right-0"></div>
           <div className="absolute w-[60%] h-[60%] rounded-full border-[1px] border-white/10 border-t-[#9000FA]/50 animate-[spin_8s_linear_infinite]"></div>
           <div className="absolute text-[10px] font-mono text-white/30 bottom-[-20px]">SYS.INFRA.READY</div>
        </div>
      </div>

      </div>

      {/* 5. Contenido del Hero (texto, tarjetas y botones) */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-6 w-full py-16 md:py-0">
        <div className="max-w-[43.75rem]">
          <div className="space-y-10">
            
            <div className="space-y-4">
              <p className="hero-subtitle opacity-0 text-[#64189D] text-sm md:text-base font-bold uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(100,24,157,0.5)]">
                Infraestructura Premium
              </p>
              <h1 className="hero-title opacity-0 text-white font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.05em] leading-[1.1] lg:whitespace-nowrap drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                MINECRAFT HOSTING
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="hero-feature opacity-0 flex items-center gap-3 bg-black/20 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#64189D]/20 border border-[#64189D]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64189D]" viewBox="0 0 576 512" fill="currentColor"><path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80z" opacity=".4"></path><path d="M0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Soporte para <strong className="font-bold text-white">Java & Bedrock</strong>.</span>
              </div>
              
              <div className="hero-feature opacity-0 flex items-center gap-3 bg-black/20 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#64189D]/20 border border-[#64189D]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64189D]" viewBox="0 0 512 512" fill="currentColor"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" opacity=".4"></path><path d="M256 0L256 503.2c-8.4 4-17.6 6-26.4 2c-172.3-82.5-213.1-264-213.6-363.2c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Protección <strong className="font-bold text-white">Anti-DDoS</strong> avanzada.</span>
              </div>
              
              <div className="hero-feature opacity-0 flex items-center gap-3 bg-black/20 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#64189D]/20 border border-[#64189D]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64189D]" viewBox="0 0 640 512" fill="currentColor"><path d="M0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96l-214.1 0C9.6 320 0 310.4 0 298.7zM405.3 320l-214.1 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C378.2 192 432 239.8 432 298.7c0 11.8-9.6 21.3-26.7 21.3zM608 224a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zM160 224A112 112 0 1 0 -64 224a112 112 0 1 0 224 0z" opacity=".4"></path><path d="M320 368c-26.5 0-51.4-6.8-73.2-18.7C229.5 368.6 216 393.5 216 422.3c0 41.2 33.4 74.5 74.7 74.5l58.6 0c41.2 0 74.7-33.4 74.7-74.5c0-28.8-13.5-53.7-30.8-73C371.4 361.2 346.5 368 320 368zM416 224a96 96 0 1 0 -192 0 96 96 0 1 0 192 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Slots ilimitados.</span>
              </div>

              <div className="hero-feature opacity-0 flex items-center gap-3 bg-black/20 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-black/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#64189D]/20 border border-[#64189D]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#64189D]" viewBox="0 0 576 512" fill="currentColor"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2z" opacity=".4"></path><path d="M17 201.8L45.9 215l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 215l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 245.2l-60.9-28.2C8.5 213.1 0 204.6 0 195.2c0-8.4 6.8-14.4 17-16.5v23.1zM17 329.8L45.9 343l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 343l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 373.2l-60.9-28.2C8.5 341.1 0 332.6 0 323.2c0-8.4 6.8-14.4 17-16.5v23.1z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Todas las versiones y modpacks.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link href="/minecraft" className="hero-btn opacity-0 group flex items-center bg-[#64189D] hover:bg-[#3A0E5C] transition-all duration-300 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(100,24,157,0.3)] hover:shadow-[0_0_40px_rgba(100,24,157,0.5)] border border-[#64189D]/50 hover:border-[#64189D]">
                <span className="flex items-center justify-center bg-black/20 px-5 self-stretch">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 20h20v-4H2m2-2h16V6H4m4-4h8v2H8z"></path></svg>
                </span>
                <span className="px-6 py-3.5 text-center sm:text-left">
                  <span className="block text-white/80 text-xs font-bold tracking-wider">Adquirir un</span>
                  <span className="block text-white font-black text-sm uppercase tracking-wider">SERVIDOR DE MINECRAFT</span>
                </span>
                <span className="flex items-center justify-center px-5 self-stretch bg-white/5 group-hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </Link>
              
              <Link href="/nosotros" className="hero-btn opacity-0 group flex items-center gap-2 text-white/70 hover:text-white transition-all text-sm font-medium border-b border-transparent hover:border-white/50 pb-0.5">
                Acerca de AstralixNodes
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
