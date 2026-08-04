'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} className="relative bg-black overflow-hidden min-h-[31.25rem] md:min-h-[37.5rem] lg:min-h-[43.75rem]">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        {/* Purple glow top-left */}
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_top_left,rgba(100,24,157,0.15),transparent_60%)]" />
        {/* Purple glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_60%)]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Bottom fade to surface */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      {/* Floating Particles (CSS only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: `rgba(100, 24, 157, ${0.2 + i * 0.05})`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-6 py-20 md:py-28 lg:py-36">
        <div className="max-w-[50rem]">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#64189D]/15 border border-[#64189D]/30 rounded-full px-4 py-1.5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A855F7]" />
              </span>
              <span className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">Premium Hosting</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="hero-title text-white font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Game Server{' '}
                <span className="gradient-text">Hosting</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-lg animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.4s' }}>
                Deploy your game server in seconds with enterprise-grade hardware, DDoS protection, and 24/7 support.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {[
                { icon: '🛡️', text: 'Advanced DDoS Protection' },
                { icon: '⚡', text: 'Instant Server Setup' },
                { icon: '🎮', text: 'Support for 40+ Games' },
                { icon: '🔧', text: 'Full Root Access & Mods' },
                { icon: '🌍', text: 'Global Locations' },
                { icon: '💬', text: '24/7 Expert Support' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#64189D] to-[#8B3DC4] flex items-center justify-center flex-shrink-0 text-sm">
                    {feature.icon}
                  </div>
                  <span className="text-white/80 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                href="#pricing"
                className="btn-primary inline-flex items-center justify-center gap-2 text-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Your Server
              </Link>
              <Link
                href="#features"
                className="btn-outline inline-flex items-center justify-center gap-2 text-center"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '10K+', label: 'Servers Deployed' },
                { value: '<15ms', label: 'Avg Latency' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-white font-black text-2xl">{stat.value}</span>
                  <span className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image / Floating Card on the right (desktop) */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[28rem]">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#64189D]/20 to-[#A855F7]/10 rounded-3xl blur-2xl" />
            <div className="relative glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/icons/AstralixNodes.png" alt="AstralixNodes" width={40} height={40} className="rounded-lg" />
                <div>
                  <p className="text-white font-bold text-sm">AstralixNodes Panel</p>
                  <p className="text-white/40 text-xs">Server Control Dashboard</p>
                </div>
                <div className="ml-auto flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
              </div>
              {/* Fake Terminal */}
              <div className="bg-black/60 rounded-xl p-4 font-mono text-xs space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <span className="text-green-400">$</span>
                  <span className="text-white/80">server start --plan premium</span>
                </div>
                <div className="text-[#A855F7]">✓ Deploying Minecraft server...</div>
                <div className="text-[#A855F7]">✓ Allocating 8GB RAM...</div>
                <div className="text-[#A855F7]">✓ DDoS protection enabled</div>
                <div className="text-green-400">✓ Server online! play.astralixnodes.com</div>
                <div className="flex items-center gap-2 text-white/40">
                  <span className="text-green-400">$</span>
                  <span className="inline-block w-2 h-4 bg-[#A855F7] animate-pulse" />
                </div>
              </div>
              {/* Status bars */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'CPU', value: '24%', color: 'from-green-500 to-green-400' },
                  { label: 'RAM', value: '62%', color: 'from-[#64189D] to-[#A855F7]' },
                  { label: 'Disk', value: '31%', color: 'from-blue-500 to-blue-400' },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">{bar.label}</span>
                      <span className="text-white/80 font-semibold">{bar.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                        style={{ width: bar.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
