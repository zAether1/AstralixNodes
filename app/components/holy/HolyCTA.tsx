'use client'

import React from 'react'
import Link from 'next/link'

export default function HolyCTA() {
  return (
    <section className="relative bg-[#180228] py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/assets/images/bg-grid.png')] opacity-10 bg-repeat" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#64189D]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-6 leading-tight">
          ¿LISTO PARA COMENZAR TU <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#64189D]">
            NUEVA AVENTURA?
          </span>
        </h2>
        
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10">
          Únete a miles de jugadores y creadores que ya confían en AstralixNodes. Despliega tu servidor hoy mismo en cuestión de segundos y sin complicaciones.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/minecraft"
            className="w-full sm:w-auto bg-gradient-to-r from-[#64189D] to-[#8B3DC4] text-white font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#64189D]/40 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Ver Planes
          </Link>
          
          <Link 
            href="https://discord.gg/astralixnodes"
            target="_blank"
            className="w-full sm:w-auto bg-[#13111a] border border-[#64189D]/30 text-white font-bold px-8 py-4 rounded-xl uppercase tracking-wider text-sm transition-all duration-300 hover:bg-[#1a1625] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
            </svg>
            Comunidad de Discord
          </Link>
        </div>
      </div>
    </section>
  )
}
