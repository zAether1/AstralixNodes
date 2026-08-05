'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const locations = [
  {
    region: 'Norteamérica',
    places: [
      { name: 'Virginia', flag: 'us' },
      { name: 'Quebec', flag: 'ca' },
      { name: 'Oregon', flag: 'us' },
      { name: 'New York', flag: 'us' },
      { name: 'Utah', flag: 'us' },
      { name: 'Texas', flag: 'us' },
      { name: 'California', flag: 'us' }
    ]
  },
  {
    region: 'Europa',
    places: [
      { name: 'Alemania', flag: 'de' },
      { name: 'Finlandia', flag: 'fi' },
      { name: 'Francia', flag: 'fr' }
    ]
  },
  {
    region: 'Sudamérica',
    places: [
      { name: 'Argentina', flag: 'ar' },
      { name: 'Chile', flag: 'cl' }
    ]
  },
  {
    region: 'Oceanía',
    places: [
      { name: 'Australia', flag: 'au' }
    ]
  }
];

export default function LocationsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.loc-reveal',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="cobertura" ref={container} className="bg-[#191919] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="loc-reveal">
          <h2 className="text-4xl md:text-5xl font-black text-center uppercase mb-4">
            <span className="text-white">TE TENEMOS CUBIERTO, </span>
            <span className="text-[#64189D]">EN TODO EL MUNDO.</span>
          </h2>
          <p className="text-[#888] text-sm text-center mb-16 max-w-3xl mx-auto">
            Hoy más 13 ubicaciones globales disponibles para hostear tu servidor al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[18.5rem_1fr] gap-8 items-start">
          <div className="loc-reveal">
            {locations.map((loc, idx) => (
              <div key={loc.region}>
                {idx > 0 && <hr className="border-[#333] my-3" />}
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-white/50 uppercase font-bold tracking-wider text-[12px]">{loc.region}</h3>
                  <span className="text-white/30 uppercase tracking-wider text-[11px]">Latencia</span>
                </div>
                <div>
                  {loc.places.map((place, i) => (
                    <div key={i} className="flex items-center rounded-lg transition-colors cursor-pointer hover:bg-white/5" style={{ padding: '6px 10px', gap: '10px' }}>
                      <Image 
                        alt={place.flag.toUpperCase()} 
                        width={24} 
                        height={17} 
                        className="rounded-sm flex-shrink-0" 
                        src={`https://flagcdn.com/w40/${place.flag}.png`} 
                      />
                      <span className="text-[#E8E6E6] flex-1 truncate text-[13px]">{place.name}</span>
                      <div className="flex items-center gap-[6px] flex-shrink-0"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="loc-reveal relative w-full aspect-[2/1]">
            <svg viewBox="95.85 62.19 827.61 423.74" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <image x="95.85" y="62.19" width="827.61" height="423.74" href="/holy_assets/assets/images/world-map.svg"></image>
              {/* Note: In a real component we'd map coordinates from the data, but for this reproduction we can just keep the exact SVG positions. */}
              {[
                {cx: 274, cy: 175}, {cx: 269, cy: 140}, {cx: 175, cy: 160}, {cx: 269, cy: 165},
                {cx: 197, cy: 172}, {cx: 230, cy: 192}, {cx: 168, cy: 185}, {cx: 502, cy: 152},
                {cx: 540, cy: 132}, {cx: 477, cy: 155}, {cx: 346, cy: 391}, {cx: 293, cy: 387},
                {cx: 865, cy: 368}
              ].map((pos, i) => (
                <g key={i} className="cursor-pointer">
                  <circle cx={pos.cx} cy={pos.cy} r="8" fill="rgba(100,24,157,0.3)" className="transition-all duration-200">
                    <animate attributeName="r" values="8;11;8" dur="2s" repeatCount="indefinite"></animate>
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite"></animate>
                  </circle>
                  <circle cx={pos.cx} cy={pos.cy} r="4" fill="#64189D" className="transition-all duration-200"></circle>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
