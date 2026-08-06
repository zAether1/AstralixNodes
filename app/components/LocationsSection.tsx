'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 'us-mia', name: 'Miami', countryCode: 'us', continent: 'NA', cx: 250, cy: 195, endpoint: 'https://dynamodb.us-east-1.amazonaws.com' },
  { id: 'us-nyc', name: 'Nueva York', countryCode: 'us', continent: 'NA', cx: 260, cy: 165, endpoint: 'https://dynamodb.us-east-2.amazonaws.com' },
  { id: 'mx-mex', name: 'Ciudad de México', countryCode: 'mx', continent: 'NA', cx: 180, cy: 220, endpoint: 'https://dynamodb.us-west-1.amazonaws.com' },
  { id: 'sa-sao', name: 'São Paulo', countryCode: 'br', continent: 'SA', cx: 340, cy: 340, endpoint: 'https://dynamodb.sa-east-1.amazonaws.com' },
  { id: 'eu-mad', name: 'Madrid', countryCode: 'es', continent: 'EU', cx: 450, cy: 170, endpoint: 'https://dynamodb.eu-south-2.amazonaws.com' },
  { id: 'eu-lhr', name: 'Londres', countryCode: 'gb', continent: 'EU', cx: 460, cy: 145, endpoint: 'https://dynamodb.eu-west-2.amazonaws.com' },
  { id: 'eu-cdg', name: 'París', countryCode: 'fr', continent: 'EU', cx: 468, cy: 155, endpoint: 'https://dynamodb.eu-west-3.amazonaws.com' },
  { id: 'eu-ams', name: 'Ámsterdam', countryCode: 'nl', continent: 'EU', cx: 472, cy: 148, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
  { id: 'eu-fra', name: 'Frankfurt', countryCode: 'de', continent: 'EU', cx: 485, cy: 150, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
  { id: 'ap-tyo', name: 'Tokio', countryCode: 'jp', continent: 'AS', cx: 800, cy: 175, endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com' },
  { id: 'ap-sin', name: 'Singapur', countryCode: 'sg', continent: 'AS', cx: 720, cy: 265, endpoint: 'https://dynamodb.ap-southeast-1.amazonaws.com' },
  { id: 'ap-syd', name: 'Sídney', countryCode: 'au', continent: 'OC', cx: 830, cy: 360, endpoint: 'https://dynamodb.ap-southeast-2.amazonaws.com' }
];

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
  const mapRef = useRef<SVGSVGElement>(null);
  const [pings, setPings] = useState<Record<string, number>>({});
  const [userLoc, setUserLoc] = useState<{ cx: number, cy: number, city: string, country: string } | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<any>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.latitude && data.longitude) {
          const coords = calcUserCoords(data.latitude, data.longitude);
          setUserLoc({ cx: coords.cx, cy: coords.cy, city: data.city, country: data.country_name });
        }
      })
      .catch(() => console.log('Location access denied'));

    const measurePings = async () => {
      const newPings: Record<string, number> = {};
      const pingPromises = locations.map(async (loc) => {
        try {
          const start = performance.now();
          await fetch(loc.endpoint, { mode: 'no-cors', cache: 'no-store' });
          const rtt = Math.round(performance.now() - start);
          newPings[loc.id] = Math.max(1, rtt);
        } catch (e) {
          newPings[loc.id] = 999; 
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
      // Fiber optic effect
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
      const els = gsap.utils.toArray('.reveal');
      els.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
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

  const handleMouseMove = (e: React.MouseEvent, loc: any, ping: number, color: string) => {
    setActiveTooltip({
      id: loc.id, name: loc.name, ping, color, status: getPingStatus(ping),
      region: loc.continent === 'EU' ? 'Europa' : loc.continent === 'NA' ? 'Norteamérica' : loc.continent === 'SA' ? 'Sudamérica' : 'Asia/Pacífico',
      x: e.clientX, y: e.clientY
    });
  };

  const handleMouseLeave = () => setActiveTooltip(null);

  const activeNodesCount = Object.values(pings).filter(p => p > 0 && p < 999).length;

  return (
    <section id="cobertura" className="bg-[#020202] py-24 px-6 relative border-t border-white/5" ref={containerRef}>
      <div className="max-w-[87.5rem] mx-auto">
        <div className="reveal mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide">
            <span className="text-white">Latencia en </span>
            <span className="text-[#64189D]">Tiempo Real</span>
          </h2>
          <p className="text-[#888] mt-4 max-w-2xl mx-auto">
            Calculamos dinámicamente tu ping hacia nuestros centros de datos globales para que elijas la mejor ubicación.
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-10 items-start relative">
          {/* Latency Sidebar */}
          <div className="reveal w-full xl:w-[24rem] flex-shrink-0 bg-[#10011c] border border-white/10 rounded-3xl p-8 shadow-[0_10px_40px_rgba(100,24,157,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#64189D]/20 blur-[50px] rounded-full pointer-events-none"></div>
            
            <div className="mb-8">
              <span className="text-[#64189D] text-xs font-black tracking-widest uppercase mb-2 block">Tu Ubicación Estimada</span>
              {userLoc ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#64189D]/20 flex items-center justify-center border border-[#64189D]/50 relative">
                    <div className="absolute inset-0 rounded-xl bg-[#64189D] animate-ping opacity-20"></div>
                    <svg className="w-6 h-6 text-[#64189D] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <span className="text-white font-bold text-lg block leading-tight">{userLoc.city}</span>
                    <span className="text-[#888] text-sm">{userLoc.country}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#222] animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-[#222] rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-[#222] rounded animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/5 pt-6">
              <span className="text-[#64189D] text-xs font-black tracking-widest uppercase mb-4 block">Latencia Hacia Data Centers</span>
              <div className="space-y-1 pr-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                {locations.map(loc => {
                  const ping = pings[loc.id] || 0;
                  const color = ping ? getPingColor(ping) : '#888';
                  
                  return (
                    <div key={loc.id} className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: ping ? `0 0 10px ${color}` : 'none' }}></div>
                        <span className="text-white text-sm font-medium">{loc.name}</span>
                      </div>
                      <div className="text-right">
                        {ping > 0 && ping < 999 ? (
                          <span className="font-mono font-bold text-sm" style={{ color }}>{ping} ms</span>
                        ) : ping === 999 ? (
                          <span className="text-red-500 font-mono text-sm">Timeout</span>
                        ) : (
                          <span className="text-[#666] font-mono text-sm flex items-center gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#666] animate-bounce"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-[#666] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-[#666] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NOC Panel Secundario */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-[#666] text-[10px] font-black tracking-widest uppercase mb-3 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></div>
                 NOC STATUS
              </span>
              <div className="flex justify-between items-center bg-black/40 rounded-xl p-3 border border-white/5">
                 <span className="text-[#888] text-xs">Nodos Operativos</span>
                 <span className="text-white font-mono font-bold text-sm">{activeNodesCount}/{locations.length}</span>
              </div>
            </div>
          </div>
          
          {/* SVG Map */}
          <div className="reveal flex-1 w-full bg-[#180228] border border-white/5 rounded-3xl overflow-hidden relative shadow-[inset_0_0_50px_rgba(100,24,157,0.1)]">
            <svg ref={mapRef} viewBox="95.85 62.19 827.61 423.74" className="w-full h-auto aspect-[2/1]" preserveAspectRatio="xMidYMid meet">
              <image x="95.85" y="62.19" width="827.61" height="423.74" href="/assets/images/world-map.svg"></image>
              
              {/* Dynamic Connection Lines (Fiber Optic) */}
              {userLoc && locations.map(loc => {
                const ping = pings[loc.id] || 0;
                if (!ping || ping === 999) return null;
                
                // SVG arc path from user to datacenter
                const midX = (userLoc.cx + loc.cx) / 2;
                const midY = Math.min(userLoc.cy, loc.cy) - 60; 
                const pathData = `M ${userLoc.cx} ${userLoc.cy} Q ${midX} ${midY} ${loc.cx} ${loc.cy}`;
                
                const isClosest = ping === Math.min(...Object.values(pings).filter(p => p > 0));
                const strokeColor = isClosest ? '#4ade80' : '#64189D';
                const opacityLine = isClosest ? '0.6' : '0.2';
                
                return (
                  <g key={`line-${loc.id}`}>
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

              {/* Datacenter Nodes */}
              {locations.map(loc => {
                const ping = pings[loc.id] || 0;
                const color = ping ? getPingColor(ping) : '#555';
                const isClosest = ping === Math.min(...Object.values(pings).filter(p => p > 0)) && ping > 0;
                
                return (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer map-node group"
                    onMouseMove={(e) => handleMouseMove(e, loc, ping, color)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <circle cx={loc.cx} cy={loc.cy} r="20" fill="transparent" />
                    
                    {isClosest && (
                       <circle cx={loc.cx} cy={loc.cy} r="12" fill={color} opacity="0.3">
                          <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                       </circle>
                    )}

                    <circle cx={loc.cx} cy={loc.cy} r="5" fill={color} className="transition-all duration-300 group-hover:r-[7px]" style={{ filter: ping ? `drop-shadow(0 0 8px ${color})` : 'none' }}></circle>
                  </g>
                );
              })}

              {/* User Location Node */}
              {userLoc && (
                <g className="user-node">
                  {/* Halo Glow */}
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="35" fill="url(#userGlow)" opacity="0.8">
                     <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Ripple Rings */}
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="8" fill="none" stroke="#ffffff" strokeWidth="1.5">
                    <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="8" fill="none" stroke="#ffffff" strokeWidth="1.5">
                    <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite" begin="1s"/>
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" begin="1s"/>
                  </circle>

                  {/* Core */}
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="6" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 10px #ffffff)' }} />
                  
                  {/* Definitions for Glow */}
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

      {/* Premium Tooltip */}
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
