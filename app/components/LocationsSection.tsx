'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    region: 'Norteamérica',
    places: [
      { id: 'us-va', name: 'Virginia', flag: 'us', cx: 274, cy: 175, endpoint: 'https://dynamodb.us-east-1.amazonaws.com' },
      { id: 'ca-qc', name: 'Quebec', flag: 'ca', cx: 269, cy: 140, endpoint: 'https://dynamodb.ca-central-1.amazonaws.com' },
      { id: 'us-or', name: 'Oregon', flag: 'us', cx: 175, cy: 160, endpoint: 'https://dynamodb.us-west-2.amazonaws.com' },
      { id: 'us-ny', name: 'New York', flag: 'us', cx: 269, cy: 165, endpoint: 'https://dynamodb.us-east-2.amazonaws.com' },
      { id: 'us-ut', name: 'Utah', flag: 'us', cx: 197, cy: 172, endpoint: 'https://dynamodb.us-west-1.amazonaws.com' },
      { id: 'us-tx', name: 'Texas', flag: 'us', cx: 230, cy: 192, endpoint: 'https://dynamodb.us-east-2.amazonaws.com' },
      { id: 'us-ca', name: 'California', flag: 'us', cx: 168, cy: 185, endpoint: 'https://dynamodb.us-west-1.amazonaws.com' }
    ]
  },
  {
    region: 'Europa',
    places: [
      { id: 'de-de', name: 'Alemania', flag: 'de', cx: 502, cy: 152, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
      { id: 'fi-fi', name: 'Finlandia', flag: 'fi', cx: 540, cy: 132, endpoint: 'https://dynamodb.eu-north-1.amazonaws.com' },
      { id: 'fr-fr', name: 'Francia', flag: 'fr', cx: 477, cy: 155, endpoint: 'https://dynamodb.eu-west-3.amazonaws.com' }
    ]
  },
  {
    region: 'Sudamérica',
    places: [
      { id: 'ar-ar', name: 'Argentina', flag: 'ar', cx: 346, cy: 391, endpoint: 'https://dynamodb.sa-east-1.amazonaws.com' },
      { id: 'cl-cl', name: 'Chile', flag: 'cl', cx: 293, cy: 387, endpoint: 'https://dynamodb.sa-east-1.amazonaws.com' }
    ]
  },
  {
    region: 'Oceanía',
    places: [
      { id: 'au-au', name: 'Australia', flag: 'au', cx: 865, cy: 368, endpoint: 'https://dynamodb.ap-southeast-2.amazonaws.com' }
    ]
  }
];

// Flat array to make rendering map points easier
const allPlaces = locations.flatMap(loc => loc.places.map(p => ({ ...p, regionName: loc.region })));

const getPingColor = (ping: number) => {
  if (ping < 80) return '#4ade80'; 
  if (ping < 150) return '#facc15'; 
  return '#ef4444'; 
};

const getPingStatus = (ping: number) => {
  if (ping < 80) return 'Excelente';
  if (ping < 150) return 'Medio';
  return 'Alto';
};

const calcUserCoords = (lat: number, lon: number) => {
  const mapWidth = 827.61;
  const mapHeight = 423.74;
  const xOffset = 95.85;
  const yOffset = 62.19;

  const x = (lon + 180) * (mapWidth / 360) + xOffset;
  const latRad = lat * Math.PI / 180;
  const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
  const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI)) + yOffset - 40; 

  return { cx: x, cy: y };
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

  useEffect(() => {
    if (userLoc && containerRef.current) {
      gsap.to('.fiber-line', {
        strokeDashoffset: -100,
        ease: 'none',
        duration: 1.5,
        repeat: -1
      });
    }
  }, [userLoc, pings]);

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
      status: getPingStatus(ping),
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
            Hoy más de 13 ubicaciones globales disponibles para hostear tu servidor al instante.
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
                        onMouseMove={(e) => handleMouseMove(e, place, ping, color)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image 
                          alt={place.flag.toUpperCase()} 
                          width={24} 
                          height={17} 
                          className="rounded-sm flex-shrink-0" 
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
