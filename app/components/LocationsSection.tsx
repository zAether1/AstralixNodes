'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 'us-mia', name: 'Miami', countryCode: 'us', continent: 'NA', cx: 274, cy: 175, endpoint: 'https://dynamodb.us-east-1.amazonaws.com' },
  { id: 'us-nyc', name: 'Nueva York', countryCode: 'us', continent: 'NA', cx: 280, cy: 155, endpoint: 'https://dynamodb.us-east-1.amazonaws.com' },
  { id: 'mx-mex', name: 'Ciudad de México', countryCode: 'mx', continent: 'NA', cx: 220, cy: 215, endpoint: 'https://dynamodb.us-west-1.amazonaws.com' },
  { id: 'sa-sao', name: 'São Paulo', countryCode: 'br', continent: 'SA', cx: 370, cy: 360, endpoint: 'https://dynamodb.sa-east-1.amazonaws.com' },
  { id: 'eu-mad', name: 'Madrid', countryCode: 'es', continent: 'EU', cx: 458, cy: 165, endpoint: 'https://dynamodb.eu-south-2.amazonaws.com' },
  { id: 'eu-lhr', name: 'Londres', countryCode: 'gb', continent: 'EU', cx: 465, cy: 145, endpoint: 'https://dynamodb.eu-west-2.amazonaws.com' },
  { id: 'eu-cdg', name: 'París', countryCode: 'fr', continent: 'EU', cx: 477, cy: 155, endpoint: 'https://dynamodb.eu-west-3.amazonaws.com' },
  { id: 'eu-ams', name: 'Ámsterdam', countryCode: 'nl', continent: 'EU', cx: 480, cy: 148, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
  { id: 'eu-fra', name: 'Frankfurt', countryCode: 'de', continent: 'EU', cx: 502, cy: 152, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
  { id: 'ap-tyo', name: 'Tokio', countryCode: 'jp', continent: 'AS', cx: 830, cy: 170, endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com' },
  { id: 'ap-sin', name: 'Singapur', countryCode: 'sg', continent: 'AS', cx: 770, cy: 280, endpoint: 'https://dynamodb.ap-southeast-1.amazonaws.com' },
  { id: 'ap-syd', name: 'Sídney', countryCode: 'au', continent: 'OC', cx: 865, cy: 368, endpoint: 'https://dynamodb.ap-southeast-2.amazonaws.com' }
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
  const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI)) + yOffset - 50; 

  return { cx: x, cy: y };
};

export default function LocationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pings, setPings] = useState<Record<string, number>>({});
  const [userLoc, setUserLoc] = useState<{ cx: number, cy: number, city: string, country: string } | null>(null);
  
  const [activeTooltip, setActiveTooltip] = useState<{
    id: string;
    name: string;
    ping: number;
    color: string;
    status: string;
    region: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    // 1. Fetch User Location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.latitude && data.longitude) {
          const coords = calcUserCoords(data.latitude, data.longitude);
          setUserLoc({ cx: coords.cx, cy: coords.cy, city: data.city, country: data.country_name });
        }
      })
      .catch(() => console.log('Location access denied or failed'));

    // 2. Continuous Ping Measurement
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
    const pingInterval = setInterval(measurePings, 10000); // Update every 10s

    return () => clearInterval(pingInterval);
  }, []);

  useEffect(() => {
    if (userLoc && containerRef.current) {
      gsap.to('.data-line', {
        strokeDashoffset: -100,
        ease: 'none',
        duration: 2,
        repeat: -1
      });
    }
  }, [userLoc]);

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
      id: loc.id,
      name: loc.name,
      ping,
      color,
      status: getPingStatus(ping),
      region: loc.continent === 'EU' ? 'Europa' : loc.continent === 'NA' ? 'Norteamérica' : loc.continent === 'SA' ? 'Sudamérica' : 'Asia/Pacífico',
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  const activeNodesCount = Object.values(pings).filter(p => p > 0 && p < 999).length;
  const avgPing = activeNodesCount > 0 
    ? Math.round(Object.values(pings).filter(p => p > 0 && p < 999).reduce((a, b) => a + b, 0) / activeNodesCount) 
    : 0;

  return (
    <section id="cobertura" className="bg-[#180228] py-24 px-6 relative" ref={containerRef}>
      <div className="max-w-[87.5rem] mx-auto">
        <div className="reveal mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide">
            <span className="text-white">INFRAESTRUCTURA </span>
            <span className="text-[#64189D]">GLOBAL.</span>
          </h2>
          <p className="text-[#888] mt-4 max-w-2xl mx-auto">
            Visualización en tiempo real de la latencia desde tu ubicación hacia nuestra red global de centros de datos premium.
          </p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-8 items-start relative">
          {/* NOC Panel */}
          <div className="reveal w-full xl:w-[22rem] flex-shrink-0 bg-[#210940] border border-[#64189D]/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(100,24,157,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64189D] to-transparent opacity-50"></div>
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-black tracking-widest text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></div>
                NOC STATUS
              </h3>
              <span className="text-xs text-[#888] font-mono">LIVE</span>
            </div>

            <div className="space-y-6">
              <div className="bg-[#180228] p-4 rounded-xl border border-white/5">
                <span className="text-[#888] text-xs uppercase tracking-wider block mb-1">Nodos Activos</span>
                <span className="text-white text-3xl font-black font-mono">{activeNodesCount}/{locations.length}</span>
              </div>
              
              <div className="bg-[#180228] p-4 rounded-xl border border-white/5">
                <span className="text-[#888] text-xs uppercase tracking-wider block mb-1">Latencia Global Promedio</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-3xl font-black font-mono">{avgPing > 0 ? avgPing : '--'}</span>
                  <span className="text-[#64189D] font-bold">ms</span>
                </div>
              </div>

              <div className="bg-[#180228] p-4 rounded-xl border border-white/5">
                <span className="text-[#888] text-xs uppercase tracking-wider block mb-1">Uptime de Red</span>
                <span className="text-[#4ade80] text-3xl font-black font-mono">99.99%</span>
              </div>
            </div>

            {userLoc && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="text-[#888] text-xs uppercase tracking-wider block mb-2">Tu ubicación estimada</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#64189D]/20 flex items-center justify-center border border-[#64189D]">
                    <svg className="w-5 h-5 text-[#64189D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <span className="text-white font-bold block">{userLoc.city}</span>
                    <span className="text-[#888] text-xs">{userLoc.country}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* SVG Map */}
          <div className="reveal flex-1 w-full bg-[#1e0735] border border-white/5 rounded-2xl overflow-hidden relative">
            <svg viewBox="95.85 62.19 827.61 423.74" className="w-full h-auto aspect-[2/1]" preserveAspectRatio="xMidYMid meet">
              <image x="95.85" y="62.19" width="827.61" height="423.74" href="/assets/images/world-map.svg"></image>
              
              {/* Dynamic Connection Lines */}
              {userLoc && locations.map(loc => {
                const ping = pings[loc.id] || 0;
                if (!ping || ping === 999) return null;
                const isClosest = ping === Math.min(...Object.values(pings).filter(p => p > 0));
                
                // SVG arc path from user to datacenter
                const midX = (userLoc.cx + loc.cx) / 2;
                const midY = Math.min(userLoc.cy, loc.cy) - 60; 
                const pathData = `M ${userLoc.cx} ${userLoc.cy} Q ${midX} ${midY} ${loc.cx} ${loc.cy}`;
                
                return (
                  <g key={`line-${loc.id}`}>
                    <path d={pathData} fill="none" stroke={isClosest ? '#64189D' : '#ffffff'} strokeWidth="1" opacity={isClosest ? "0.4" : "0.1"} />
                    <path 
                      className="data-line"
                      d={pathData} 
                      fill="none" 
                      stroke={isClosest ? '#64189D' : '#ffffff'} 
                      strokeWidth="2" 
                      opacity={isClosest ? "0.8" : "0.3"}
                      strokeDasharray="4 20"
                    />
                  </g>
                );
              })}

              {/* User Location Node */}
              {userLoc && (
                <g className="user-node">
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="25" fill="rgba(100,24,157,0.15)">
                    <animate attributeName="r" values="15;35;15" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="6" fill="#fff" />
                  <circle cx={userLoc.cx} cy={userLoc.cy} r="10" fill="none" stroke="#64189D" strokeWidth="2">
                    <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
              )}
              
              {/* Datacenter Nodes */}
              {locations.map(loc => {
                const ping = pings[loc.id] || 0;
                const color = ping ? getPingColor(ping) : '#555';
                const rgb = color === '#4ade80' ? '74, 222, 128' : color === '#facc15' ? '250, 204, 21' : '239, 68, 68';
                
                return (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer map-node group"
                    onMouseMove={(e) => handleMouseMove(e, loc, ping, color)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <circle cx={loc.cx} cy={loc.cy} r="16" fill="transparent" />
                    <circle cx={loc.cx} cy={loc.cy} r="7" fill={`rgba(${rgb}, 0.25)`} className="transition-all duration-300 group-hover:r-[12px]">
                      <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite"></animate>
                      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx={loc.cx} cy={loc.cy} r="3.5" fill={color} className="transition-all duration-300 group-hover:scale-[1.4] origin-center"></circle>
                  </g>
                );
              })}
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
          <div className="bg-[#180228] border border-[#64189D] shadow-[0_10px_30px_rgba(100,24,157,0.4)] rounded-xl p-4 w-[14rem] relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#64189D] opacity-20 blur-[20px] rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#180228] border-b border-r border-[#64189D] transform rotate-45"></div>
            
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
                <span className="font-mono font-bold" style={{ color: activeTooltip.color }}>
                  {activeTooltip.ping > 0 && activeTooltip.ping < 999 ? `${activeTooltip.ping} ms` : 'Midiendo'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888] uppercase tracking-wider">Estado:</span>
                <span className="font-bold" style={{ color: activeTooltip.color }}>{activeTooltip.status}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888] uppercase tracking-wider">Disp:</span>
                <span className="text-[#4ade80] font-bold font-mono">99.99%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
