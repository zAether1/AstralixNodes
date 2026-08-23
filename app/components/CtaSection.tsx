'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CtaSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.cta-reveal',
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%'
        }
      }
    );

    gsap.fromTo('.cta-feature',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 90%'
        }
      }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full py-16 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-90" style={{
        background: `radial-gradient(circle at 88% 78%, rgba(100,24,157,0.35) 0%, rgba(100,24,157,0) 35%),
                     radial-gradient(circle at 14% 18%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%),
                     linear-gradient(180deg, rgba(10,6,24,0.95) 0%, rgba(5,1,10,0.98) 100%)`
      }} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#8b5cf6]/20 blur-2xl" />
        <div className="absolute bottom-16 right-10 w-32 h-32 rounded-full bg-[#a855f7]/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="cta-reveal relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 md:p-12 shadow-[0_0_70px_rgba(100,24,157,0.18)] backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#ec4899] opacity-90" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#9d4edd]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#e9d5ff] cta-feature">
                <span className="w-2 h-2 rounded-full bg-[#d8b4fe] animate-pulse" />
                Minecraft listo en minutos
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-[#c4b5fd] font-bold">Servidor + Panel + Soporte</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight tracking-[-0.03em]">
                  ¡Quiero crear mi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#f472b6]">servidor de Minecraft!</span>
                </h2>
                <p className="max-w-2xl text-white/70 text-base leading-relaxed md:text-lg">
                  Empieza hoy con recursos dedicados, panel instantáneo y soporte 24/7. Tu mundo, tus reglas, sin esperas y sin complicaciones.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="cta-feature rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#c4b5fd] font-semibold">Panel Fácil</p>
                  <p className="mt-2 text-sm text-white/80">Gestiona tu servidor con un clic.</p>
                </div>
                <div className="cta-feature rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#c4b5fd] font-semibold">Anticheat + DDoS</p>
                  <p className="mt-2 text-sm text-white/80">Seguridad que protege tu mundo.</p>
                </div>
                <div className="cta-feature rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#c4b5fd] font-semibold">Mods & Versión</p>
                  <p className="mt-2 text-sm text-white/80">Java, Bedrock y cualquier modpack.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-[2rem] border border-white/10 bg-black/30 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-[#c4b5fd] font-bold">Oferta exclusiva</p>
                <h3 className="text-3xl font-black text-white">Servidor Minecraft desde <span className="text-[#c084fc]">$19.99</span></h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-[#7c3aed]/10 p-4 text-white/80">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b4fe]">Extra</p>
                  <p className="mt-2 text-sm">Cupón de bienvenida y setup instantáneo al contratar.</p>
                </div>

                <a
                  href="/minecraft"
                  className="group inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-[#9d4edd] via-[#8b5cf6] to-[#ec4899] px-6 py-4 text-center text-base font-black uppercase text-white shadow-[0_14px_40px_rgba(156,39,176,0.35)] transition-transform duration-300 hover:-translate-y-1"
                >
                  QUIERO CREAR MI SERVIDOR
                </a>

                <a
                  href="/discounts"
                  className="block text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#c4b5fd] transition-colors hover:text-[#ffffff]"
                >
                  Ver promociones y cupones
                </a>
              </div>

              <div className="grid gap-3 rounded-3xl bg-white/5 p-4 text-white/75">
                <div className="flex items-center justify-between text-sm">
                  <span>Inicio en minutos</span>
                  <span className="text-[#c4b5fd] font-semibold">Instantáneo</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Soporte 24/7</span>
                  <span className="text-[#c4b5fd] font-semibold">Siempre activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
