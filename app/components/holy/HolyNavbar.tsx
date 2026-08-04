'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const gameItems = [
  { name: 'Minecraft', price: '$2.50', href: '/minecraft', icon: '⛏️' },
  { name: 'Rust', price: '$4.25', href: '/rust', icon: '🔫' },
  { name: 'Terraria', price: '$2.13', href: '/terraria', icon: '⚔️' },
  { name: 'Palworld', price: '$8.50', href: '/palworld', icon: '🌍' },
  { name: 'Valheim', price: '$3.19', href: '/valheim', icon: '🪓' },
  { name: 'ARK', price: '$4.99', href: '/ark', icon: '🦖' },
]

const cloudItems = [
  { name: 'VPS Hosting', desc: 'Servidores virtuales potentes', href: '/vps' },
  { name: 'Dedicated Servers', desc: 'Hardware dedicado exclusivo', href: '/dedicated' },
  { name: 'Discord Bot Hosting', desc: 'Aloja tu bot 24/7', href: '/discord' },
  { name: 'Web Hosting', desc: 'Sitios web rápidos y seguros', href: '/webhosting' },
]

export default function HolyNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(name)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <>
      {/* Top Promo Bar */}
      <div className="sticky top-0 z-50 w-full bg-[#0d0d0d] border-b border-white/5">
        <div className="mx-auto flex max-w-[87.5rem] items-center justify-between px-6 py-2 text-sm">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="rounded-full bg-[#64189D] px-3 py-1 text-xs font-bold text-white whitespace-nowrap">
              <svg className="w-3 h-3 inline-block mr-1.5 align-middle" viewBox="0 0 512 512" fill="currentColor">
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              OFERTA LIMITADA
            </span>
            <Link className="flex items-center gap-1.5 text-white font-medium text-xs md:text-sm no-underline hover:text-[#64189D] transition-colors" href="#pricing">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#64189D]" viewBox="0 0 384 512" fill="currentColor">
                <path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128a64 64 0 1 0-128 0 64 64 0 1 0 128 0zM384 384a64 64 0 1 0-128 0 64 64 0 1 0 128 0z" />
              </svg>
              <span>
                <span className="font-bold text-[#64189D]">15% OFF</span>{' '}
                en tu primer mes con nosotros
              </span>
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-white/60 text-xs font-medium">Todos los sistemas operativos</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky z-40 top-[36px] transition-all duration-300 ${scrolled ? 'bg-[#020202]/95 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-[#020202]'}`}>
        <div className="mx-auto max-w-[87.5rem] px-6">
          <nav className="flex items-center gap-10 h-20">
            {/* Logo */}
            <Link className="flex items-center gap-2.5" href="/">
              <Image
                src="/icons/AstralixNodes.png"
                alt="AstralixNodes"
                width={44}
                height={44}
                className="rounded-lg"
                priority
              />
              <span className="hidden sm:block text-white font-black text-lg tracking-tight">
                Astralix<span className="text-[#64189D]">Nodes</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Minecraft Hosting */}
              <Link
                className="flex items-center gap-1 px-4 py-2 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap rounded-lg hover:bg-white/5"
                href="/minecraft"
              >
                Minecraft Hosting
              </Link>

              {/* Game Hosting Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('games')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap rounded-lg hover:bg-white/5">
                  Game Hosting
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'games' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[48rem] transition-all duration-200 ${activeDropdown === 'games' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <div className="bg-[#141414] rounded-xl border border-white/[0.08] p-4 shadow-2xl shadow-black/50">
                    <div className="grid grid-cols-3 gap-3">
                      {gameItems.map((game) => (
                        <Link key={game.name} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] hover:bg-[#222] transition-all hover:scale-[1.02]" href={game.href}>
                          <div className="w-12 h-12 rounded-lg bg-[#64189D]/10 border border-[#64189D]/20 flex items-center justify-center text-xl flex-shrink-0">
                            {game.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-white font-bold text-sm">{game.name}</div>
                            <div className="text-[#999] text-xs mt-0.5">
                              Desde <span className="text-white font-bold">{game.price}</span>/mes
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      className="flex items-center justify-center gap-2 mt-3 p-3 rounded-lg bg-[#64189D] hover:bg-[#7B22B8] transition-colors text-white font-bold text-sm"
                      href="/games"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 640 512" fill="currentColor">
                        <path d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1-80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z" />
                      </svg>
                      Ver todos los juegos (+40)
                    </Link>
                  </div>
                </div>
              </div>

              {/* Cloud Hosting Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('cloud')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap rounded-lg hover:bg-white/5">
                  Cloud Hosting
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'cloud' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[28rem] transition-all duration-200 ${activeDropdown === 'cloud' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <div className="bg-[#141414] rounded-xl border border-white/[0.08] p-3 shadow-2xl shadow-black/50">
                    {cloudItems.map((item) => (
                      <Link key={item.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors" href={item.href}>
                        <div className="w-10 h-10 rounded-lg bg-[#64189D]/10 border border-[#64189D]/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{item.name}</div>
                          <div className="text-[#888] text-xs">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* About */}
              <Link
                className="flex items-center gap-1 px-4 py-2 text-white font-bold text-sm hover:text-[#64189D] transition-colors whitespace-nowrap rounded-lg hover:bg-white/5"
                href="/about"
              >
                Nosotros
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 ml-auto">
              <Link
                className="hidden lg:flex items-center gap-2 bg-[#64189D] text-white font-bold px-5 py-2.5 rounded-lg hover:bg-[#7B22B8] transition-all text-sm uppercase tracking-wide hover:shadow-lg hover:shadow-[#64189D]/25"
                href="/games"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Crear Servidor
              </Link>
              <Link
                className="hidden lg:block text-[#64189D] text-sm font-semibold uppercase tracking-wider hover:text-[#8B3DC4] transition-colors"
                href="https://panel.astralixnodes.com"
                target="_blank"
              >
                Iniciar Sesión
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-[#0d0d0d] border-l border-white/10 overflow-y-auto transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Image src="/icons/AstralixNodes.png" alt="AstralixNodes" width={36} height={36} className="rounded-lg" />
                <span className="text-white font-black text-lg">Astralix<span className="text-[#64189D]">Nodes</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              <Link href="/minecraft" className="block px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                Minecraft Hosting
              </Link>
              <Link href="/games" className="block px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                Game Hosting
              </Link>
              <Link href="/vps" className="block px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                VPS Hosting
              </Link>
              <Link href="/dedicated" className="block px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                Dedicated Servers
              </Link>
              <Link href="/discord" className="block px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                Discord Bot Hosting
              </Link>
              <Link href="/about" className="block px-4 py-3 text-white font-bold text-base rounded-lg hover:bg-white/5 transition-colors" onClick={() => setMobileOpen(false)}>
                Nosotros
              </Link>
            </div>
            <div className="mt-8 space-y-3">
              <Link
                href="/games"
                className="block w-full text-center bg-[#64189D] text-white font-bold px-5 py-3 rounded-lg hover:bg-[#7B22B8] transition-colors text-sm uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Crear Servidor
              </Link>
              <Link
                href="https://panel.astralixnodes.com"
                target="_blank"
                className="block w-full text-center border border-[#64189D] text-[#64189D] font-bold px-5 py-3 rounded-lg hover:bg-[#64189D]/10 transition-colors text-sm uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
