'use client';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactoPage() {
  useEffect(() => {
    gsap.fromTo('.ct-hero', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );

    const cards = gsap.utils.toArray('.ct-card');
    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%' }
        }
      );
    });
  }, []);

  return (
    <div className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#64189D]/20 blur-[120px] rounded-full pointer-events-none" />
        </div>
        
        <div className="max-w-[87.5rem] mx-auto relative z-10 text-center">
          <div className="ct-hero inline-block px-4 py-2 bg-[#64189D]/20 border border-[#64189D]/30 text-[#64189D] font-bold tracking-widest uppercase text-xs rounded-lg mb-6 backdrop-blur-sm">
            Atención al Cliente
          </div>
          <h1 className="ct-hero text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
            Estamos para <span className="text-[#64189D]">Ayudarte</span>
          </h1>
          <p className="ct-hero text-lg md:text-xl text-[#999] max-w-2xl mx-auto leading-relaxed">
            Nuestro equipo de ingenieros de infraestructura y soporte técnico está disponible 24/7 para resolver cualquier inquietud de nivel empresarial o técnico.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-[87.5rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Correo Card */}
            <div className="ct-card bg-[#141414] border border-white/5 hover:border-[#64189D]/50 rounded-3xl p-8 transition-all duration-300 group flex flex-col items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 bg-[#64189D]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#64189D]/20 transition-all duration-300">
                <svg className="w-8 h-8 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Correo Electrónico</h3>
              <p className="text-[#888] mb-8 leading-relaxed">
                Soporte corporativo y consultas comerciales. Tiempo de respuesta promedio: menos de 2 horas.
              </p>
              <a href="mailto:support@astralixnodes.net" className="mt-auto block w-full bg-white/5 hover:bg-[#64189D] border border-white/10 hover:border-transparent text-white font-bold py-3 rounded-xl transition-all">
                support@astralixnodes.net
              </a>
            </div>

            {/* Discord Card */}
            <div className="ct-card bg-[#141414] border border-white/5 hover:border-[#5865F2]/50 rounded-3xl p-8 transition-all duration-300 group flex flex-col items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 bg-[#5865F2]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#5865F2]/20 transition-all duration-300">
                <svg className="w-8 h-8 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Comunidad Discord</h3>
              <p className="text-[#888] mb-8 leading-relaxed">
                Únete a miles de administradores. Soporte rápido de la comunidad y sistema de tickets en vivo.
              </p>
              <a href="https://discord.gg/zmc2VbFCCp" target="_blank" rel="noopener noreferrer" className="mt-auto block w-full bg-white/5 hover:bg-[#5865F2] border border-white/10 hover:border-transparent text-white font-bold py-3 rounded-xl transition-all">
                Unirse al Servidor
              </a>
            </div>

            {/* Teléfono Card */}
            <div className="ct-card bg-[#141414] border border-white/5 hover:border-[#64189D]/50 rounded-3xl p-8 transition-all duration-300 group flex flex-col items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 bg-[#64189D]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#64189D]/20 transition-all duration-300">
                <svg className="w-8 h-8 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Línea Telefónica</h3>
              <p className="text-[#888] mb-8 leading-relaxed">
                Asistencia de emergencia e infraestructura global exclusiva para planes empresariales y dedicados.
              </p>
              <a href="tel:+13055552847" className="mt-auto block w-full bg-white/5 hover:bg-[#64189D] border border-white/10 hover:border-transparent text-white font-bold py-3 rounded-xl transition-all">
                +1 (305) 555-2847
              </a>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
