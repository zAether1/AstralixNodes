'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HolyFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0f] pt-20 pb-10 px-6 border-t border-[#64189D]/20">
      <div className="max-w-[87.5rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link className="flex items-center gap-3 mb-6" href="/">
              <Image 
                src="/icons/AstralixNodes.png" 
                alt="AstralixNodes" 
                width={48} 
                height={48} 
                className="rounded-xl"
              />
              <span className="text-white font-black text-2xl tracking-tight">
                Astralix<span className="text-[#64189D]">Nodes</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
              Proveemos soluciones de alojamiento de alto rendimiento para juegos y aplicaciones. 
              Infraestructura premium con protección DDoS avanzada a un precio accesible.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://discord.gg/astralixnodes" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-[#180228] border border-[#64189D]/30 flex items-center justify-center text-white/70 hover:text-white hover:border-[#64189D] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>
              <a href="https://twitter.com/astralixnodes" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-[#180228] border border-[#64189D]/30 flex items-center justify-center text-white/70 hover:text-white hover:border-[#64189D] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Servicios</h4>
            <ul className="space-y-3">
              <li><Link href="/minecraft" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Minecraft Hosting</Link></li>
              <li><Link href="/games" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Game Hosting</Link></li>
              <li><Link href="/vps" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">VPS Cloud</Link></li>
              <li><Link href="/dedicated" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Servidores Dedicados</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Compañía</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Sobre Nosotros</Link></li>
              <li><Link href="/partners" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Partners</Link></li>
              <li><Link href="/contact" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Contacto</Link></li>
              <li><Link href="/blog" className="text-white/50 hover:text-[#A855F7] transition-colors text-sm">Blog & Noticias</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-white/50 hover:text-white transition-colors text-sm">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="text-white/50 hover:text-white transition-colors text-sm">Política de Privacidad</Link></li>
              <li><Link href="/refund" className="text-white/50 hover:text-white transition-colors text-sm">Política de Reembolso</Link></li>
              <li><Link href="/sla" className="text-white/50 hover:text-white transition-colors text-sm">Acuerdo SLA</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} AstralixNodes. Todos los derechos reservados. NO estamos afiliados con Mojang AB.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/60 text-xs font-mono">Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
