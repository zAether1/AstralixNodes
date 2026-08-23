'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '../contexts/CurrencyContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency, formatPrice } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col relative z-50 w-full">
      {/* Top Banner - XeroHost Style */}
      <div className="hidden lg:block">
        <div
          className={`overflow-hidden transition-all duration-380 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'h-0 opacity-0' : 'h-11 opacity-100'
          }`}
        >
          <div className="mx-4 sm:mx-6 lg:mx-8 xl:mx-auto xl:max-w-[1284px] rounded-b-2xl border-x border-b border-white/10 bg-[#0d0d12]/70 backdrop-blur-xl shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
            <div className="h-11 flex items-center justify-between gap-4 px-4 sm:px-6 text-sm">
              <button className="group flex items-center gap-2.5 min-w-0 text-zinc-200 hover:text-white transition-colors font-medium">
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-[#9000FA] text-white text-[11px] font-bold tracking-wide shrink-0">
                  OFFER
                </span>
                <span className="truncate">
                  ASTRALIX15 — 15% OFF en tu primer servicio
                </span>
                <svg
                  aria-hidden="true"
                  className="lucide lucide-copy w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="14" rx="2" ry="2" width="14" x="8" y="8"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
              </button>
              <div className="flex items-center gap-6 shrink-0">
                <a
                  className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                  href="https://client.astralixnodes.net"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 576 512">
                    <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0L109.6 0C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9c0 0 0 0-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3L448 384l-320 0 0-133.4c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3L64 384l0 64c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-64 0-131.4c-4 1-8 1.8-12.3 2.3z"></path>
                  </svg>
                  Área de Clientes
                </a>
                <a
                  className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                  href="https://panel.astralixnodes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512">
                    <path d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"></path>
                  </svg>
                  Panel Juegos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 w-full h-[72px] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06] shadow-lg'
            : 'bg-transparent backdrop-blur-0 border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1320px] h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="relative group block shrink-0 flex items-center pt-2">
            <Image
              alt="AstralixNodes"
              width={140}
              height={130}
              src="/icons/AstralixNodes.png"
              priority
              className="h-[36px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-100 opacity-90 block scale-125 origin-left"
            />
            <div className="absolute -inset-4 bg-[#9000FA]/20 blur-xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 ml-auto h-full">
            <nav className="flex items-center gap-1 h-full">
              
              {/* Dropdown: Game Hosting */}
              <div className="h-full flex items-center relative group">
                <button className="relative z-10 flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 rounded-lg group-hover:bg-white/[0.08] text-zinc-300 hover:text-white">
                  Game Hosting
                  <svg className="lucide lucide-chevron-down w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-50 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 min-w-[280px]">
                  <div className="bg-[#0d0d12]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-2 flex flex-col shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
                    <Link href="/minecraft" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Image src="/holy_assets/game_icons/minecraft.svg" alt="Minecraft" width={24} height={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200">Minecraft Hosting</span>
                        <span className="text-xs text-zinc-500">Servidores premium para Java y Bedrock</span>
                      </div>
                    </Link>
                    <Link href="/dedicado" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200 flex items-center gap-2">Servidor Dedicado <span className="px-1.5 py-0.5 rounded text-[8px] font-bold leading-none bg-[#9000FA] text-white">POPULAR</span></span>
                        <span className="text-xs text-zinc-500">Bare metal para máximo rendimiento</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dropdown: Cloud */}
              <div className="h-full flex items-center relative group">
                <button className="relative z-10 flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 rounded-lg group-hover:bg-white/[0.08] text-zinc-300 hover:text-white">
                  Cloud
                  <svg className="lucide lucide-chevron-down w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-50 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 min-w-[280px]">
                  <div className="bg-[#0d0d12]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-2 flex flex-col shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
                    <Link href="/vps" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200">VPS Hosting</span>
                        <span className="text-xs text-zinc-500">Servidores virtuales de alta capacidad</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dropdown: Extras */}
              <div className="h-full flex items-center relative group">
                <button className="relative z-10 flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 rounded-lg group-hover:bg-white/[0.08] text-zinc-300 hover:text-white">
                  Extras
                  <svg className="lucide lucide-chevron-down w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-50 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 min-w-[300px]">
                  <div className="bg-[#0d0d12]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-2 flex flex-col shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
                    <Link href="/extras/desarrollo-web" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200 flex items-center gap-2">Desarrollo Web <span className="px-1.5 py-0.5 rounded text-[8px] font-bold leading-none bg-[#9000FA] text-white">NUEVO</span></span>
                        <span className="text-xs text-zinc-500">Sitios web modernos y a medida</span>
                      </div>
                    </Link>
                    <Link href="/extras/bots-discord" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200 flex items-center gap-2">Bots de Discord <span className="px-1.5 py-0.5 rounded text-[8px] font-bold leading-none bg-[#9000FA] text-white">NUEVO</span></span>
                        <span className="text-xs text-zinc-500">Bots personalizados para tu servidor</span>
                      </div>
                    </Link>
                    <Link href="/extras/plugins-minecraft" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-200 flex items-center gap-2">Plugins Minecraft <span className="px-1.5 py-0.5 rounded text-[8px] font-bold leading-none bg-[#9000FA] text-white">NUEVO</span></span>
                        <span className="text-xs text-zinc-500">Plugins exclusivos y sistemas únicos</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dropdown: Nosotros */}
              <div className="h-full flex items-center relative group">
                <button className="relative z-10 flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 rounded-lg group-hover:bg-white/[0.08] text-zinc-300 hover:text-white">
                  Nosotros
                  <svg className="lucide lucide-chevron-down w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-50 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 min-w-[340px]">
                  <div className="bg-[#0d0d12]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/nosotros" className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-sm font-semibold text-zinc-200">Acerca de</span>
                      </Link>
                      <Link href="/afiliados" className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-sm font-semibold text-zinc-200">Afiliados</span>
                      </Link>
                      <Link href="/contacto" className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-sm font-semibold text-zinc-200">Contacto</span>
                      </Link>
                      <Link href="/estado" className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-sm font-semibold text-zinc-200">Estado</span>
                      </Link>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
                      <Link href="/terminos" className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-xs font-semibold text-zinc-400">Términos</span>
                      </Link>
                      <Link href="/privacidad" className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-xs font-semibold text-zinc-400">Privacidad</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </nav>
          </div>

          {/* Right Actions: Currency and Login */}
          <div className="hidden lg:flex items-center gap-4 ml-6 pl-6 border-l border-white/[0.06] h-8">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border-0 bg-white/5 hover:bg-white/10 transition-all active:scale-95 group" onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}>
              <span className="text-[14px] font-medium text-zinc-300 group-hover:text-white">
                {currency}
              </span>
            </button>
            <a href="https://panel.astralixnodes.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9000FA]/10 text-[#9000FA] font-semibold hover:bg-[#9000FA] hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              Login
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-0 bg-white/5 hover:bg-white/10 transition-all active:scale-95" onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}>
              <span className="text-[12px] font-medium text-zinc-300 uppercase">{currency}</span>
            </button>
            <button aria-label="Abrir menú" className="p-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16"></path></svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide Menu */}
      <div className={`fixed inset-0 z-[60] bg-[#080808] lg:hidden flex flex-col overflow-hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="shrink-0 flex items-center justify-between px-5 h-[72px] border-b border-white/[0.06]">
          <a href="/">
            <Image alt="AstralixNodes" width={120} height={32} src="/icons/AstralixNodes.png" className="opacity-90 h-8 w-auto object-contain" />
          </a>
          <button aria-label="Cerrar menú" className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all" onClick={() => setMobileMenuOpen(false)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex flex-col divide-y divide-white/[0.06]">
            <Link href="/" className="flex items-center px-3 py-3.5 text-zinc-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-base font-semibold">Inicio</span>
            </Link>
            <Link href="/minecraft" className="flex items-center px-3 py-3.5 text-zinc-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-base font-semibold">Minecraft</span>
            </Link>
            <Link href="/vps" className="flex items-center px-3 py-3.5 text-zinc-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-base font-semibold">Cloud / VPS</span>
            </Link>
            <Link href="/nosotros" className="flex items-center px-3 py-3.5 text-zinc-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-base font-semibold">Nosotros</span>
            </Link>
            <div className="px-3 py-4">
               <a href="https://panel.astralixnodes.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#9000FA] text-white font-semibold transition-all hover:bg-[#7b00d6]">
                 Panel Juegos
               </a>
               <a href="https://client.astralixnodes.net" target="_blank" rel="noopener noreferrer" className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-semibold transition-all hover:bg-white/10">
                 Área de Clientes
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}