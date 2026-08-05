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
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%'
        }
      }
    );
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="w-full py-16 px-6"
      style={{
        background: `radial-gradient(circle at 90.4% 76.7%, #FFDA21 0%, rgba(255,218,33,0) 38%), 
                     radial-gradient(circle at 72.5% 47.5%, #FFDA21 0%, rgba(255,218,33,0) 27%), 
                     radial-gradient(circle at 0% 74.2%, rgba(255,218,33,0.99) 0%, rgba(255,218,33,0) 17%), 
                     radial-gradient(circle at 18.3% 37.5%, #7556AB 0%, rgba(117,86,171,0) 100%), 
                     radial-gradient(circle at 88.3% 40%, #8015E8 0%, rgba(128,21,232,0) 70%), 
                     radial-gradient(circle at 48.9% 49.5%, #FFFFFF 0%, rgba(255,255,255,0) 100%)`
      }}
    >
      <div className="cta-reveal max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wider text-[#64189D] font-normal">CREA TU SERVIDOR</p>
            <h2 className="text-3xl md:text-[40px] font-black uppercase text-white leading-tight">
              ¿LISTO PARA <span className="text-[#FFF000]">COMENZAR</span>?
            </h2>
            <p className="text-base text-white/90 leading-relaxed">
              ¡Comienza hoy y te ofreceremos un <span className="text-[#64189D] font-bold">descuento</span> en tu primera factura con nuestra promoción de nuevos clientes! Disponible por tiempo limitado.
            </p>
          </div>
          <a className="group flex items-center bg-[#64189D] rounded-lg overflow-hidden hover:brightness-105 transition-all" href="/discounts">
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="relative">
                <div className="w-10 h-10 bg-black/15 rounded-lg"></div>
                <svg className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-black/60 font-normal leading-tight">PROMOCIONES</p>
                <p className="text-lg font-black text-black uppercase leading-tight">CUPONES ACTIVOS</p>
              </div>
            </div>
            <div className="px-4 py-4 text-3xl font-mono text-black/80 group-hover:translate-x-1 transition-transform">»</div>
          </a>
        </div>
      </div>
    </section>
  );
}
