'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Proyección Equirectangular para el usuario
const calcUserCoords = (lat: number, lon: number) => {
  const x = 473.98 + (lon * 2.683);
  const y = 309.31 - (lat * 3.115);
  return { cx: x, cy: y };
};

// Coordenadas extraídas directamente de los píxeles reales del SVG vectorial original para garantizar 100% de precisión visual.
const locations = [
  {
    region: 'Norteamérica',
    places: [
      { id: 'us-mia', name: 'Miami', flag: 'us', cx: 269.25, cy: 206.74, endpoint: 'https://dynamodb.us-east-1.amazonaws.com' },
      { id: 'us-nyc', name: 'Nueva York', flag: 'us', cx: 274.06, cy: 168.28, endpoint: 'https://dynamodb.us-east-2.amazonaws.com' },
      { id: 'mx-mex', name: 'Ciudad de México', flag: 'mx', cx: 211.55, cy: 235.59, endpoint: 'https://dynamodb.us-west-1.amazonaws.com' },
    ]
  },
  {
    region: 'Europa',
    places: [
      { id: 'eu-mad', name: 'Madrid', flag: 'es', cx: 468.78, cy: 185.11, endpoint: 'https://dynamodb.eu-south-2.amazonaws.com' },
      { id: 'eu-fra', name: 'Frankfurt', flag: 'de', cx: 502.44, cy: 151.45, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
      { id: 'eu-lhr', name: 'Londres', flag: 'gb', cx: 471.19, cy: 144.24, endpoint: 'https://dynamodb.eu-west-2.amazonaws.com' },
      { id: 'eu-par', name: 'París', flag: 'fr', cx: 480.80, cy: 158.66, endpoint: 'https://dynamodb.eu-west-3.amazonaws.com' },
      { id: 'eu-ams', name: 'Ámsterdam', flag: 'nl', cx: 490.42, cy: 149.05, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
    ]
  },
  {
    region: 'Sudamérica',
    places: [
      { id: 'br-sao', name: 'São Paulo', flag: 'br', cx: 339.00, cy: 360.00, endpoint: 'https://dynamodb.sa-east-1.amazonaws.com' },
    ]
  },
  {
    region: 'Asia / Pacífico',
    places: [
      { id: 'jp-tyo', name: 'Tokio', flag: 'jp', cx: 822.17, cy: 192.32, endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com' },
      { id: 'sg-sin', name: 'Singapur', flag: 'sg', cx: 754.86, cy: 302.90, endpoint: 'https://dynamodb.ap-southeast-1.amazonaws.com' },
      { id: 'au-syd', name: 'Sídney', flag: 'au', cx: 855.83, cy: 423.11, endpoint: 'https://dynamodb.ap-southeast-2.amazonaws.com' },
    ]
  }
];

const allPlaces = locations.flatMap(loc => loc.places.map(p => ({ ...p, regionName: loc.region })));

const getPingColor = (ping: number) => {
  if (ping < 80) return '#4ade80'; 
  if (ping < 150) return '#facc15'; 
  return '#ef4444'; 
};

export default function LocationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pings, setPings] = useState<Record<string, number>>({});
  const [userLoc, setUserLoc] = useState<{ cx: number, cy: number } | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<any>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.latitude && data.longitude) {
          const coords = calcUserCoords(data.latitude, data.longitude);
          setUserLoc({ cx: coords.cx, cy: coords.cy });
        }
      })
      .catch(() => console.log('Location access denied'));

    const measurePings = async () => {
      const newPings: Record<string, number> = {};
      const pingPromises = allPlaces.map(async (place) => {
        try {
          const start = performance.now();
          await fetch(place.endpoint, { mode: 'no-cors', cache: 'no-store' });
          const rtt = Math.round(performance.now() - start);
          newPings[place.id] = Math.max(1, rtt);
        } catch (e) {
          newPings[place.id] = 999; 
        }
      });
      await Promise.allSettled(pingPromises);
      setPings(prev => ({ ...prev, ...newPings }));
    };

    measurePings();
    const pingInterval = setInterval(measurePings, 10000);

    return () => clearInterval(pingInterval);
  }, []);

  // Animación continua de flujo en líneas (Fibra óptica)
  useEffect(() => {
    if (userLoc && containerRef.current) {
      const lines = containerRef.current.querySelectorAll('.fiber-line');
      if (lines.length > 0) {
        // strokeDasharray="5 15" -> total = 20. Moviendo por -20 genera un loop sin fin perfecto
        gsap.to(lines, {
          strokeDashoffset: -20,
          ease: 'none',
          duration: 0.8,
          repeat: -1
        });
      }
    }
  }, [userLoc, pings]); // Se re-aplica si cambia userLoc o se re-renderizan los pings

  useEffect(() => {
    if (containerRef.current) {
      const els = gsap.utils.toArray('.loc-reveal');
      els.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent, place: any, ping: number, color: string) => {
    setActiveTooltip({
      id: place.id, 
      name: place.name, 
      ping, 
      color, 
      region: place.regionName,
      x: e.clientX, 
      y: e.clientY
    });
  };

  const handleMouseLeave = () => setActiveTooltip(null);

  const getLowestPingPlaceId = () => {
    const validPings = Object.entries(pings).filter(([_, val]) => val > 0 && val < 999);
    if (validPings.length === 0) return null;
    return validPings.reduce((min, curr) => curr[1] < min[1] ? curr : min)[0];
  };
  const closestPlaceId = getLowestPingPlaceId();

  return (
    <section id="cobertura" className="bg-[#191919] py-24 px-6 relative" ref={containerRef}>
      <div className="max-w-[87.5rem] mx-auto">
        <div className="loc-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide">
            <span className="text-white">TE TENEMOS CUBIERTO, </span>
            <span className="text-[#64189D]">EN TODO EL MUNDO.</span>
          </h2>
          <p className="text-[#888] mt-4 max-w-2xl mx-auto">
            12 ubicaciones globales estratégicas disponibles para hostear tu servidor al instante.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[18.5rem_1fr] gap-8 items-start relative">
          
          <div className="loc-reveal w-full overflow-hidden">
            {locations.map((loc, idx) => (
              <div key={loc.region}>
                {idx > 0 && <hr className="border-[#333] my-3" />}
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-white/50 uppercase font-bold tracking-wider text-[12px]">{loc.region}</h3>
                  <span className="text-white/30 uppercase tracking-wider text-[11px]">Latencia</span>
                </div>
                <div>
                  {loc.places.map((place) => {
                    const ping = pings[place.id] || 0;
                    const color = ping ? getPingColor(ping) : '#888';

                    return (
                      <div 
                        key={place.id} 
                        className="group flex items-center rounded-lg transition-colors cursor-pointer hover:bg-white/5" 
                        style={{ padding: '6px 10px', gap: '10px' }}
                        onMouseMove={(e) => handleMouseMove(e, allPlaces.find(p => p.id === place.id), ping, color)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img 
                          alt={place.flag.toUpperCase()} 
                          width={24} 
                          height={17} 
                          className="rounded-sm flex-shrink-0 object-cover" 
                          src={`https://flagcdn.com/w40/${place.flag}.png`} 
                        />
                        <span className="text-[#E8E6E6] flex-1 truncate text-[13px] group-hover:text-white transition-colors">{place.name}</span>
                        <div className="flex items-center gap-[6px] flex-shrink-0">
                          {ping > 0 && ping < 999 ? (
                            <span className="font-mono font-bold text-xs" style={{ color }}>{ping} ms</span>
                          ) : ping === 999 ? (
                            <span className="text-red-500 font-mono text-xs">ERR</span>
                          ) : (
                            <span className="text-[#666] font-mono text-xs flex items-center gap-1">
                               <div className="w-1 h-1 rounded-full bg-[#666] animate-bounce"></div>
                               <div className="w-1 h-1 rounded-full bg-[#666] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                               <div className="w-1 h-1 rounded-full bg-[#666] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="loc-reveal flex-1 w-full bg-[#180228] border border-white/5 rounded-3xl overflow-hidden relative shadow-[inset_0_0_50px_rgba(100,24,157,0.1)]">
            <svg viewBox="95.85 62.19 827.61 423.74" className="w-full h-auto aspect-[2/1]" preserveAspectRatio="xMidYMid meet">
              <image x="95.85" y="62.19" width="827.61" height="423.74" href="/assets/images/world-map.svg"></image>
              
              {userLoc && allPlaces.map(place => {
                const ping = pings[place.id] || 0;
                if (!ping || ping === 999) return null;
                
                const midX = (userLoc.cx + place.cx) / 2;
                const midY = Math.min(userLoc.cy, place.cy) - 60; 
                const pathData = `M ${userLoc.cx} ${userLoc.cy} Q ${midX} ${midY} ${place.cx} ${place.cy}`;
                
                const isClosest = place.id === closestPlaceId;
                const strokeColor = isClosest ? '#4ade80' : '#64189D';
                const opacityLine = isClosest ? '0.6' : '0.2';
                
                return (
                  <g key={`line-${place.id}`}>
                    <path d={pathData} fill="none" stroke={strokeColor} strokeWidth="1" opacity={opacityLine} />
                    <path 
                      className="fiber-line"
                      d={pathData} 
                      fill="none" 
                      stroke={strokeColor} 
                      strokeWidth="2" 
                      opacity={isClosest ? "0.9" : "0.4"}
                      strokeDasharray="5 15"
                      strokeDashoffset="0"
                      style={{ filter: `drop-shadow(0 0 5px ${strokeColor})` }}
                    />
                  </g>
                );
              })}

              {allPlaces.map(place => {
                const ping = pings[place.id] || 0;
                const color = ping ? getPingColor(ping) : '#64189D';
                const isClosest = place.id === closestPlaceId;
                
                return (
                  <g 
                    key={place.id} 
                    className="cursor-pointer map-node group"
                    onMouseMove={(e) => handleMouseMove(e, place, ping, color)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <circle cx={place.cx} cy={place.cy} r="20" fill="transparent" />
                    
                    {isClosest && (
                       <circle cx={place.cx} cy={place.cy} r="12" fill={color} opacity="0.3">
                          <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                       </circle>
                    )}

                    <circle 
                      cx={place.cx} 
                      cy={place.cy} 
                      r="4" 
                      fill={color} 
                      className="transition-all duration-300 group-hover:r-[6px]" 
                      style={{ filter: ping ? `drop-shadow(0 0 8px ${color})` : 'none' }}
                    />
                  </g>
                );
              })}

              {userLoc && (
                <g className="user-node">
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="35" fill="url(#userGlow)" opacity="0.8">
                     <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="8" fill="none" stroke="#ffffff" strokeWidth="1.5">
                    <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="8" fill="none" stroke="#ffffff" strokeWidth="1.5">
                    <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite" begin="1s"/>
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" begin="1s"/>
                  </circle>

                  <circle cx={userLoc.cx} cy={userLoc.cy} r="6" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 10px #ffffff)' }} />
                  
                  <defs>
                     <radialGradient id="userGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                     </radialGradient>
                  </defs>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {activeTooltip && (
        <div 
          className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-[120%] pb-3 transition-opacity duration-150"
          style={{ left: activeTooltip.x, top: activeTooltip.y }}
        >
          <div className="bg-[#180228] border border-[#64189D]/50 shadow-[0_10px_30px_rgba(100,24,157,0.5)] rounded-xl p-4 w-[14rem] relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#64189D] opacity-30 blur-[20px] rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#180228] border-b border-r border-[#64189D]/50 transform rotate-45"></div>
            
            <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
              <h4 className="text-white font-black text-[13px] uppercase tracking-wider">{activeTooltip.name}</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888] uppercase tracking-wider">Región:</span>
                <span className="text-white font-medium">{activeTooltip.region}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888] uppercase tracking-wider">Ping:</span>
                <span className="font-mono font-bold" style={{ color: activeTooltip.color, textShadow: `0 0 10px ${activeTooltip.color}80` }}>
                  {activeTooltip.ping > 0 && activeTooltip.ping < 999 ? `${activeTooltip.ping} ms` : 'Midiendo'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
