'use client';
import React, { useRef } from 'react';
import { FaDiscord } from 'react-icons/fa6';
import { gsap, useGSAP, MOTION, prefersReducedMotion } from '@/lib/gsap';
import MagneticButton from './animations/MagneticButton';
import Footer from './Footer';

interface ComingSoonBlockProps {
  title?: string;
  description: string;
  note?: string;
  ctaText?: string;
  ctaHref?: string;
  bgImage?: string;
}

export default function ComingSoonBlock({
  title = 'Próximamente',
  description,
  note,
  ctaText = 'Más información en Discord',
  ctaHref = 'https://discord.gg/6UMfyMM5pu',
  bgImage,
}: ComingSoonBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(['.cs-element', '.cs-card'], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo('.cs-card',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: MOTION.ease.out }
    );

    gsap.fromTo('.cs-element',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: MOTION.ease.out, delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020202] flex flex-col pt-24">
      <section className="relative flex-grow flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(144,0,250,0.15),_transparent_40%),linear-gradient(180deg,rgba(2,2,2,0.95),rgba(2,2,2,0.98))]" />
          {bgImage && (
            <div className="absolute inset-0 opacity-20 filter blur-sm scale-105" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-[#020202] z-10" />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-5xl px-6 py-24">
          <div className="cs-card rounded-[2rem] border border-[#9000FA]/20 bg-[#180228]/80 p-8 md:p-12 shadow-[0_0_80px_rgba(144,0,250,0.1)] backdrop-blur-xl opacity-0">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl space-y-6">
                <div className="cs-element inline-flex items-center gap-2 rounded-full border border-[#9000FA]/30 bg-[#9000FA]/10 px-4 py-2 text-sm uppercase tracking-[0.22em] font-bold text-white shadow-[0_0_20px_rgba(144,0,250,0.15)] opacity-0">
                  {title}
                </div>
                <div>
                  <h1 className="cs-element text-4xl md:text-5xl font-black text-white tracking-tight leading-tight opacity-0">
                    {description}
                  </h1>
                  {note && (
                    <p className="cs-element mt-4 text-white/50 text-base md:text-lg leading-relaxed opacity-0">
                      {note}
                    </p>
                  )}
                </div>
              </div>

              <div className="cs-element opacity-0 shrink-0">
                <MagneticButton as="a" href={ctaHref} target="_blank" rel="noopener noreferrer">
                  <div className="inline-flex items-center justify-center rounded-xl bg-[#9000FA] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-[#7000C8] shadow-[0_0_20px_rgba(144,0,250,0.25)] hover:shadow-[0_0_35px_rgba(144,0,250,0.45)] btn-shine cursor-pointer">
                    <FaDiscord className="mr-3 h-5 w-5" />
                    {ctaText}
                  </div>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
