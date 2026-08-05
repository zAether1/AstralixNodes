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
      className="w-full py-16 px-6 relative overflow-hidden"
    >
      {/* Dynamic Astralix Background */}
      <div className="absolute inset-0 opacity-80" style={{
        background: `radial-gradient(circle at 90.4% 76.7%, rgba(100,24,157,0.4) 0%, rgba(100,24,157,0) 40%), 
                     radial-gradient(circle at 20.5% 20.5%, rgba(100,24,157,0.3) 0%, rgba(100,24,157,0) 35%), 
                     radial-gradient(circle at 0% 74.2%, rgba(20,2,40,0.99) 0%, rgba(20,2,40,0) 40%), 
                     radial-gradient(circle at 50% 50%, rgba(100,24,157,0.15) 0%, rgba(2,2,2,0) 60%)`,
        backgroundColor: '#05010a'
      }}></div>
      
      {/* Decorative stars/particles could go here, but a subtle glass border adds the premium feel */}
      <div className="cta-reveal max-w-7xl mx-auto relative z-10 border border-white/5 bg-white/[0.02] rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-[0_0_30px_rgba(100,24,157,0.1)]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wider text-[#9d4edd] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9d4edd] animate-pulse"></span>
              CREA TU SERVIDOR
            </p>
            <h2 className="text-3xl md:text-[40px] font-black uppercase text-white leading-tight">
              ¿LISTO PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9d4edd] to-[#e0aaff]">COMENZAR</span>?
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-2xl">
              ¡Comienza hoy y te ofreceremos un <span className="text-white font-bold">descuento</span> en tu primera factura con nuestra promoción de nuevos clientes! Disponible por tiempo limitado.
            </p>
          </div>
          <a className="group flex items-center bg-gradient-to-r from-[#64189D] to-[#3A0E5C] border border-[#9d4edd]/30 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(100,24,157,0.4)] transition-all duration-300 transform hover:-translate-y-1" href="/discounts">
            <div className="flex items-center gap-3 px-6 py-5">
              <div className="relative">
                <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium leading-tight mb-1">PROMOCIONES</p>
                <p className="text-lg font-black text-white uppercase leading-tight tracking-wide">CUPONES ACTIVOS</p>
              </div>
            </div>
            <div className="px-5 py-5 text-2xl font-mono text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all bg-white/5 border-l border-white/5 h-full flex items-center">»</div>
          </a>
        </div>
      </div>
    </section>
  );
}
