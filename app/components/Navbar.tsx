'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '../contexts/CurrencyContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const { currency, setCurrency, formatPrice } = useCurrency();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header className={`sticky z-40 top-0 transition-colors duration-300 ${isScrolled ? 'bg-[#020202]/95 backdrop-blur-md border-b border-white/5' : 'bg-[#020202]'}`}>
      <div className="mx-auto max-w-[87.5rem] px-6" ref={navRef}>
        <nav className="flex items-center justify-between h-24 md:h-28">

          {/* Logo */}
          <Link href="/" className="flex items-center group relative pl-2 md:pl-4">
            <div className="absolute inset-0 bg-[#64189D]/20 blur-[25px] rounded-full opacity-50 group-hover:opacity-100 group-hover:bg-[#64189D]/30 transition-all duration-500 pointer-events-none"></div>
            <Image
              alt="AstralixNodes"
              width={140}
              height={130}
              src="/icons/AstralixNodes.png"
              priority
              className="w-auto h-[4.5rem] md:h-24 lg:h-[6.5rem] object-contain transition-all duration-500 group-hover:scale-105 relative z-10 drop-shadow-[0_0_15px_rgba(100,24,157,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(100,24,157,0.7)]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Minecraft Hosting Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('minecraft')}
                className="flex items-center gap-1 py-6 text-white font-bold text-base hover:text-[#64189D] transition-colors whitespace-nowrap cursor-pointer"
              >
                Minecraft Hosting
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'minecraft' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] transition-all duration-200 ${
                openDropdown === 'minecraft' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
              }`}>
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2 shadow-2xl">

                  <Link href="/minecraft" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-[15px] leading-tight">Minecraft Hosting</div>
                      </div>
                      <div className="text-[#999] text-[13px] mt-1">Proximamente</div>
                    </div>
                  </Link>

                  <Link href="/dedicado" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-[15px] leading-tight">Servidor Dedicado</div> <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>
                      </div>
                      <div className="text-[#999] text-[13px] mt-1">Potencia dedicada, rendimiento asegurado.</div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Extras Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('extras')}
                className="flex items-center gap-1 py-6 text-white font-bold text-base hover:text-[#64189D] transition-colors whitespace-nowrap cursor-pointer"
              >
                Extras
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'extras' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[24rem] transition-all duration-200 ${
                openDropdown === 'extras' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
              }`}>
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2 shadow-2xl">

                  <Link href="/extras/desarrollo-web" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-[15px] leading-tight">Desarrollo Web</div>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-[#999] text-[13px] mt-1">Sitios modernos y aplicaciones a medida</div>
                    </div>
                  </Link>

                  <Link href="/extras/bots-discord" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-[15px] leading-tight">Desarrollo de Bots de Discord</div>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-[#999] text-[13px] mt-1">Bots personalizados para tu servidor</div>
                    </div>
                  </Link>

                  <Link href="/extras/plugins-minecraft" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-[15px] leading-tight">Plugins de Minecraft</div>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-[#999] text-[13px] mt-1">Plugins únicos para tu servidor</div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Cloud Hosting Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('cloud')}
                className="flex items-center gap-1 py-6 text-white font-bold text-base hover:text-[#64189D] transition-colors whitespace-nowrap cursor-pointer"
              >
                Cloud Hosting
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'cloud' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] transition-all duration-200 ${
                openDropdown === 'cloud' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
              }`}>
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2 shadow-2xl">
                  <Link href="/vps" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-[15px] leading-tight">VPS Hosting Premium</div>
                      <div className="text-[#999] text-[13px] mt-1">Servidores virtuales de alto rendimiento</div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Nosotros Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('nosotros')}
                className="flex items-center gap-1 py-6 text-white font-bold text-base hover:text-[#64189D] transition-colors whitespace-nowrap cursor-pointer"
              >
                Nosotros
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'nosotros' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[40rem] transition-all duration-200 ${
                openDropdown === 'nosotros' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
              }`}>
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-4 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3">

                    <Link href="/nosotros" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Acerca de Nosotros</div>
                      </div>
                    </Link>

                    {/* <Link href="/branding" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Nuestro Branding</div>
                      </div>
                    </Link> */}

                    <Link href="/afiliados" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Programa de Afiliados</div>
                      </div>
                    </Link>

                    <Link href="/contacto" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Contacto</div>
                      </div>
                    </Link>

                    <Link href="/estado" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Estado de la Red</div>
                      </div>
                    </Link>

                    <Link href="/terminos" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Términos y Condiciones</div>
                      </div>
                    </Link>

                    <Link href="/privacidad" onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-[15px] leading-tight">Políticas de Privacidad</div>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-4">

            {/* Currency Selector */}
            {/* <div className="relative">
              <div className="inline-flex items-center bg-[#141414] rounded-full border border-white/6 p-1">
                <button
                  onClick={() => setCurrency('EUR')}
                  aria-pressed={currency === 'EUR'}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${currency === 'EUR' ? 'bg-[#64189D] text-white shadow-[0_6px_20px_rgba(100,24,157,0.18)]' : 'text-[#aaa] hover:text-white'} cursor-pointer`}
                >
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/5 text-sm">€</span>
                  <span className="hidden sm:inline">EUR</span>
                </button>

                <button
                  onClick={() => setCurrency('USD')}
                  aria-pressed={currency === 'USD'}
                  className={`flex items-center gap-2 px-3 py-1 ml-1 rounded-full text-xs font-bold transition-all ${currency === 'USD' ? 'bg-[#64189D] text-white shadow-[0_6px_20px_rgba(100,24,157,0.18)]' : 'text-[#aaa] hover:text-white'} cursor-pointer`}
                >
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/5 text-sm">$</span>
                  <span className="hidden sm:inline">USD</span>
                </button>
              </div>
            </div> */}

            {/* Login & Panel */}
            <a href="https://client.astralixnodes.net" className="hidden lg:flex items-center gap-2 text-white font-bold text-base hover:text-[#64189D] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              CLIENTES
            </a>

            {/* Panel Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => toggleDropdown('panel')}
                className="flex bg-[#64189D] text-white rounded-lg px-6 py-2.5 text-base font-bold hover:bg-[#7b1dc2] transition-colors items-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                PANEL
                <svg
                  className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${openDropdown === 'panel' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <div className={`absolute top-full right-0 pt-2 w-64 transition-all duration-200 ${
                openDropdown === 'panel' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-1'
              }`}>
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-2 flex flex-col gap-1 shadow-2xl">

                  {/* Panel Juegos */}
                  <a href="https://panel.astralixnodes.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1e1e1e] transition-colors group/item">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center group-hover/item:bg-[#64189D]/40 transition-colors">
                      <svg className="w-4.5 h-4.5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-[15px] leading-tight">Panel Juegos</div>
                      <div className="text-[#888] text-[13px] mt-0.5">Game servers & hosting</div>
                    </div>
                  </a>

                  {/* Panel Dedicados */}
                  <a href="https://client.astralixnodes.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1e1e1e] transition-colors group/item">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center group-hover/item:bg-[#64189D]/40 transition-colors">
                      <svg className="w-4.5 h-4.5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-[15px] leading-tight">Panel Dedicados</div>
                      <div className="text-[#888] text-[13px] mt-0.5">Servidores dedicados</div>
                    </div>
                  </a>

                  {/* Panel VPS */}
                  <a href="https://client.astralixnodes.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1e1e1e] transition-colors group/item">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center group-hover/item:bg-[#64189D]/40 transition-colors">
                      <svg className="w-4.5 h-4.5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-[15px] leading-tight">Panel VPS</div>
                      <div className="text-[#888] text-[13px] mt-0.5">Servidores virtuales</div>
                    </div>
                  </a>

                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white cursor-pointer p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/[0.06] fixed left-0 top-[6rem] w-full h-[calc(100vh-6rem)] shadow-2xl overflow-y-auto z-50">

          {/* Navegación principal */}
          <div className="px-4 py-3 flex flex-col">

            {/* Minecraft Hosting */}
            <div className="border-b border-white/[0.05]">
              <button
                onClick={() => setOpenMobileSection(prev => prev === 'minecraft' ? null : 'minecraft')}
                className="w-full flex items-center justify-between py-4 text-white font-bold text-[15px] cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  </span>
                  Minecraft Hosting
                </span>
                <svg className={`w-4 h-4 text-[#888] transition-transform duration-200 flex-shrink-0 ${openMobileSection === 'minecraft' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {openMobileSection === 'minecraft' && (
                <div className="pb-3 flex flex-col gap-2">
                  <Link href="/minecraft" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">Minecraft Hosting</div>
                      <div className="text-[#888] text-[15px] mt-0.5">Proximamente</div>
                    </div>
                  </Link>
                  <Link href="/dedicado" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base">Servidor Dedicado</span>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>
                      </div>
                      <div className="text-[#888] text-[15px] mt-0.5">¡Precios Increibles!</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Extras */}
            <div className="border-b border-white/[0.05]">
              <button
                onClick={() => setOpenMobileSection(prev => prev === 'extras' ? null : 'extras')}
                className="w-full flex items-center justify-between py-4 text-white font-bold text-[15px] cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </span>
                  Extras
                  <span className="bg-[#64189D]/30 border border-[#64189D]/40 text-[#a855f7] text-[10px] font-bold px-1.5 py-0.5 rounded">¡PRECIOS ACCESIBLES!</span>
                </span>
                <svg className={`w-4 h-4 text-[#888] transition-transform duration-200 flex-shrink-0 ${openMobileSection === 'extras' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {openMobileSection === 'extras' && (
                <div className="pb-3 flex flex-col gap-2">
                  <Link href="/extras/desarrollo-web" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base">Desarrollo Web</span>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-[#888] text-[15px] mt-0.5">Sitios modernos a medida</div>
                    </div>
                  </Link>
                  <Link href="/extras/bots-discord" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base">Bots de Discord</span>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-[#888] text-[15px] mt-0.5">Bots personalizados para tu server</div>
                    </div>
                  </Link>
                  <Link href="/extras/plugins-minecraft" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-base">Plugins Minecraft</span>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-[#888] text-[15px] mt-0.5">Plugins únicos para tu servidor</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Cloud Hosting */}
            <div className="border-b border-white/[0.05]">
              <button
                onClick={() => setOpenMobileSection(prev => prev === 'cloud' ? null : 'cloud')}
                className="w-full flex items-center justify-between py-4 text-white font-bold text-[15px] cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                  </span>
                  Cloud Hosting
                </span>
                <svg className={`w-4 h-4 text-[#888] transition-transform duration-200 flex-shrink-0 ${openMobileSection === 'cloud' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {openMobileSection === 'cloud' && (
                <div className="pb-3">
                  <Link href="/vps" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <div className="w-9 h-9 flex-shrink-0 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-base">VPS Hosting Premium</div>
                      <div className="text-[#888] text-[15px] mt-0.5">Servidores virtuales de alto rendimiento</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Nosotros */}
            <div className="border-b border-white/[0.05]">
              <button
                onClick={() => setOpenMobileSection(prev => prev === 'nosotros' ? null : 'nosotros')}
                className="w-full flex items-center justify-between py-4 text-white font-bold text-[15px] cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#64189D]/20 border border-[#64189D]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </span>
                  Nosotros
                </span>
                <svg className={`w-4 h-4 text-[#888] transition-transform duration-200 flex-shrink-0 ${openMobileSection === 'nosotros' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {openMobileSection === 'nosotros' && (
                <div className="pb-3 grid grid-cols-2 gap-2">
                  <Link href="/nosotros" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <svg className="w-4 h-4 text-[#a855f7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-white font-bold text-base">Acerda de Nosotros</span>
                  </Link>
                  <Link href="/afiliados" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <svg className="w-4 h-4 text-[#a855f7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <span className="text-white font-bold text-base">Afiliados</span>
                  </Link>
                  <Link href="/contacto" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <svg className="w-4 h-4 text-[#a855f7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span className="text-white font-bold text-base">Contacto</span>
                  </Link>
                  <Link href="/estado" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <svg className="w-4 h-4 text-[#a855f7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-white font-bold text-base">Estado Red</span>
                  </Link>
                  <Link href="/terminos" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <svg className="w-4 h-4 text-[#a855f7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span className="text-white font-bold text-base">Términos</span>
                  </Link>
                  <Link href="/privacidad" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 rounded-xl bg-[#141414] active:bg-[#1e1e1e] cursor-pointer">
                    <svg className="w-4 h-4 text-[#a855f7] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="text-white font-bold text-base">Privacidad</span>
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Accesos rápidos */}
          <div className="px-4 py-4 bg-[#050505] border-t border-white/[0.04] flex flex-col gap-3">
            <p className="text-[#555] text-[11px] font-bold uppercase tracking-widest">Acceso rápido</p>
            <a href="https://client.astralixnodes.net" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#141414] border border-white/[0.06] text-white text-center rounded-xl p-3.5 font-bold text-base cursor-pointer active:bg-[#1e1e1e]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              Área de Clientes
            </a>
            <div className="grid grid-cols-3 gap-2">
              <a href="https://panel.astralixnodes.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#64189D]/15 border border-[#64189D]/25 cursor-pointer active:bg-[#64189D]/25">
                <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span className="text-white text-[11px] font-bold text-center leading-tight">Panel Juegos</span>
              </a>
              <a href="https://client.astralixnodes.net" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#64189D]/15 border border-[#64189D]/25 cursor-pointer active:bg-[#64189D]/25">
                <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
                <span className="text-white text-[11px] font-bold text-center leading-tight">Panel Dedi.</span>
              </a>
              <a href="https://client.astralixnodes.net" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#64189D]/15 border border-[#64189D]/25 cursor-pointer active:bg-[#64189D]/25">
                <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
                <span className="text-white text-[11px] font-bold text-center leading-tight">Panel VPS</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </header>
  );
}