'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set('.footer-reveal', { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo('.footer-reveal',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: MOTION.ease.out,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
        }
      }
    );
  }, { scope: containerRef });

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={containerRef} className="bg-[#0a0118] text-white border-t border-white/5 relative overflow-hidden">
      {/* Subtle bottom orb glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#9000FA]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-[87.5rem] mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
          
          {/* Brand Left Column */}
          <div className="lg:max-w-[26.25rem] flex-shrink-0 footer-reveal opacity-0">
            <div className="flex items-center gap-3.5 mb-5">
              <Image 
                alt="AstralixNodes" 
                width={46} 
                height={44} 
                className="rounded-xl border border-white/10 p-1.5 bg-[#140528]/80 drop-shadow-[0_0_12px_rgba(144,0,250,0.3)]" 
                src="/icons/AstralixNodes.png" 
              />
              <div>
                <span className="text-[26px] font-black text-white leading-none block tracking-wide uppercase">AstralixNodes</span>
                <span className="text-xs font-bold text-white/50 leading-tight block mt-1 uppercase tracking-wider">Hosting premium de alto rendimiento.</span>
              </div>
            </div>
            
            <p className="text-white/40 text-xs mt-6 leading-relaxed max-w-sm">
              Potenciamos comunidades con hardware de última generación, soporte en español especializado y la mejor estabilidad del mercado.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4.5 mt-8">
              <a href="#" className="text-white/40 hover:text-[#9000FA] transition-all hover:scale-110 drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_8px_rgba(144,0,250,0.6)] cursor-default" aria-label="X (Twitter)">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#9000FA] transition-all hover:scale-110 drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_8px_rgba(144,0,250,0.6)] cursor-default" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#9000FA] transition-all hover:scale-110 drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_8px_rgba(144,0,250,0.6)] cursor-default" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </a>
              <a target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#9000FA] transition-all hover:scale-110 drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_8px_rgba(144,0,250,0.6)]" aria-label="Discord" href="https://discord.gg/zmc2VbFCCp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#9000FA] transition-all hover:scale-110 drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_8px_rgba(144,0,250,0.6)] cursor-default" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#9000FA] transition-all hover:scale-110 drop-shadow-[0_0_5px_transparent] hover:drop-shadow-[0_0_8px_rgba(144,0,250,0.6)] cursor-default" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
              </a>
            </div>
          </div>

          {/* Links Grid Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-14 relative">
            
            <div className="min-w-0 break-words footer-reveal opacity-0">
              <h3 className="text-white font-black uppercase text-sm tracking-wider mb-6">POPULAR</h3>
              <ul className="space-y-3">
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/minecraft">Minecraft</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/minecraft-dedicado">Servidor Dedicado</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/discord-bot">Discord Bot Hosting</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/juegos">Otros Juegos Hosting</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/ts3">Servidor de Voz Hosting</Link></li>
                <li><a target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors" href="https://panel.astralixnodes.com/">Panel Servidores MC</a></li>
                <li><a target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors" href="https://panel.astralixnodes.com/">Panel Servidores Juegos</a></li>
              </ul>
            </div>
            
            <div className="min-w-0 break-words footer-reveal opacity-0">
              <h3 className="text-white font-black uppercase text-sm tracking-wider mb-6">NOSOTROS</h3>
              <ul className="space-y-3">
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/about">Acerca de nosotros</Link></li>
                <li><a target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors" href="https://clientes.astralixnodes.com/">Área de clientes</a></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/branding">Branding</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/metodos-de-pago">Métodos de pago</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/hardware">Hardware por ubicación</Link></li>
              </ul>

              <h3 className="text-white font-black uppercase text-sm tracking-wider mt-8 mb-6">LEGAL</h3>
              <ul className="space-y-3">
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/legal/tos">Términos y condiciones</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/legal/privacy">Políticas de privacidad</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/legal/sla">Acuerdo de Nivel de Servicio</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/legal/copyright">Política de Copyright</Link></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/legal/cookies">Política de Cookies</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 text-center md:text-left min-w-0 break-words footer-reveal opacity-0">
              <h3 className="text-white font-black uppercase text-sm tracking-wider mb-6">SOPORTE</h3>
              <ul className="space-y-3">
                <li><a target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors" href="https://ticket.astralixnodes.com">Crea un ticket</a></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors" href="/faq">Base de conocimientos</Link></li>
                <li><a target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors" href="https://discord.gg/zmc2VbFCCp">Discord</a></li>
                <li><a target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors" href="https://estado.astralixnodes.com">Estado de la red</a></li>
                <li><Link className="text-white/50 hover:text-white text-sm transition-colors inline-flex items-center gap-2 md:justify-start justify-center" href="/afiliados">
                    <span className="bg-[#9000FA]/10 text-[#9000FA] font-black text-[10px] px-1.5 py-0.5 rounded border border-[#9000FA]/20 tracking-wider">NUEVO</span>
                    <span>Solicitar Afiliación</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Scroll to Top Trigger */}
            <button 
              onClick={scrollToTop}
              className="hidden md:flex absolute -right-2 bottom-0 w-11 h-11 rounded-full border border-[#9000FA]/40 bg-[#140528]/80 text-[#9000FA] items-center justify-center hover:bg-[#9000FA] hover:text-white hover:border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(144,0,250,0.2)] hover:shadow-[0_0_25px_rgba(144,0,250,0.5)] hover:-translate-y-1 cursor-pointer" 
              aria-label="Volver arriba"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
            </button>
          </div>
        </div>

        {/* Footer Bottom copyright & compliance */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-5 footer-reveal opacity-0">
          <div className="text-center md:text-left">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-wider">Copyright © 2026 AstralixNodes. Todos los derechos reservados.</p>
          </div>
          <div className="flex-shrink-0">
            <a href="https://www.dmca.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 border border-white/10 bg-white/[0.02] rounded-lg px-4 py-2 hover:border-[#9000FA]/30 hover:bg-white/[0.04] transition-all">
              <span className="text-[#9000FA] font-black text-xs tracking-wider glow-text">DMCA</span>
              <div className="w-5 h-5 rounded-full bg-[#9000FA] flex items-center justify-center shadow-[0_0_10px_rgba(144,0,250,0.4)]">
                <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
              </div>
              <span className="text-white font-bold text-xs tracking-wider">PROTECTED</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
