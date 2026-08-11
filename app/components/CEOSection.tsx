'use client';
import React, { useEffect } from 'react';

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
    <section className="bg-gradient-to-r from-[#64189D] to-[#3a0b4f] overflow-hidden py-20 sm:py-24">
      <div className="ceo-reveal max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6 text-center" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease-out' }}>
        <div className="w-full max-w-2xl">
          <p className="text-sm font-bold text-white/80 mb-2 uppercase tracking-widest">Fundador & CEO</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Carlos Jahir</h2>
          <p className="text-white/70 text-sm md:text-base italic mb-4">@_zAether</p>

          <blockquote className="text-white text-lg md:text-xl font-medium italic border-l-4 border-white/10 pl-6 py-2 mb-6">
            "Construimos AstralixNodes con un solo objetivo en mente: brindarte rendimiento y estabilidad sin compromisos."
          </blockquote>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://discord.gg/6UMfyMM5pu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-[#180228] font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-[1.02] transition-transform">Unirme al Discord</a>
            <a href="/contacto" className="inline-flex items-center justify-center bg-gradient-to-r from-[#7b1dc2] to-[#64189D] text-white font-bold px-6 py-3 rounded-lg hover:opacity-95 transition">Contactar al Equipo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
