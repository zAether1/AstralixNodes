'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const locations = [
  {
    region: 'Norteamérica',
    places: [
      { name: 'Virginia', flag: 'us', ping: '10' },
      { name: 'Quebec', flag: 'ca', ping: '25' },
      { name: 'Oregon', flag: 'us', ping: '40' },
      { name: 'New York', flag: 'us', ping: '15' },
      { name: 'Utah', flag: 'us', ping: '45' },
      { name: 'Texas', flag: 'us', ping: '35' },
      { name: 'California', flag: 'us', ping: '50' }
    ]
  },
  {
    region: 'Europa',
    places: [
      { name: 'Alemania', flag: 'de', ping: '85' },
      { name: 'Finlandia', flag: 'fi', ping: '105' },
      { name: 'Francia', flag: 'fr', ping: '90' }
    ]
  },
  {
    region: 'Sudamérica',
    places: [
      { name: 'Argentina', flag: 'ar', ping: '130' },
      { name: 'Chile', flag: 'cl', ping: '120' }
    ]
  },
  {
    region: 'Oceanía',
    places: [
      { name: 'Australia', flag: 'au', ping: '210' }
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
                      <img 
                        alt={place.flag.toUpperCase()} 
                        width={24} 
                        height={17} 
                        className="rounded-sm flex-shrink-0" 
                        src={`https://flagcdn.com/w40/${place.flag}.png`} 
                      />
                      <span className="text-[#E8E6E6] flex-1 truncate text-[13px]">{place.name}</span>
                      <div className="flex items-center gap-[6px] flex-shrink-0">
                        <span className="text-[12px] font-mono text-white/50">{place.ping}ms</span>
                        <div className="flex items-end gap-[2px]">
                          <div className={`w-1 h-[6px] rounded-sm ${Number(place.ping) < 150 ? (Number(place.ping) < 50 ? 'bg-[#28ca42]' : 'bg-[#64189D]') : 'bg-white/20'}`}></div>
                          <div className={`w-1 h-[10px] rounded-sm ${Number(place.ping) < 100 ? (Number(place.ping) < 50 ? 'bg-[#28ca42]' : 'bg-[#64189D]') : 'bg-white/20'}`}></div>
                          <div className={`w-1 h-[14px] rounded-sm ${Number(place.ping) < 50 ? 'bg-[#28ca42]' : 'bg-white/20'}`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="loc-reveal relative w-full aspect-[2/1] flex items-center justify-center">
            <svg viewBox="0 0 1010 510" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <image x="0" y="0" width="1010" height="510" href="/holy_assets/assets/images/world-map.svg" opacity="0.5"></image>
              {[
                {cx: 230, cy: 175, label: 'Virginia'},
                {cx: 220, cy: 140, label: 'Quebec'},
                {cx: 140, cy: 165, label: 'Oregon'},
                {cx: 225, cy: 160, label: 'New York'},
                {cx: 165, cy: 170, label: 'Utah'},
                {cx: 195, cy: 195, label: 'Texas'},
                {cx: 130, cy: 180, label: 'California'},
                {cx: 495, cy: 150, label: 'Alemania'},
                {cx: 530, cy: 125, label: 'Finlandia'},
                {cx: 480, cy: 160, label: 'Francia'},
                {cx: 310, cy: 370, label: 'Argentina'},
                {cx: 285, cy: 360, label: 'Chile'},
                {cx: 870, cy: 370, label: 'Australia'}
              ].map((pos, i) => (
                <g key={i} className="cursor-pointer">
                  <circle cx={pos.cx} cy={pos.cy} r="12" fill="rgba(100,24,157,0.25)">
                    <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`}></animate>
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`}></animate>
                  </circle>
                  <circle cx={pos.cx} cy={pos.cy} r="4" fill="#64189D"></circle>
                  <circle cx={pos.cx} cy={pos.cy} r="1.5" fill="#fff"></circle>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
