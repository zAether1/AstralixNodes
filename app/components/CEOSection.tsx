'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function CEOSection() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.ceo-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#64189D] overflow-hidden py-20 sm:py-24">
      <div className="ceo-reveal max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#180228] shadow-[0_0_40px_rgba(24,2,40,0.5)]">
            <Image 
              src="/icons/Foto-1-08-2026.png" 
              alt="Carlos Jahir - CEO AstralixNodes" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <p className="text-[#180228] font-bold tracking-widest uppercase mb-2">Fundador & CEO</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">Carlos Jahir</h2>
          <p className="text-white/80 text-xl font-medium mb-6 italic">@_zAether</p>
          
          <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed italic border-l-4 border-[#180228] pl-6 py-2">
            "Construimos AstralixNodes con un solo objetivo en mente: brindarte el rendimiento puro y la estabilidad que todo creador merece. Sin compromisos, sin ataduras, solo potencia y un soporte que sí entiende tus problemas porque hemos estado allí."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
