'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function HolyHardware() {
  const stats = [
    { title: '99.99%', sub: 'SLA Uptime 2026', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { title: '+200', sub: 'Creadores de Contenido', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
    { title: '+150.000', sub: 'Servidores Alojados', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><path d="M6 6.5h.01M6 17.5h.01"/></svg> },
    { title: '+8', sub: 'Años a tu servicio', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { title: '+80', sub: 'Nodos operando', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
    { title: '+15.000', sub: 'Miembros en Discord', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  ]

  return (
    <section className="bg-[#101010] py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Terminal / Hardware Details */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[#64189D]/5 bg-[#0a0a0a]"
          >
            <div className="bg-[#1a1a1a] px-5 py-3.5 flex items-center border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
              </div>
              <span className="ml-5 text-white/50 text-xs font-mono">
                ~ root@astralixnodes-sys-01
              </span>
            </div>
            <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-white/80">
              <div className="text-[#A855F7] mb-2">$ neofetch</div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="hidden sm:block text-[#64189D] font-black whitespace-pre">
{`   _____          __                .__.__        
  /  _  \\   /  |_  ___________  |  |__|__  ___
 /  /_\\  \\  \\   __\\/  _ \\_  __ \\ |  |  \\  \\/  /
/    |    \\  |  | (  <_> )  | \\/ |  |  |>    < 
\\____|__  /  |__|  \\____/|__|    |__|__/__/\\_ \\
        \\/                                   \\/`}
                </div>
                <div>
                  <p><span className="text-[#A855F7] font-bold">OS:</span> Linux Debian 12 (bookworm)</p>
                  <p><span className="text-[#A855F7] font-bold">Host:</span> AstralixNodes Enterprise Gen4</p>
                  <p><span className="text-[#A855F7] font-bold">Kernel:</span> 6.1.0-17-amd64</p>
                  <p><span className="text-[#A855F7] font-bold">Uptime:</span> 1460 days, 23 hours, 45 mins</p>
                  <p><span className="text-[#A855F7] font-bold">CPU:</span> AMD Ryzen™ 9 7950X / 7950X3D</p>
                  <p><span className="text-[#A855F7] font-bold">Memory:</span> 128GB DDR5 ECC @ 5200MHz</p>
                  <p><span className="text-[#A855F7] font-bold">Disk:</span> 2x 2TB NVMe SSD PCIe 4.0 (RAID 1)</p>
                  <p><span className="text-[#A855F7] font-bold">Network:</span> 10Gbps Uplink / Path.net DDoS</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-white">
              NUESTRAS <span className="text-[#64189D]">ESTADÍSTICAS</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-lg">
              Estos son solo algunos de nuestros increíbles números, y seguimos esforzándonos cada día para superarlos. Hardware de primer nivel para tus proyectos.
            </p>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-[#13111a] rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:border-[#64189D]/30 transition-colors"
              >
                  <div className="w-12 h-12 rounded-full bg-[#180228] border border-[#64189D]/20 flex items-center justify-center flex-shrink-0 text-[#A855F7]">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-white font-black text-xl leading-tight">
                      {stat.title}
                    </div>
                    <div className="text-white/50 text-xs mt-1 font-medium">
                      {stat.sub}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
