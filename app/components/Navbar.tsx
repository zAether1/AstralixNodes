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
    <header className={`sticky z-40 top-0 transition-colors duration-300 ${isScrolled ? 'bg-[#020202]/95 backdrop-blur-md border-b border-white/5' : 'bg-[#020202]'}`}>
      <div className="mx-auto max-w-[87.5rem] px-6">
        <nav className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              alt="AstralixNodes" 
              width={66} 
              height={62} 
              src="/icons/AstralixNodes.png" 
              className="w-auto h-12"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* Minecraft Hosting Dropdown */}
            <div className="relative group">
              <Link href="/minecraft" className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Minecraft Hosting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2 shadow-2xl">
                  
                  <Link href="/minecraft" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-sm leading-tight">Minecraft Hosting</div>
                        <span className="bg-[#64189D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>
                      </div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(4.24)}</span></div>
                    </div>
                  </Link>

                  <Link href="/minecraft-dedicado" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-sm leading-tight">Minecraft Dedicado</div>
                      </div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(21.08)}</span></div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Game Hosting Mega Menu */}
            <div className="relative group">
              <Link href="/juegos" className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Game Hosting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[52rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-4 shadow-2xl">
                  <div className="grid grid-cols-3 gap-3">
                    
                    <Link href="/project-zomboid" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Project Zomboid" fill className="object-cover" src="/assets/games/project-zomboid.jpeg" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Project Zomboid</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(4.25)}</span></div>
                      </div>
                    </Link>

                    <Link href="/palworld" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Palworld" fill className="object-cover" src="/assets/games/palworld.jpeg" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Palworld</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(8.50)}</span></div>
                      </div>
                    </Link>

                    <Link href="/hytale" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Hytale" fill className="object-cover" src="/assets/games/hytale-cover.png" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Hytale</div>
                        <div className="text-[#999] text-xs mt-1">Próximamente</div>
                      </div>
                    </Link>

                    <Link href="/valheim" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Valheim" fill className="object-cover" src="/assets/games/valheim.png" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Valheim</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(5.50)}</span></div>
                      </div>
                    </Link>

                    <Link href="/terraria" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Terraria" fill className="object-cover" src="/assets/games/terraria.jpeg" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Terraria</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">{formatPrice(3.50)}</span></div>
                      </div>
                    </Link>

                    <Link href="/juegos" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] flex-shrink-0 rounded-md bg-[#64189D] flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Otros Juegos</div>
                        <div className="text-[#999] text-xs mt-1">Ver todos los juegos disponibles</div>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Hosting Dropdown */}
            <div className="relative group">
              <Link href="/vps" className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Cloud Hosting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2 shadow-2xl">
                  
                  <Link href="/dominios" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm leading-tight">Registrar un Dominio</div>
                      <div className="text-[#999] text-xs mt-1">Asegura tu presencia en línea</div>
                    </div>
                  </Link>

                  <Link href="/vps" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm leading-tight">VPS Hosting Premium</div>
                      <div className="text-[#999] text-xs mt-1">Servidores virtuales de alto rendimiento</div>
                    </div>
                  </Link>

                  <Link href="/discord-bot" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm leading-tight">Discord Bot Hosting</div>
                      <div className="text-[#999] text-xs mt-1">Mantén tus bots 24/7 en línea</div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Nosotros Dropdown */}
            <div className="relative group">
              <Link href="/nosotros" className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Nosotros
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[40rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-4 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3">
                    
                    <Link href="/nosotros" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Acerca de Nosotros</div>
                      </div>
                    </Link>

                    <Link href="/branding" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Nuestro Branding</div>
                      </div>
                    </Link>

                    <Link href="/afiliados" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Programa de Afiliados</div>
                      </div>
                    </Link>

                    <Link href="/contacto" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Contacto</div>
                      </div>
                    </Link>

                    <Link href="/estado" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Estado de la Red</div>
                      </div>
                    </Link>

                    <Link href="/terminos" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Términos y Condiciones</div>
                      </div>
                    </Link>

                    <Link href="/privacidad" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Políticas de Privacidad</div>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex items-center gap-4">
            
            {/* Currency Selector */}
            <div className="flex bg-[#141414] rounded-lg p-1 border border-white/5">
              <button 
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${currency === 'EUR' ? 'bg-[#64189D] text-white' : 'text-[#888] hover:text-white'}`}
              >
                EUR
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${currency === 'USD' ? 'bg-[#64189D] text-white' : 'text-[#888] hover:text-white'}`}
              >
                USD
              </button>
            </div>

            {/* Login & Panel */}
            <a href="https://clientes.astralixnodes.com" className="hidden lg:flex items-center gap-2 text-white font-bold text-sm hover:text-[#64189D] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
              CLIENTES
            </a>
            
            <a href="https://panel.astralixnodes.com" className="hidden lg:flex bg-[#64189D] text-white rounded-lg px-6 py-2.5 text-sm font-bold hover:bg-[#7b1dc2] transition-colors items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
              PANEL
            </a>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white"
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
        <div className="lg:hidden bg-[#020202] border-t border-white/5 absolute w-full left-0 top-full p-4 flex flex-col gap-4 shadow-xl">
          <Link href="/minecraft" className="text-white font-bold p-2 hover:bg-[#141414] rounded-lg">Minecraft Hosting</Link>
          <Link href="/juegos" className="text-white font-bold p-2 hover:bg-[#141414] rounded-lg">Game Hosting</Link>
          <Link href="/vps" className="text-white font-bold p-2 hover:bg-[#141414] rounded-lg">Cloud Hosting</Link>
          <Link href="/nosotros" className="text-white font-bold p-2 hover:bg-[#141414] rounded-lg">Nosotros</Link>
          <hr className="border-white/5" />
          <div className="flex flex-col gap-2">
            <a href="https://clientes.astralixnodes.com" className="bg-[#141414] text-white text-center rounded-lg p-3 font-bold">Área de Clientes</a>
            <a href="https://panel.astralixnodes.com" className="bg-[#64189D] text-white text-center rounded-lg p-3 font-bold">Game Panel</a>
          </div>
        </div>
      )}
    </header>
  );
}