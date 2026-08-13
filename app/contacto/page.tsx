'use client';
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';
import GlowCard from '../components/animations/GlowCard';
import MagneticButton from '../components/animations/MagneticButton';
import AnimatedHeading from '../components/animations/AnimatedHeading';
import ScrollReveal from '../components/animations/ScrollReveal';

export default function ContactoPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set(['.ct-hero', '.ct-card'], { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo('.ct-hero', 
      { y: 40, opacity: 0, filter: 'blur(6px)' }, 
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.1, ease: MOTION.ease.out }
    );

    const cards = gsap.utils.toArray('.ct-card');
    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.98, filter: 'blur(4px)' },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8, 
          delay: i * 0.1,
          ease: MOTION.ease.out,
          scrollTrigger: { 
            trigger: card, 
            start: 'top 90%' 
          }
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#020202] min-h-screen text-[#888]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        {/* Background glow orb */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#9000FA]/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
        
        <div className="max-w-[87.5rem] mx-auto relative z-10 text-center">
          <div className="ct-hero inline-block px-4 py-2 bg-[#9000FA]/15 border border-[#9000FA]/30 text-[#9000FA] font-bold tracking-widest uppercase text-xs rounded-lg mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(144,0,250,0.15)] opacity-0">
            Atención al Cliente
          </div>
          <AnimatedHeading as="h1" className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
            Estamos para Ayudarte
          </AnimatedHeading>
          <p className="ct-hero text-lg md:text-xl text-[#999] max-w-2xl mx-auto leading-relaxed opacity-0">
            Nuestro equipo de ingenieros de infraestructura y soporte técnico está disponible 24/7 para resolver cualquier inquietud de nivel empresarial o técnico.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-32 px-6 relative z-10">
        <div className="max-w-[87.5rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Correo Card */}
            <div className="ct-card opacity-0 h-full flex">
              <GlowCard glowColor="rgba(144,0,250,0.3)" glowIntensity="normal" className="p-8 flex flex-col items-center text-center w-full h-full">
                <div className="w-16 h-16 bg-[#9000FA]/10 border border-[#9000FA]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#9000FA]/20 transition-all duration-300 shadow-[0_0_10px_rgba(144,0,250,0.15)]">
                  <svg className="w-8 h-8 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wide">Correo Electrónico</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Soporte corporativo y consultas comerciales. Tiempo de respuesta promedio: menos de 2 horas.
                </p>
                <MagneticButton as="a" href="mailto:support@astralixnodes.net" className="w-full mt-auto">
                  <div className="w-full bg-[#9000FA]/10 hover:bg-[#9000FA] border border-[#9000FA]/20 hover:border-transparent text-white font-bold py-3.5 rounded-xl transition-all btn-shine">
                    support@astralixnodes.net
                  </div>
                </MagneticButton>
              </GlowCard>
            </div>

            {/* Discord Card */}
            <div className="ct-card opacity-0 h-full flex">
              <GlowCard glowColor="rgba(88,101,242,0.35)" glowIntensity="normal" className="p-8 flex flex-col items-center text-center w-full h-full">
                <div className="w-16 h-16 bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#5865F2]/20 transition-all duration-300 shadow-[0_0_10px_rgba(88,101,242,0.15)]">
                  <svg className="w-8 h-8 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wide">Comunidad Discord</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Únete a miles de administradores. Soporte rápido de la comunidad y sistema de tickets en vivo.
                </p>
                <MagneticButton as="a" href="https://discord.gg/zmc2VbFCCp" target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
                  <div className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3.5 rounded-xl transition-all btn-shine shadow-[0_0_15px_rgba(88,101,242,0.3)]">
                    Unirse al Servidor
                  </div>
                </MagneticButton>
              </GlowCard>
            </div>

            {/* Teléfono Card */}
            <div className="ct-card opacity-0 h-full flex">
              <GlowCard glowColor="rgba(144,0,250,0.3)" glowIntensity="normal" className="p-8 flex flex-col items-center text-center w-full h-full">
                <div className="w-16 h-16 bg-[#9000FA]/10 border border-[#9000FA]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#9000FA]/20 transition-all duration-300 shadow-[0_0_10px_rgba(144,0,250,0.15)]">
                  <svg className="w-8 h-8 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wide">Línea Telefónica</h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Asistencia de emergencia e infraestructura global exclusiva para planes empresariales y dedicados.
                </p>
                <MagneticButton as="a" href="tel:+13055552847" className="w-full mt-auto">
                  <div className="w-full bg-[#9000FA]/10 hover:bg-[#9000FA] border border-[#9000FA]/20 hover:border-transparent text-white font-bold py-3.5 rounded-xl transition-all btn-shine">
                    +1 (305) 555-2847
                  </div>
                </MagneticButton>
              </GlowCard>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
