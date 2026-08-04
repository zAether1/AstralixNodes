'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

export default function HolyHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const features = [
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 576 512" fill="white">
          <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80z" opacity=".4" />
          <path d="M0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96z" />
        </svg>
      ),
      text: <>Soporte para <strong className="font-bold text-white">Java &amp; Bedrock</strong>.</>,
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
          <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z" />
        </svg>
      ),
      text: <>Protección <strong className="font-bold text-white">Anti-DDoS</strong> avanzada.</>,
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 640 512" fill="white">
          <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96l-214.1 0C9.6 320 0 310.4 0 298.7zM320 320c-35.3 0-64-28.7-64-64c0-35.3 28.7-64 64-64c35.3 0 64 28.7 64 64c0 35.3-28.7 64-64 64z" />
        </svg>
      ),
      text: <>Slots <strong className="font-bold text-white">ilimitados</strong>.</>,
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 576 512" fill="white">
          <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2z" opacity=".4" />
          <path d="M17 201.8L45.9 215l218.6 101c14.9 6.9 32.1 6.9 47 0L530.1 215l28.9-13.4c8.5 3.9 17 12.4 17 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L77.9 245.2l-60.9-28.2C8.5 213.1 0 204.6 0 195.2c0-8.4 6.8-14.4 17-16.5v23.1z" />
        </svg>
      ),
      text: <>Todas las <strong className="font-bold text-white">versiones y modpacks</strong>.</>,
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" opacity=".4" />
          <path d="M256 51.7c3.6 0 7.1 1.8 12.1 6.3c5.1 4.7 10.5 11.7 15.8 21c10.2 17.9 19 42.4 25.2 71l-106.2 0c6.2-28.6 15-53.1 25.2-71c5.3-9.3 10.8-16.3 15.8-21c5-4.6 8.5-6.3 12.1-6.3z" />
        </svg>
      ),
      text: <>Subdominio <strong className="font-bold text-white">.astralixnodes.com</strong> sin puerto.</>,
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 288 512" fill="white">
          <path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5l69 0c11.5 0 22.7 3.4 32.3 9.7c4.8 3.2 11.2 2.6 15.2-1.5l20.1-20.1c5.2-5.2 4.4-14-1.6-18.2C228 101.5 208.5 96 188.5 96L184 96l0-40c0-13.3-10.7-24-24-24l-32 0c-13.3 0-24 10.7-24 24l0 40l-5.5 0C56.6 96 24 130.7 24 173.5c0 33 21.1 62.3 52.5 71.4l108 31.6c12.5 3.7 21.2 15.3 21.2 28.3c0 16.3-13.2 29.5-29.5 29.5l-66.8 0" opacity=".4" />
          <path d="M144 0c-13.3 0-24 10.7-24 24l0 32.2c-36.2 4-64.4 34.2-64.4 71.3c0 33 21.1 62.3 52.5 71.4l108 31.6c12.5 3.7 21.2 15.3 21.2 28.3c0 16.3-13.2 29.5-29.5 29.5L140.9 288.3" />
        </svg>
      ),
      text: <>Precios desde <strong className="font-bold text-white">$0.95/gb/mes</strong>.</>,
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 640 512" fill="white">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
        </svg>
      ),
      text: <>Confiado por <strong className="font-bold text-white">+150</strong> creadores.</>,
      href: '/about',
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 448 512" fill="white">
          <path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-320c0-53-43-96-96-96L96 0z" opacity=".4" />
          <path d="M176 64L96 64C69.5 64 48 85.5 48 112l0 48 128 0 0-96zm0 160L48 224l0 176c0 26.5 21.5 48 48 48l80 0 0-224z" />
        </svg>
      ),
      text: <><strong className="font-bold text-white">+500</strong> guías y tutoriales.</>,
      href: '/faq',
    },
  ]

  return (
    <section className="relative bg-[#180228] overflow-hidden min-h-[31.25rem] md:min-h-[37.5rem] lg:min-h-[43.75rem]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 lg:hidden">
          <img
            alt="Minecraft characters - AstralixNodes servers"
            className="object-cover object-center w-full h-full"
            src="/assets/images/hero-minecraft-poster.avif"
          />
        </div>
        <video
          ref={videoRef}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-[70%_center]"
          muted
          loop
          playsInline
          preload="none"
          poster="/assets/images/hero-minecraft-poster.avif"
        >
          <source src="/assets/videos/hero-minecraft.webm" type="video/webm" />
          <source src="/assets/videos/hero-minecraft.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#180228]/80 via-[#180228]/70 to-[#180228] lg:bg-gradient-to-r lg:from-[#180228]/95 lg:via-[#180228]/75 lg:to-transparent" />
        {/* Glow effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#64189D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#64189D]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[87.5rem] mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="max-w-[43.75rem]">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-[#64189D] text-sm font-medium uppercase tracking-[0.15em] animate-fade-in">
                PREMIUM GAME HOSTING
              </p>
              <h1 className="text-white font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.05em] leading-[1.1] animate-fade-in-up">
                MINECRAFT<br />
                <span className="text-[#64189D]">HOSTING</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {features.map((feature, i) => {
                const content = (
                  <div className={`flex items-center gap-3 ${feature.href ? 'group' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#64189D] flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-white/90 text-sm whitespace-nowrap">{feature.text}</span>
                    {feature.href && (
                      <svg className="w-3 h-3 text-[#64189D] flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                )
                if (feature.href) {
                  return <Link key={i} href={feature.href} className="group">{content}</Link>
                }
                return <div key={i}>{content}</div>
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
              <Link
                className="group flex items-center bg-[#64189D] hover:bg-[#7B22B8] transition-all duration-300 rounded-lg overflow-hidden shadow-lg shadow-[#64189D]/20 hover:shadow-[#64189D]/40"
                href="/minecraft"
              >
                <span className="flex items-center justify-center bg-white/10 px-4 self-stretch">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 20h20v-4H2m2-2h16V6H4m4-4h8v2H8z" />
                  </svg>
                </span>
                <span className="px-5 py-3">
                  <span className="block text-white/80 text-xs">Adquirir un</span>
                  <span className="block text-white font-black text-sm uppercase tracking-wide">SERVIDOR DE MINECRAFT</span>
                </span>
                <span className="flex items-center justify-center px-4 self-stretch">
                  <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link
                className="group flex items-center gap-2 text-white/70 hover:text-[#64189D] transition-all text-sm font-medium border-b border-white/20 hover:border-[#64189D]/50 pb-0.5"
                href="/about"
              >
                Acerca de AstralixNodes
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
