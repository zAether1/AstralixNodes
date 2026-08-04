'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HolyLocations() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

  const locations = [
    { id: 'miami', name: 'Miami, FL', code: 'US', flag: '🇺🇸', x: 25.5, y: 43, ping: '35ms', pingMax: '60ms', desc: 'Ideal para jugadores de Sudamérica y Centroamérica.' },
    { id: 'dallas', name: 'Dallas, TX', code: 'US', flag: '🇺🇸', x: 21, y: 38, ping: '20ms', pingMax: '45ms', desc: 'Excelente conectividad para todo Estados Unidos y México.' },
    { id: 'frankfurt', name: 'Frankfurt', code: 'DE', flag: '🇩🇪', x: 51.5, y: 32, ping: '15ms', pingMax: '30ms', desc: 'Nuestra ubicación principal para jugadores europeos.' },
    { id: 'sydney', name: 'Sydney', code: 'AU', flag: '🇦🇺', x: 86, y: 76, ping: '20ms', pingMax: '50ms', desc: 'El nodo perfecto para la región de Oceanía.' },
    { id: 'singapore', name: 'Singapur', code: 'SG', flag: '🇸🇬', x: 75, y: 55, ping: '10ms', pingMax: '40ms', desc: 'Conectividad premium para toda la región de Asia.' }
  ]

  return (
    <section className="bg-[#101010] py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#64189D]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider mb-4">
            UBICACIONES <span className="text-[#64189D]">PREMIUM</span>
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Nuestra red global garantiza la latencia más baja posible para ti y tus jugadores, sin importar dónde se encuentren.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3 relative"
          >
            <div className="relative w-full">
              {/* SVG World Map from holy.gg */}
              <img 
                src="/assets/images/world-map.svg" 
                alt="World Map" 
                className="w-full h-auto opacity-60"
                draggable={false}
              />

              {/* Animated Location Dots */}
              {locations.map((loc) => (
                <div 
                  key={loc.id}
                  className="absolute group cursor-pointer z-20"
                  style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                  onMouseEnter={() => setActiveLocation(loc.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    {/* Ping pulse ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#64189D]/30 animate-ping" />
                    {/* Outer glow */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all duration-300 ${activeLocation === loc.id ? 'bg-[#A855F7]/40 scale-150' : 'bg-[#64189D]/20'}`} />
                    {/* Core dot */}
                    <div className={`relative w-3.5 h-3.5 rounded-full border-2 border-[#101010] z-10 transition-all duration-200 ${activeLocation === loc.id ? 'bg-[#A855F7] scale-125' : 'bg-[#64189D]'}`} />
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {activeLocation === loc.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 8, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 whitespace-nowrap shadow-2xl z-50"
                        >
                          <div className="text-white font-bold text-xs flex items-center gap-1.5">
                            <span className="text-base">{loc.flag}</span> {loc.name}
                          </div>
                          <div className="text-[#A855F7] text-[10px] font-semibold mt-0.5">
                            {loc.ping} - {loc.pingMax}
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#1a1a1a]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Locations List */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="w-full lg:w-1/3 flex flex-col gap-2"
          >
            {locations.map((loc) => (
              <motion.div 
                key={loc.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className={`p-4 rounded-xl transition-all duration-300 border cursor-pointer ${activeLocation === loc.id ? 'bg-[#64189D]/10 border-[#64189D]/40 shadow-lg shadow-[#64189D]/5' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05] hover:border-white/10'}`}
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{loc.code}</span>
                    <span className="text-white font-bold text-sm">{loc.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#A855F7] text-xs font-mono font-bold">{loc.ping}</span>
                    <span className="text-white/30 text-xs">-</span>
                    <span className="text-[#A855F7] text-xs font-mono font-bold">{loc.pingMax}</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">
                  {loc.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
