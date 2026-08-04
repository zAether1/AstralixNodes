'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Minecraft Hosting', href: '#pricing' },
  { label: 'Game Hosting', href: '#games' },
  { label: 'Features', href: '#features' },
  { label: 'Locations', href: '#locations' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
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

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-[#180228] via-[#64189D] to-[#180228] py-2 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
        <p className="text-xs sm:text-sm font-medium text-white relative z-10">
          🚀 <span className="font-bold text-[#C084FC]">15% OFF</span> your first month with us —{' '}
          <Link href="#pricing" className="underline underline-offset-2 hover:text-[#C084FC] transition-colors">
            Get Started Now
          </Link>
        </p>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg shadow-[#64189D]/5 border-b border-[#64189D]/10'
            : 'bg-[#020203]'
        }`}
      >
        <div className="mx-auto max-w-[87.5rem] px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/icons/AstralixNodes.png"
                alt="AstralixNodes"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110"
                priority
              />
              <span className="hidden sm:block text-white font-bold text-lg tracking-tight">
                Astralix<span className="text-[#A855F7]">Nodes</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/80 font-semibold text-sm hover:text-[#C084FC] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#64189D] to-[#A855F7] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="#pricing"
                className="flex items-center gap-2 bg-gradient-to-r from-[#64189D] to-[#8B3DC4] text-white font-bold px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#64189D]/30 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Server
              </Link>
              <Link
                href="#"
                className="text-[#C084FC] text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#0a0a0f] border-l border-[#64189D]/20 p-6 animate-slide-down overflow-y-auto">
            <div className="flex justify-end mb-8">
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white font-semibold text-lg hover:text-[#C084FC] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-6 border-t border-white/10">
                <Link
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-[#64189D] to-[#8B3DC4] text-white font-bold px-6 py-3 rounded-lg text-sm uppercase tracking-wider"
                >
                  Create Server
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}