'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-sm leading-tight">Minecraft Hosting</div>
                        <span className="bg-[#64189D] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">POPULAR</span>
                      </div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$4,24</span></div>
                    </div>
                  </Link>

                  <Link href="/dedicado" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-bold text-sm leading-tight">Minecraft Dedicado</div>
                      </div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$21,08</span></div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

            {/* Game Hosting Mega Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Game Hosting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[52rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-4 shadow-2xl">
                  <div className="grid grid-cols-3 gap-3">
                    
                    <Link href="/project-zomboid" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Project Zomboid" fill className="object-cover" src="/holy_assets/assets/images/header-project-zomboid.avif" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Project Zomboid</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$4,25</span></div>
                      </div>
                    </Link>

                    <Link href="/hytale" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Hytale" fill className="object-cover" src="/holy_assets/assets/images/header-hytale.avif" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Hytale</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$9,69</span></div>
                      </div>
                    </Link>

                    <Link href="/terraria" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Terraria" fill className="object-cover" src="/holy_assets/assets/images/header-terraria.avif" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Terraria</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$2,13</span></div>
                      </div>
                    </Link>

                    <Link href="/palworld" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Palworld" fill className="object-cover" src="/holy_assets/assets/images/header-palworld.avif" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Palworld</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$8,50</span></div>
                      </div>
                    </Link>

                    <Link href="/valheim" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                      <div className="w-[60px] h-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <Image alt="Valheim" fill className="object-cover" src="/holy_assets/assets/images/header-valheim.avif" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">Valheim</div>
                        <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$3,19</span></div>
                      </div>
                    </Link>

                    <Link href="/juegos" className="flex rounded-lg bg-[#64189D] hover:bg-[#3A0E5C] transition-colors overflow-hidden">
                      <div className="w-[60px] flex-shrink-0 bg-black/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-black" viewBox="0 0 640 512" fill="currentColor"><path d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1-80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z"></path></svg>
                      </div>
                      <div className="flex flex-col justify-center p-3">
                        <div className="text-black font-bold text-sm leading-tight whitespace-nowrap">Otros Juegos</div>
                        <div className="text-black/60 text-xs mt-0.5">Elige entre +40 juegos.</div>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Hosting */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Cloud Hosting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[22rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-3 flex flex-col gap-2 shadow-2xl">
                  
                  <Link href="/dominios" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm leading-tight">Registrar un Dominio</div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$1,69</span></div>
                    </div>
                  </Link>

                  <Link href="/vps" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm leading-tight">VPS Hosting Premium</div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$6,46</span></div>
                    </div>
                  </Link>

                  <Link href="/discord-bot" className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-[#64189D] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-bold text-sm leading-tight">Discord Bot Hosting</div>
                      <div className="text-[#999] text-xs mt-1">Comenzando en <span className="text-white font-bold">$1,27</span></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nosotros Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-6 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap">
                Nosotros
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[40rem] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                <div className="bg-[#1a1b1b] rounded-xl border border-white/[0.08] p-5 grid grid-cols-4 gap-6 shadow-2xl">
                  
                  <div>
                    <h3 className="text-white font-bold mb-3 text-sm">AstralixNodes</h3>
                    <div className="flex flex-col gap-1">
                      <Link href="/about" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Acerca de Nosotros</div>
                      </Link>
                      <Link href="/branding" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Nuestro Branding</div>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-3 text-sm">Programas</h3>
                    <div className="flex flex-col gap-1">
                      <Link href="/afiliados" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Programa de Afiliados</div>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-3 text-sm">Asistencia</h3>
                    <div className="flex flex-col gap-1">
                      <Link href="/contacto" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Contacto</div>
                      </Link>
                      <Link href="/status" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Estado de la Red</div>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-3 text-sm">Legal</h3>
                    <div className="flex flex-col gap-1">
                      <Link href="/terms" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Términos y Condiciones</div>
                      </Link>
                      <Link href="/privacy" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] transition-colors">
                        <div className="w-6 h-6 flex-shrink-0 text-[#64189D] flex items-center justify-center">
                          <svg className="w-5 h-5 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div className="text-white font-medium text-sm">Política de Privacidad</div>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 py-6 text-white hover:text-[#64189D] transition-colors" aria-label="Preferences">
              <span className="text-sm font-bold">USD</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <Link href="/juegos" className="hidden lg:flex items-center gap-2 bg-[#64189D] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#3A0E5C] hover:text-white transition-colors text-sm uppercase">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
              Crear Servidor
            </Link>
            <div className="relative hidden lg:block">
              <Link href="/login" className="flex items-center py-6">
                <span className="text-[#64189D] text-base font-medium uppercase tracking-[0.08em] no-underline transition-colors hover:text-[#8229C7]">Iniciar Sesión</span>
              </Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white p-2" 
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0a0a0a] border-t border-white/5 p-4 flex flex-col gap-4 shadow-2xl z-50">
          <Link href="/minecraft" className="text-white font-bold py-2 hover:text-[#64189D] border-b border-white/5">Minecraft Hosting</Link>
          <Link href="/juegos" className="text-white font-bold py-2 hover:text-[#64189D] border-b border-white/5">Game Hosting</Link>
          <Link href="/cloud" className="text-white font-bold py-2 hover:text-[#64189D] border-b border-white/5">Cloud Hosting</Link>
          <Link href="/about" className="text-white font-bold py-2 hover:text-[#64189D] border-b border-white/5">Nosotros</Link>
          <Link href="/login" className="text-[#64189D] font-bold py-2">Iniciar Sesión</Link>
        </div>
      )}
    </header>
  );
}