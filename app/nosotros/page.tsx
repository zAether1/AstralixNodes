'use client';
import React, { useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CEOSection from "../components/CEOSection";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NosotrosPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo('.hero-anim', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
    
    // Reveal up animations for sections
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]" ref={containerRef}>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#180228] min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-[#180228]/80 via-[#020202]/90 to-[#020202] z-10 mix-blend-multiply"></div>
             <Image 
                src="/assets/images/nosotros-hero-bg.avif" 
                alt="Nosotros Fondo" 
                fill 
                className="object-cover object-center opacity-30"
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#64189D]/20 rounded-full blur-[120px] pointer-events-none"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="hero-anim inline-block py-1.5 px-4 rounded-full bg-[#64189D]/20 text-[#64189D] border border-[#64189D]/30 font-bold text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(100,24,157,0.3)]">¿Quiénes Somos?</span>
            <h1 className="hero-anim text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight">
              ASTRALIX<span className="text-[#64189D]">NODES</span>
            </h1>
            <p className="hero-anim text-[#999] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Nuestra misión es ofrecer la infraestructura más avanzada y estable para tus proyectos digitales. Más que un hosting, somos el motor de tu comunidad.
            </p>
          </div>
        </section>

        {/* Historia Section */}
        <section className="bg-[#020202] py-24 px-6 relative border-t border-white/5">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="reveal-up text-center mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Nuestra Historia</h2>
              <div className="w-24 h-1.5 bg-[#64189D] mx-auto rounded-full shadow-[0_0_10px_rgba(100,24,157,0.5)]"></div>
            </div>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#64189D]/30 before:to-transparent">
              
              {/* Timeline Item 1 */}
              <div className="reveal-up relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020202] bg-[#64189D] shadow-[0_0_15px_rgba(100,24,157,0.8)] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-[#10011c] border border-white/5 rounded-2xl p-8 hover:border-[#64189D]/50 transition-colors shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                     <span className="text-4xl font-black text-[#64189D] leading-none">2023</span>
                     <h3 className="text-lg font-bold text-white uppercase tracking-wide">El Comienzo</h3>
                  </div>
                  <p className="text-[#888] leading-relaxed text-sm md:text-base">
                    Todo comenzó bajo el nombre de <strong>ZerithNodes</strong>. Nuestra visión inicial era proporcionar servidores de calidad para comunidades pequeñas. Sin embargo, debido a desafíos logísticos y estructurales, tomamos la difícil decisión de pausar para replantear objetivos.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="reveal-up relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020202] bg-[#64189D] shadow-[0_0_15px_rgba(100,24,157,0.8)] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-[#10011c] border border-white/5 rounded-2xl p-8 hover:border-[#64189D]/50 transition-colors shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                     <span className="text-4xl font-black text-[#64189D] leading-none">2026</span>
                     <h3 className="text-lg font-bold text-white uppercase tracking-wide">El Renacer</h3>
                  </div>
                  <p className="text-[#888] leading-relaxed text-sm md:text-base">
                    Regresamos con una visión renovada y una infraestructura de clase mundial. Cambiamos nuestra identidad, mejoramos la tecnología y renacimos como <strong>AstralixNodes</strong>. Hoy ofrecemos hosting premium con el máximo rendimiento garantizado.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CEO Section */}
        <div className="border-t border-white/5 bg-[#020202]">
           <CEOSection />
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-b from-[#020202] to-[#180228] py-24 text-center border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#64189D]/10 blur-[100px] rounded-t-[100%] pointer-events-none"></div>
          </div>
          <div className="reveal-up relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">¿Listo para evolucionar?</h2>
            <p className="text-[#999] text-lg mb-10">Experimenta la verdadera potencia de una red diseñada para ganar.</p>
            <a href="/minecraft" className="inline-block bg-[#64189D] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#7b1dc2] transition-colors shadow-[0_0_30px_rgba(100,24,157,0.3)]">
              Explorar Servicios Premium
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
