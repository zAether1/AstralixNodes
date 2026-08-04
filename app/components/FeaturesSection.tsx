'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const games = [
  { name: 'Minecraft', icon: '/icons/minecraft-icon.webp', price: '$2.50', href: '#pricing', popular: true },
  { name: 'Rust', icon: '/icons/rust-icon.webp', price: '$8.50', href: '#pricing' },
  { name: 'ARK: SE', icon: '/icons/ark-icon.webp', price: '$9.99', href: '#pricing' },
  { name: 'Valheim', icon: '/icons/valheim-icon.webp', price: '$4.25', href: '#pricing' },
  { name: 'Garry\'s Mod', icon: '/icons/gmod-icon.webp', price: '$5.00', href: '#pricing' },
  { name: 'CS2', icon: '/icons/cs2-icon.webp', price: '$6.00', href: '#pricing' },
]

const features = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Instant Deployment',
    description: 'Your server is up and running within seconds of purchase. No waiting, no setup delays.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'DDoS Protection',
    description: 'Enterprise-grade protection against volumetric and application layer attacks, keeping your server safe 24/7.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    title: 'Premium Hardware',
    description: 'AMD Ryzen 9 7950X & Intel i9-13900K processors with NVMe SSDs and DDR5 RAM for maximum performance.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Custom Control Panel',
    description: 'Intuitive panel to manage your server, install mods, configure plugins, and monitor performance in real-time.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: 'Automatic Backups',
    description: 'Scheduled backups with one-click restore. Never worry about losing your world or configuration again.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '99.9% Uptime SLA',
    description: 'We guarantee near-perfect uptime backed by our Service Level Agreement. Your server stays online, always.',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.feature-card').forEach((card, i) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)'
            }, i * 80)
          })
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative bg-[#0a0a0f] py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(100,24,157,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative max-w-[87.5rem] mx-auto px-6">
        {/* Games Showcase */}
        <div id="games" className="mb-24 scroll-mt-28">
          <div className="text-center mb-12">
            <p className="text-[#A855F7] text-sm font-semibold uppercase tracking-widest mb-3">Game Hosting</p>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tight">
              Choose Your <span className="gradient-text">Game</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              We support 40+ games with optimized configurations, one-click mod installation, and automatic updates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map((game) => (
              <Link
                key={game.name}
                href={game.href}
                className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#13111a] border border-[#64189D]/10 hover:border-[#64189D]/30 transition-all duration-300 hover:-translate-y-1"
              >
                {game.popular && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#64189D] to-[#A855F7] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1a1625] flex items-center justify-center">
                  <Image
                    src={game.icon}
                    alt={game.name}
                    width={56}
                    height={56}
                    className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">{game.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    From <span className="text-[#C084FC] font-semibold">{game.price}</span>/mo
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 text-[#A855F7] hover:text-[#C084FC] font-semibold text-sm transition-colors"
            >
              View All 40+ Supported Games
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="text-center mb-14">
          <p className="text-[#A855F7] text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tight">
            Premium <span className="gradient-text">Features</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Everything you need to run your game server at the highest level, included in every plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group p-6 rounded-2xl bg-[#13111a] border border-[#64189D]/10 hover:border-[#64189D]/25 transition-all duration-300 card-hover"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.5s ease-out' }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64189D]/20 to-[#A855F7]/10 flex items-center justify-center text-[#A855F7] mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
