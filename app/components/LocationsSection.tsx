'use client';
import React, { useEffect, useState } from 'react';

// Coordinates from the original SVG and locations
const locations = [
  { id: 'us-va', name: 'Virginia', countryCode: 'us', continent: 'NA', cx: 274, cy: 175 },
  { id: 'ca-qc', name: 'Quebec', countryCode: 'ca', continent: 'NA', cx: 269, cy: 140 },
  { id: 'us-or', name: 'Oregon', countryCode: 'us', continent: 'NA', cx: 175, cy: 160 },
  { id: 'us-ny', name: 'New York', countryCode: 'us', continent: 'NA', cx: 269, cy: 165 },
  { id: 'us-ut', name: 'Utah', countryCode: 'us', continent: 'NA', cx: 197, cy: 172 },
  { id: 'us-tx', name: 'Texas', countryCode: 'us', continent: 'NA', cx: 230, cy: 192 },
  { id: 'us-ca', name: 'California', countryCode: 'us', continent: 'NA', cx: 168, cy: 185 },
  { id: 'de', name: 'Alemania', countryCode: 'de', continent: 'EU', cx: 502, cy: 152 },
  { id: 'fi', name: 'Finlandia', countryCode: 'fi', continent: 'EU', cx: 540, cy: 132 },
  { id: 'fr', name: 'Francia', countryCode: 'fr', continent: 'EU', cx: 477, cy: 155 },
  { id: 'ar', name: 'Argentina', countryCode: 'ar', continent: 'SA', cx: 346, cy: 391 },
  { id: 'cl', name: 'Chile', countryCode: 'cl', continent: 'SA', cx: 293, cy: 387 },
  { id: 'au', name: 'Australia', countryCode: 'au', continent: 'OC', cx: 865, cy: 368 }
];

// Helper to determine simulated ping based on user timezone
const simulatePing = (userContinent: string, nodeContinent: string) => {
  const isSame = userContinent === nodeContinent;
  let basePing = 0;
  
  if (isSame) {
    basePing = Math.floor(Math.random() * 40) + 15; // 15-55ms
  } else {
    // Inter-continental ping
    if ((userContinent === 'SA' && nodeContinent === 'NA') || (userContinent === 'NA' && nodeContinent === 'SA')) {
      basePing = Math.floor(Math.random() * 40) + 110; // 110-150ms
    } else if ((userContinent === 'EU' && nodeContinent === 'NA') || (userContinent === 'NA' && nodeContinent === 'EU')) {
      basePing = Math.floor(Math.random() * 30) + 90; // 90-120ms
    } else if (userContinent === 'OC' || nodeContinent === 'OC') {
      basePing = Math.floor(Math.random() * 50) + 180; // 180-230ms
    } else {
      basePing = Math.floor(Math.random() * 50) + 150; // default long distance
    }
  }
  return basePing;
};

const getPingColor = (ping: number) => {
  if (ping < 80) return '#4ade80'; // Green
  if (ping < 150) return '#facc15'; // Yellow
  return '#ef4444'; // Red
};

export default function LocationsSection() {
  const [pings, setPings] = useState<Record<string, number>>({});
  const [userContinent, setUserContinent] = useState('NA');
  
  useEffect(() => {
    // Detect continent based on timezone roughly
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let continent = 'NA';
    if (tz.includes('Europe')) continent = 'EU';
    else if (tz.includes('America/Argentina') || tz.includes('America/Santiago') || tz.includes('America/Sao_Paulo') || tz.includes('America/Bogota') || tz.includes('America/Lima')) continent = 'SA';
    else if (tz.includes('Australia') || tz.includes('Pacific')) continent = 'OC';
    
    setUserContinent(continent);
    
    const newPings: Record<string, number> = {};
    locations.forEach(loc => {
      newPings[loc.id] = simulatePing(continent, loc.continent);
    });
    setPings(newPings);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('visible', 'in-view');
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll<HTMLElement>('.reveal, #cobertura [style*="opacity: 0"], #cobertura [style*="opacity:0"]').forEach(el => observer.observe(el));
    
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal, #cobertura [style*="opacity: 0"], #cobertura [style*="opacity:0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'all 0.8s ease-out';
      });
    }, 500);

    return () => observer.disconnect();
  }, []);

  const regions = [
    { title: 'Norteamérica', filter: 'NA' },
    { title: 'Europa', filter: 'EU' },
    { title: 'Sudamérica', filter: 'SA' },
    { title: 'Oceanía', filter: 'OC' }
  ];

  return (
    <section id="cobertura" className="bg-[#191919] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <h2 className="text-4xl md:text-5xl font-black text-center uppercase mb-4">
            <span className="text-white">TE TENEMOS CUBIERTO, </span>
            <span className="text-[#64189D]">EN TODO EL MUNDO.</span>
          </h2>
          <p className="text-[#888] text-sm text-center mb-16 max-w-3xl mx-auto">
            Hoy más 13 ubicaciones globales disponibles para hostear tu servidor al instante.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[18.5rem_1fr] gap-8 items-start">
          <div className="reveal" style={{ opacity: 0, transform: 'translateX(-20px)' }}>
            {regions.map((region, rIdx) => {
              const regionLocs = locations.filter(l => l.continent === region.filter);
              if (regionLocs.length === 0) return null;
              
              return (
                <div key={region.title}>
                  {rIdx > 0 && <hr className="border-[#333] my-3"/>}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-white/50 uppercase font-bold tracking-wider text-xs">{region.title}</h3>
                    <span className="text-white/30 uppercase tracking-wider text-[11px]">Latencia</span>
                  </div>
                  <div>
                    {regionLocs.map(loc => {
                      const ping = pings[loc.id] || 0;
                      const color = ping ? getPingColor(ping) : '#333';
                      return (
                        <div key={loc.id} className="flex items-center rounded-lg transition-colors cursor-pointer hover:bg-white/5 py-1.5 px-2.5 gap-2.5">
                          <img alt={loc.countryCode.toUpperCase()} loading="lazy" width="24" height="17" className="rounded-sm flex-shrink-0" src={`https://flagcdn.com/w40/${loc.countryCode}.png`} />
                          <span className="text-[#E8E6E6] flex-1 truncate text-[13px]">{loc.name}</span>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {ping > 0 ? (
                              <>
                                <span style={{ color }} className="text-xs font-bold font-mono">{ping}ms</span>
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}></div>
                              </>
                            ) : (
                              <span className="text-xs text-white/30">Cargando...</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="relative w-full aspect-[2/1] reveal" style={{ opacity: 0, transform: 'scale(0.95)' }}>
            <svg viewBox="95.85 62.19 827.61 423.74" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <image x="95.85" y="62.19" width="827.61" height="423.74" href="/assets/images/world-map.svg"></image>
              
              {locations.map(loc => {
                const ping = pings[loc.id] || 0;
                const color = ping ? getPingColor(ping) : '#333';
                const rgb = color === '#4ade80' ? '74, 222, 128' : color === '#facc15' ? '250, 204, 21' : '239, 68, 68';
                
                return (
                  <g key={loc.id} className="cursor-pointer">
                    <circle cx={loc.cx} cy={loc.cy} r="8" fill={`rgba(${rgb}, 0.3)`} className="transition-all duration-200">
                      <animate attributeName="r" values="8;11;8" dur="2s" repeatCount="indefinite"></animate>
                      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx={loc.cx} cy={loc.cy} r="4" fill={color} className="transition-all duration-200"></circle>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
