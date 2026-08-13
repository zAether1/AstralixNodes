'use client';
import React, { useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  // Generate stable particle positions with useMemo to avoid SSR/hydration mismatch
  const particles = useMemo(() => {
    const seed = [0.12, 0.87, 0.34, 0.56, 0.78, 0.23, 0.45, 0.91, 0.67, 0.38,
                  0.15, 0.82, 0.49, 0.71, 0.28, 0.63, 0.94, 0.17, 0.52, 0.89,
                  0.31, 0.76, 0.43, 0.58, 0.85];
    return seed.map((s, i) => ({
      left: `${(s * 100).toFixed(1)}%`,
      top: `${(seed[(i + 7) % seed.length] * 100).toFixed(1)}%`,
      size: 1 + (s > 0.5 ? 1 : 0),
    }));
  }, []);

  useGSAP(() => {
    const reduced = prefersReducedMotion();
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
    }, (context) => {
      const { isDesktop } = context.conditions!;

      if (reduced) {
        // If reduced motion, just show everything immediately
        gsap.set(['.hero-bg', '.hero-badge', '.hero-title-word', '.hero-feature', '.hero-btn', '.hero-particles', '.hero-glow-orb'], {
          opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)', clearProps: 'clipPath',
        });
        return;
      }

      // ==========================================
      // CINEMATIC HERO TIMELINE
      // ==========================================
      const tl = gsap.timeline({
        defaults: { ease: MOTION.ease.out },
      });

      // 1. Background reveals with blur-to-sharp
      tl.fromTo('.hero-bg',
        { opacity: 0, scale: 1.08, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' }
      )

      // 2. Glow orbs breathe in
      .fromTo('.hero-glow-orb',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power2.out' },
        '-=1.5'
      )

      // 3. Badge with clip-path reveal
      .fromTo('.hero-badge',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8 },
        '-=1.0'
      )

      // 4. Title words — staggered with blur + vertical displacement
      .fromTo('.hero-title-word',
        { opacity: 0, y: 60, filter: 'blur(10px)', rotateX: 30 },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0,
          duration: 0.8, stagger: 0.08, ease: MOTION.ease.out,
        },
        '-=0.5'
      )

      // 5. Feature cards — stagger with slide + blur
      .fromTo('.hero-feature',
        { opacity: 0, x: -30, filter: 'blur(6px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.1 },
        '-=0.4'
      )

      // 6. Buttons — fade up with spring
      .fromTo('.hero-btn',
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: MOTION.ease.snap },
        '-=0.3'
      )

      // 7. Particles fade in
      .to('.hero-particles', { opacity: 1, duration: 2, ease: 'power1.in' }, '-=0.5');

      // ==========================================
      // AMBIENT ANIMATIONS (loop)
      // ==========================================

      // Slow cinematic zoom on hero image
      gsap.fromTo('.hero-image-zoom',
        { scale: 1 },
        { scale: 1.04, duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true }
      );

      // Glow orb breathing
      gsap.to('.hero-glow-orb', {
        scale: 1.15,
        opacity: 0.6,
        duration: 4,
        stagger: { each: 1.5, from: 'random' },
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Particle ambient movement
      gsap.utils.toArray('.hero-particle').forEach((particle: any, i: number) => {
        gsap.to(particle, {
          y: `-=${30 + (i % 5) * 20}`,
          x: `+=${((i % 3) - 1) * 30}`,
          opacity: 0.2 + (i % 4) * 0.15,
          duration: 6 + (i % 4) * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: -(i * 0.8),
        });
      });

      // ==========================================
      // SCROLL-DRIVEN PARALLAX (Desktop only)
      // ==========================================
      if (isDesktop) {
        gsap.to('.hero-image-zoom', {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.hero-content', {
          y: -40,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: '60% top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    });
  }, { scope: container });

  // Split title into words for animation
  const titleWords = 'MINECRAFT HOSTING'.split(' ');

  return (
    <section ref={container} className="relative bg-[#020202] overflow-hidden min-h-[31.25rem] md:min-h-[40rem] lg:min-h-[45rem] flex flex-col justify-center">
      {/* 1. Background image */}
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

        {/* 2. Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0118]/95 via-[#0a0118]/70 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#0a0118]/20 pointer-events-none"></div>

        {/* 3. Glow orbs */}
        <div className="hero-glow-orb absolute top-1/2 left-[15%] md:left-[25%] -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#9000FA]/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-0"></div>
        <div className="hero-glow-orb absolute top-1/2 right-[10%] md:right-[15%] -translate-y-1/2 w-[300px] md:w-[500px] h-[400px] md:h-[600px] bg-[#9000FA]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-0"></div>
        <div className="hero-glow-orb absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#9000FA]/15 blur-[80px] rounded-full pointer-events-none mix-blend-screen opacity-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0a0118] via-[#0a0118]/50 to-transparent pointer-events-none"></div>

        {/* 4. Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hero-particles opacity-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full hero-particle`}
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: '#d4a5ff',
                filter: 'blur(0.5px)',
                boxShadow: '0 0 8px 2px rgba(144,0,250,0.5)',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 5. Content */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-6 w-full py-16 md:py-0 hero-content">
        <div className="max-w-[43.75rem]">
          <div className="space-y-10">

            <div className="space-y-4">
              {/* Badge */}
              <p className="hero-badge opacity-0 text-[#9000FA] text-sm md:text-base font-bold uppercase tracking-[0.2em] glow-text">
                Infraestructura Premium
              </p>

              {/* Title — split into words */}
              <h1 className="text-white font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.05em] leading-[1.1] lg:whitespace-nowrap drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" style={{ perspective: '600px' }}>
                {titleWords.map((word, i) => (
                  <span key={i} className="hero-title-word inline-block opacity-0" style={{ willChange: 'transform, opacity, filter' }}>
                    {word}{i < titleWords.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </h1>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="hero-feature opacity-0 flex items-center gap-3 glass-subtle p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#9000FA]/20 border border-[#9000FA]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#9000FA]" viewBox="0 0 576 512" fill="currentColor"><path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80z" opacity=".4"></path><path d="M0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Soporte para <strong className="font-bold text-white">Java & Bedrock</strong>.</span>
              </div>

              <div className="hero-feature opacity-0 flex items-center gap-3 glass-subtle p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#9000FA]/20 border border-[#9000FA]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#9000FA]" viewBox="0 0 512 512" fill="currentColor"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" opacity=".4"></path><path d="M256 0L256 503.2c-8.4 4-17.6 6-26.4 2c-172.3-82.5-213.1-264-213.6-363.2c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Protección <strong className="font-bold text-white">Anti-DDoS</strong> avanzada.</span>
              </div>

              <div className="hero-feature opacity-0 flex items-center gap-3 glass-subtle p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#9000FA]/20 border border-[#9000FA]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#9000FA]" viewBox="0 0 640 512" fill="currentColor"><path d="M0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96l-214.1 0C9.6 320 0 310.4 0 298.7zM405.3 320l-214.1 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C378.2 192 432 239.8 432 298.7c0 11.8-9.6 21.3-26.7 21.3zM608 224a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zM160 224A112 112 0 1 0 -64 224a112 112 0 1 0 224 0z" opacity=".4"></path><path d="M320 368c-26.5 0-51.4-6.8-73.2-18.7C229.5 368.6 216 393.5 216 422.3c0 41.2 33.4 74.5 74.7 74.5l58.6 0c41.2 0 74.7-33.4 74.7-74.5c0-28.8-13.5-53.7-30.8-73C371.4 361.2 346.5 368 320 368zM416 224a96 96 0 1 0 -192 0 96 96 0 1 0 192 0z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Slots ilimitados.</span>
              </div>

              <div className="hero-feature opacity-0 flex items-center gap-3 glass-subtle p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#9000FA]/20 border border-[#9000FA]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#9000FA]" viewBox="0 0 576 512" fill="currentColor"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2z" opacity=".4"></path><path d="M17 201.8L45.9 215l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 215l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 245.2l-60.9-28.2C8.5 213.1 0 204.6 0 195.2c0-8.4 6.8-14.4 17-16.5v23.1zM17 329.8L45.9 343l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 343l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 373.2l-60.9-28.2C8.5 341.1 0 332.6 0 323.2c0-8.4 6.8-14.4 17-16.5v23.1z"></path></svg>
                </div>
                <span className="text-white/90 text-sm whitespace-nowrap">Todas las versiones y modpacks.</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link href="/minecraft" className="hero-btn opacity-0 group flex items-center bg-[#9000FA] hover:bg-[#7000C8] transition-all duration-300 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(144,0,250,0.3)] hover:shadow-[0_0_50px_rgba(144,0,250,0.5)] border border-[#9000FA]/50 hover:border-[#9000FA] btn-shine">
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
