'use client'

import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CEOSection from "../components/CEOSection";
import Image from 'next/image';

export default function NosotrosPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('visible', 'in-view', 'animate-in');
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.8s ease-out';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#191919] overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src="/assets/images/nosotros-hero-bg.avif" 
              alt="Nosotros Fondo" 
              fill 
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#191919]/80 to-[#191919]"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36 text-center">
            <p className="text-[#64189D] text-sm sm:text-base font-semibold tracking-widest uppercase mb-4">¿QUIÉNES SOMOS?</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 sm:mb-10 leading-tight">
              ACERCA DE ASTRALIXNODES
            </h1>
            <div className="max-w-3xl mx-auto space-y-5 text-[#bbb] text-sm sm:text-base leading-relaxed">
              <p>
                En <strong>AstralixNodes</strong>, nuestra misión es ofrecer la infraestructura más avanzada y estable para tus proyectos digitales. 
                Ya sea que necesites un servidor para tu comunidad de Minecraft, un entorno VPS seguro o servidores para juegos de alto rendimiento.
              </p>
            </div>
          </div>
        </section>

        {/* Historia Section */}
        <section className="bg-[#101010] py-20 sm:py-28 px-4 sm:px-6">
          <div className="reveal max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase">Nuestra Historia</h2>
              <div className="w-24 h-1 bg-[#64189D] mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-[#191919] p-8 rounded-2xl border border-white/5 shadow-xl">
                <div className="md:w-1/3 text-center md:text-right">
                  <span className="text-5xl font-black text-[#64189D] block mb-2">2023</span>
                  <h3 className="text-xl font-bold text-white uppercase">El Comienzo</h3>
                </div>
                <div className="md:w-2/3 border-l-2 border-[#64189D]/30 pl-8">
                  <p className="text-[#bbb] leading-relaxed">
                    Todo comenzó bajo el nombre de <strong>ZerithNodes</strong>. Nuestra visión inicial era proporcionar servidores de calidad para comunidades pequeñas. Sin embargo, debido a desafíos logísticos y estructurales, tomamos la difícil decisión de abandonar el proyecto temporalmente para replantear nuestros objetivos.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center bg-[#191919] p-8 rounded-2xl border border-white/5 shadow-xl">
                <div className="md:w-1/3 text-center md:text-right">
                  <span className="text-5xl font-black text-[#64189D] block mb-2">2026</span>
                  <h3 className="text-xl font-bold text-white uppercase">El Renacer</h3>
                </div>
                <div className="md:w-2/3 border-l-2 border-[#64189D]/30 pl-8">
                  <p className="text-[#bbb] leading-relaxed">
                    Decidimos regresar con una visión completamente renovada y una infraestructura de clase mundial. Cambiamos nuestra identidad, mejoramos nuestra tecnología y renacimos como <strong>AstralixNodes</strong>. Hoy en día, nos enfocamos en ofrecer hosting premium para Minecraft, juegos, VPS, cloud y servicios digitales con el mejor rendimiento y soporte técnico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CEO Section */}
        <CEOSection />

        {/* Call to Action */}
        <section className="bg-[#191919] py-20 text-center">
          <div className="reveal max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-6">ÚNETE A LA REVOLUCIÓN DEL HOSTING</h2>
            <p className="text-[#bbb] mb-10">Experimenta la verdadera potencia con AstralixNodes.</p>
            <a href="/minecraft" className="inline-block bg-[#64189D] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#7b1dc2] transition-colors shadow-lg shadow-[#64189D]/20">
              Ver Planes de Hosting
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
