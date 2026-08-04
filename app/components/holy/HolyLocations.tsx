'use client'

import React, { useState } from 'react'

export default function HolyLocations() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

  const locations = [
    { id: 'miami', name: 'Miami, FL', flag: '🇺🇸', x: 26, y: 44, ping: '35ms - 60ms', desc: 'Ideal para jugadores de Sudamérica y Centroamérica.' },
    { id: 'dallas', name: 'Dallas, TX', flag: '🇺🇸', x: 22, y: 42, ping: '20ms - 45ms', desc: 'Excelente conectividad para todo Estados Unidos y México.' },
    { id: 'frankfurt', name: 'Frankfurt', flag: '🇩🇪', x: 50, y: 32, ping: '15ms - 30ms', desc: 'Nuestra ubicación principal para jugadores europeos.' },
    { id: 'sydney', name: 'Sydney', flag: '🇦🇺', x: 86, y: 78, ping: '20ms - 50ms', desc: 'El nodo perfecto para la región de Oceanía.' },
    { id: 'singapore', name: 'Singapur', flag: '🇸🇬', x: 75, y: 58, ping: '10ms - 40ms', desc: 'Conectividad premium para toda la región de Asia.' }
  ]

  return (
    <section className="bg-[#101010] py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider mb-4">
            UBICACIONES <span className="text-[#64189D]">PREMIUM</span>
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Nuestra red global garantiza la latencia más baja posible para ti y tus jugadores, sin importar dónde se encuentren.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Map */}
          <div className="w-full lg:w-2/3 relative">
            <div className="relative aspect-[2/1] w-full bg-[url('/assets/images/world-map.svg')] bg-no-repeat bg-center bg-contain opacity-80">
              {locations.map((loc) => (
                <div 
                  key={loc.id}
                  className="absolute group cursor-pointer"
                  style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                  onMouseEnter={() => setActiveLocation(loc.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-4 h-4 rounded-full bg-[#64189D] border-2 border-[#101010] relative z-10 transition-transform ${activeLocation === loc.id ? 'scale-150 bg-[#A855F7]' : ''}`} />
                    <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#64189D] animate-ping opacity-75" />
                    
                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#180228] border border-[#64189D]/30 rounded-lg p-3 whitespace-nowrap shadow-xl transition-all duration-200 ${activeLocation === loc.id ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                      <div className="text-white font-bold text-sm flex items-center gap-2">
                        {loc.flag} {loc.name}
                      </div>
                      <div className="text-[#A855F7] text-xs font-semibold mt-1">
                        Ping est. {loc.ping}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#180228]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locations List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {locations.map((loc) => (
              <div 
                key={loc.id}
                className={`p-4 rounded-xl transition-all duration-300 border ${activeLocation === loc.id ? 'bg-[#64189D]/10 border-[#64189D]/50 shadow-lg shadow-[#64189D]/5 translate-x-2' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>{loc.flag}</span>
                    {loc.name}
                  </div>
                  <div className="text-[#A855F7] text-xs font-mono font-bold bg-[#64189D]/10 px-2 py-1 rounded">
                    {loc.ping}
                  </div>
                </div>
                <p className="text-white/50 text-xs">
                  {loc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
