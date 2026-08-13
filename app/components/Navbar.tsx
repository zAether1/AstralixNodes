'use client';
import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '../contexts/CurrencyContext';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency, formatPrice } = useCurrency();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = prefersReducedMotion();

    // ==========================================
    // INITIAL ENTRY ANIMATION
    // ==========================================
    if (!reduced) {
      const entryTl = gsap.timeline({ defaults: { ease: MOTION.ease.out } });

      entryTl
        .fromTo('.nav-logo',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 }
        )
        .fromTo('.nav-link',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          '-=0.3'
        )
        .fromTo('.nav-action',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 },
          '-=0.2'
        );
    }

    // ==========================================
    // SCROLL-DRIVEN TRANSITION
    // ==========================================
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '+=20',
      onUpdate: (self) => {
        if (!headerRef.current) return;
        const scrolled = self.progress > 0;

        gsap.to(headerRef.current, {
          backgroundColor: scrolled ? 'rgba(10, 1, 24, 0.85)' : 'rgba(10, 1, 24, 0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'blur(0px)',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0)',
          duration: reduced ? 0 : 0.4,
          ease: 'power2.out',
        });
      },
    });
  }, { scope: headerRef });

  // Mobile menu GSAP animation
  const toggleMobileMenu = useCallback(() => {
    const willOpen = !mobileMenuOpen;
    setMobileMenuOpen(willOpen);

    if (willOpen && mobileMenuRef.current) {
      requestAnimationFrame(() => {
        if (!mobileMenuRef.current) return;
        const items = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');

        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: MOTION.ease.out }
        );

        gsap.fromTo(items,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1, ease: MOTION.ease.out }
        );
      });
    }
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky z-40 top-0 border-b border-transparent transition-none"
    >
      <div className="mx-auto max-w-[87.5rem] px-6">
        <nav className="flex items-center justify-between h-24 md:h-28">

          {/* Logo */}
          <Link href="/" className="nav-logo flex items-center group relative pl-2 md:pl-4 opacity-0">
            <div className="absolute inset-0 bg-[#9000FA]/20 blur-[25px] rounded-full opacity-50 group-hover:opacity-100 group-hover:bg-[#9000FA]/30 transition-all duration-500 pointer-events-none"></div>
            <Image
              alt="AstralixNodes"
              width={140}
              height={130}
              src="/icons/AstralixNodes.png"
              priority
              className="w-auto h-[4.5rem] md:h-24 lg:h-[6.5rem] object-contain transition-all duration-500 group-hover:scale-105 relative z-10 drop-shadow-[0_0_15px_rgba(144,0,250,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(144,0,250,0.7)]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Minecraft Hosting Dropdown */}
            <div className="relative group">
              <Link href="/minecraft" className="nav-link flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#9000FA] transition-colors whitespace-nowrap opacity-0">
                Minecraft Hosting
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="glass-dark rounded-xl p-3 flex flex-col gap-2 shadow-2xl shadow-[#9000FA]/10">

                  <Link href="/minecraft" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-sm leading-tight">Minecraft Hosting</div>
                        <span className="bg-[#9000FA] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>
                      </div>
                      <div className="text-white/50 text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(4.24)}</span></div>
                    </div>
                  </Link>

                  <Link href="/minecraft-dedicado" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-sm leading-tight">Servidor Dedicado</div>
                      </div>
                      <div className="text-white/50 text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(21.08)}</span></div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Game Hosting Mega Menu */}
            <div className="relative group">
              <Link href="/juegos" className="nav-link flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#9000FA] transition-colors whitespace-nowrap opacity-0">
                Game Hosting
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[52rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="glass-dark rounded-xl p-4 shadow-2xl shadow-[#9000FA]/10">
                  <div className="grid grid-cols-3 gap-3">
                    <Link href="/project-zomboid" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden"><Image alt="Project Zomboid" fill className="object-cover" src="/assets/games/project-zomboid.jpeg" /></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Project Zomboid</div><div className="text-white/50 text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(4.25)}</span></div></div>
                    </Link>
                    <Link href="/palworld" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden"><Image alt="Palworld" fill className="object-cover" src="/assets/games/palworld.jpeg" /></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Palworld</div><div className="text-white/50 text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(8.50)}</span></div></div>
                    </Link>
                    <Link href="/hytale" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden"><Image alt="Hytale" fill className="object-cover" src="/assets/games/hytale-cover.png" /></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Hytale</div><div className="text-white/50 text-xs mt-1">Próximamente</div></div>
                    </Link>
                    <Link href="/valheim" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden"><Image alt="Valheim" fill className="object-cover" src="/assets/games/valheim.png" /></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Valheim</div><div className="text-white/50 text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(5.50)}</span></div></div>
                    </Link>
                    <Link href="/terraria" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden"><Image alt="Terraria" fill className="object-cover" src="/assets/games/terraria.jpeg" /></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Terraria</div><div className="text-white/50 text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(3.50)}</span></div></div>
                    </Link>
                    <Link href="/juegos" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-[60px] h-[70px] flex-shrink-0 rounded-md bg-[#9000FA] flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Otros Juegos</div><div className="text-white/50 text-xs mt-1">Ver todos los juegos disponibles</div></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Hosting Dropdown */}
            <div className="relative group">
              <Link href="/vps" className="nav-link flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#9000FA] transition-colors whitespace-nowrap opacity-0">
                Cloud Hosting
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="glass-dark rounded-xl p-3 flex flex-col gap-2 shadow-2xl shadow-[#9000FA]/10">
                  <Link href="/vps" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1"><div className="text-white font-bold text-sm leading-tight">VPS Hosting Premium</div><div className="text-white/50 text-xs mt-1">Servidores virtuales de alto rendimiento</div></div>
                  </Link>
                  <Link href="/discord-bot" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1"><div className="text-white font-bold text-sm leading-tight">Discord Bot Hosting</div><div className="text-white/50 text-xs mt-1">Mantén tus bots 24/7 en línea</div></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nosotros Dropdown */}
            <div className="relative group">
              <Link href="/nosotros" className="nav-link flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#9000FA] transition-colors whitespace-nowrap opacity-0">
                Nosotros
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[40rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="glass-dark rounded-xl p-4 shadow-2xl shadow-[#9000FA]/10">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/nosotros" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Acerca de Nosotros</div></div>
                    </Link>
                    <Link href="/branding" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Nuestro Branding</div></div>
                    </Link>
                    <Link href="/afiliados" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Programa de Afiliados</div></div>
                    </Link>
                    <Link href="/contacto" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Contacto</div></div>
                    </Link>
                    <Link href="/estado" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Estado de la Red</div></div>
                    </Link>
                    <Link href="/terminos" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Términos y Condiciones</div></div>
                    </Link>
                    <Link href="/privacidad" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#9000FA] rounded-full flex items-center justify-center"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div>
                      <div className="min-w-0"><div className="text-white font-bold text-sm leading-tight">Políticas de Privacidad</div></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-4">

            {/* Currency Selector */}
            <div className="nav-action flex glass-subtle rounded-lg p-1 opacity-0">
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-300 ${currency === 'EUR' ? 'bg-[#9000FA] text-white shadow-[0_0_12px_rgba(144,0,250,0.4)]' : 'text-white/50 hover:text-white'}`}
              >
                EUR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-300 ${currency === 'USD' ? 'bg-[#9000FA] text-white shadow-[0_0_12px_rgba(144,0,250,0.4)]' : 'text-white/50 hover:text-white'}`}
              >
                USD
              </button>
            </div>

            {/* Login & Panel */}
            <a href="https://clientes.astralixnodes.com" className="nav-action hidden lg:flex items-center gap-2 text-white font-bold text-sm hover:text-[#9000FA] transition-colors opacity-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              CLIENTES
            </a>

            <a href="https://panel.astralixnodes.com" className="nav-action hidden lg:flex bg-[#9000FA] text-white rounded-lg px-6 py-2.5 text-sm font-bold hover:bg-[#7000C8] transition-all items-center gap-2 shadow-[0_0_20px_rgba(144,0,250,0.25)] hover:shadow-[0_0_30px_rgba(144,0,250,0.4)] btn-shine opacity-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              PANEL
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white hover:text-[#9000FA] transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden glass-dark absolute w-full left-0 top-full p-4 flex flex-col gap-4 shadow-xl opacity-0">
          <Link href="/minecraft" className="mobile-menu-item text-white font-bold p-3 hover:bg-white/[0.06] rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Minecraft Hosting</Link>
          <Link href="/juegos" className="mobile-menu-item text-white font-bold p-3 hover:bg-white/[0.06] rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Game Hosting</Link>
          <Link href="/vps" className="mobile-menu-item text-white font-bold p-3 hover:bg-white/[0.06] rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Cloud Hosting</Link>
          <Link href="/nosotros" className="mobile-menu-item text-white font-bold p-3 hover:bg-white/[0.06] rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Nosotros</Link>
          <hr className="border-white/5" />
          <div className="flex flex-col gap-2">
            <a href="https://clientes.astralixnodes.com" className="mobile-menu-item glass-subtle text-white text-center rounded-lg p-3 font-bold">Área de Clientes</a>
            <a href="https://panel.astralixnodes.com" className="mobile-menu-item bg-[#9000FA] text-white text-center rounded-lg p-3 font-bold glow-purple">Game Panel</a>
          </div>
        </div>
      )}
    </header>
  );
}