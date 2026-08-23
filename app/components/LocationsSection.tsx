'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Proyección Equirectangular para el usuario
const calcUserCoords = (lat: number, lon: number) => {
  const x = 473.98 + (lon * 2.683);
  const y = 309.31 - (lat * 3.115);
  return { cx: x, cy: y };
};

const locations = [
  {
    region: 'Norteamérica',
    places: [
      { id: 'us-mia', name: 'Miami, FL', country: 'USA', flag: 'us', cx: 269.25, cy: 206.74, endpoint: 'https://dynamodb.us-east-1.amazonaws.com' },
      { id: 'us-nyc', name: 'Nueva York, NY', country: 'USA', flag: 'us', cx: 274.06, cy: 168.28, endpoint: 'https://dynamodb.us-east-2.amazonaws.com' },
      { id: 'mx-mex', name: 'Ciudad de México', country: 'México', flag: 'mx', cx: 211.55, cy: 235.59, endpoint: 'https://dynamodb.us-west-1.amazonaws.com' },
    ]
  },
  {
    region: 'Europa',
    places: [
      { id: 'eu-mad', name: 'Madrid', country: 'España', flag: 'es', cx: 468.78, cy: 185.11, endpoint: 'https://dynamodb.eu-south-2.amazonaws.com' },
      { id: 'eu-fra', name: 'Frankfurt', country: 'Alemania', flag: 'de', cx: 502.44, cy: 151.45, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
      { id: 'eu-lhr', name: 'Londres', country: 'Reino Unido', flag: 'gb', cx: 471.19, cy: 144.24, endpoint: 'https://dynamodb.eu-west-2.amazonaws.com' },
      { id: 'eu-par', name: 'París', country: 'Francia', flag: 'fr', cx: 480.80, cy: 158.66, endpoint: 'https://dynamodb.eu-west-3.amazonaws.com' },
      { id: 'eu-ams', name: 'Ámsterdam', country: 'Países Bajos', flag: 'nl', cx: 490.42, cy: 149.05, endpoint: 'https://dynamodb.eu-central-1.amazonaws.com' },
    ]
  },
  {
    region: 'Sudamérica',
    places: [
      { id: 'br-sao', name: 'São Paulo', country: 'Brasil', flag: 'br', cx: 339.00, cy: 360.00, endpoint: 'https://dynamodb.sa-east-1.amazonaws.com' },
    ]
  },
  {
    region: 'Asia / Pacífico',
    places: [
      { id: 'jp-tyo', name: 'Tokio', country: 'Japón', flag: 'jp', cx: 822.17, cy: 192.32, endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com' },
      { id: 'sg-sin', name: 'Singapur', country: 'Singapur', flag: 'sg', cx: 754.86, cy: 302.90, endpoint: 'https://dynamodb.ap-southeast-1.amazonaws.com' },
      { id: 'au-syd', name: 'Sídney', country: 'Australia', flag: 'au', cx: 855.83, cy: 423.11, endpoint: 'https://dynamodb.ap-southeast-2.amazonaws.com' },
    ]
  }
];

const allPlaces = locations.flatMap(loc => loc.places.map(p => ({ ...p, regionName: loc.region })));

const getPingColor = (ping: number) => {
  if (ping < 80) return '#4ade80'; // Emerald 400
  if (ping < 150) return '#facc15'; // Yellow 400
  return '#ef4444'; // Red 500
};

export default function LocationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pings, setPings] = useState<Record<string, number>>({});
  const [userLoc, setUserLoc] = useState<{ cx: number, cy: number } | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<string>('us-mia');

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

  const getLowestPingPlaceId = () => {
    const validPings = Object.entries(pings).filter(([_, val]) => val > 0 && val < 999);
    if (validPings.length === 0) return null;
    return validPings.reduce((min, curr) => curr[1] < min[1] ? curr : min)[0];
  };
  const closestPlaceId = getLowestPingPlaceId();

  const activeLocation = allPlaces.find(p => p.id === activeLocationId) || allPlaces[0];

  return (
    <section className="relative z-0 overflow-hidden bg-[#08080a] py-12 md:py-24" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 text-center md:mb-12">
          <div className="mb-5 px-3.5 py-1.5 flex items-center justify-center mx-auto w-fit border border-white/[0.08] text-zinc-400 bg-white/[0.03] backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.06] rounded-full">
            <svg className="h-3.5 w-3.5 mr-2 shrink-0 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-[11px] font-bold tracking-wide uppercase">Red Global</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#ffeded] md:text-5xl">
            Cobertura Mundial
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
            12 ubicaciones estratégicas alrededor del mundo. Latencia ultra baja garantizada con rutas optimizadas para gaming.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[280px_1fr]">
          
          {/* Left Panel: Location List */}
          <div className="order-2 flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d12]/70 backdrop-blur-xl shadow-xl xl:order-1 xl:h-[600px]">
            <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-3">
              {locations.map((loc) => (
                <div key={loc.region}>
                  <h4 className="mb-3 flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {loc.region}
                    <span className="h-px flex-1 bg-white/[0.05]"></span>
                  </h4>
                  <div className="space-y-1">
                    {loc.places.map((place) => {
                      const isActive = activeLocationId === place.id;
                      const ping = pings[place.id] || 0;
                      const pingColor = getPingColor(ping);

                      return (
                        <button
                          key={place.id}
                          onClick={() => setActiveLocationId(place.id)}
                          className={`group flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                            isActive
                              ? 'border-white/[0.1] bg-white/[0.05]'
                              : 'border-transparent hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-5 w-7 flex-shrink-0 items-center justify-center">
                              <img
                                alt={place.country}
                                className="rounded-sm object-cover"
                                width={22}
                                height={16}
                                src={`https://flagcdn.com/w40/${place.flag}.png`}
                              />
                            </span>
                            <div className="min-w-0">
                              <div className={`flex items-center gap-1.5 truncate text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                <span className="truncate">{place.country}</span>
                                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.7)]`}></span>
                              </div>
                              <div className="mt-0.5 truncate text-xs text-zinc-500">
                                {place.name}
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-2 flex-shrink-0">
                            {ping > 0 && ping < 999 ? (
                              <div className="flex items-center gap-1.5">
                                <div className="flex items-end gap-[2px]">
                                  {[1, 2, 3, 4].map((bar) => {
                                    const fillBars = ping < 80 ? 4 : ping < 150 ? 3 : 2;
                                    return (
                                      <div 
                                        key={bar} 
                                        className={`w-[3px] rounded-full transition-colors duration-300 ${
                                          bar <= fillBars ? (ping < 80 ? 'bg-emerald-500' : ping < 150 ? 'bg-yellow-400' : 'bg-red-500') : 'bg-white/10'
                                        } ${bar === 1 ? 'h-[4px]' : bar === 2 ? 'h-[6px]' : bar === 3 ? 'h-[8px]' : 'h-[11px]'}`}
                                      ></div>
                                    )
                                  })}
                                </div>
                                <span className={`font-mono text-[10px] font-bold leading-none ${ping < 80 ? 'text-emerald-400' : ping < 150 ? 'text-yellow-400' : 'text-red-400'}`}>
                                  {ping}ms
                                </span>
                              </div>
                            ) : ping === 999 ? (
                              <span className="font-mono text-[10px] text-red-500 font-bold">ERR</span>
                            ) : (
                              <svg className="h-3.5 w-3.5 text-zinc-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  Disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-600"></span>
                  Próximamente
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: SVG Map & Bottom Info */}
          <div className="order-1 flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d12]/40 shadow-2xl xl:order-2 xl:h-[600px]">
            
            <div className="relative h-[260px] sm:h-[340px] xl:h-auto xl:flex-1 overflow-hidden">
              <svg viewBox="95.85 62.19 827.61 423.74" className="absolute inset-0 w-full h-full object-cover" preserveAspectRatio="xMidYMid meet">
                <image x="95.85" y="62.19" width="827.61" height="423.74" href="/assets/images/world-map.svg" opacity="0.3"></image>

                {/* Animated connections */}
                {userLoc && allPlaces.map(place => {
                  const ping = pings[place.id] || 0;
                  if (!ping || ping === 999) return null;

                  const midX = (userLoc.cx + place.cx) / 2;
                  const midY = Math.min(userLoc.cy, place.cy) - 60;
                  const pathData = `M ${userLoc.cx} ${userLoc.cy} Q ${midX} ${midY} ${place.cx} ${place.cy}`;

                  const isClosest = place.id === closestPlaceId;
                  const strokeColor = isClosest ? '#4ade80' : '#9000FA';
                  const opacityLine = isClosest ? '0.6' : '0.15';

                  return (
                    <g key={`line-${place.id}`}>
                      <path d={pathData} fill="none" stroke={strokeColor} strokeWidth="1" opacity={opacityLine} />
                      <path
                        d={pathData}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2"
                        opacity={isClosest ? "0.9" : "0.3"}
                        strokeDasharray="5 15"
                        style={{ filter: `drop-shadow(0 0 5px ${strokeColor})` }}
                      >
                        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite" />
                      </path>
                    </g>
                  );
                })}

                {/* Map Nodes */}
                {allPlaces.map(place => {
                  const isSelected = activeLocationId === place.id;
                  const nodeColor = isSelected ? '#ef4444' : '#a1a1aa';

                  return (
                    <g key={place.id} style={{ transform: `translate(${place.cx}px, ${place.cy}px)`, cursor: 'pointer' }} onClick={() => setActiveLocationId(place.id)}>
                      <circle r="14" fill="transparent"></circle>
                      {isSelected && (
                        <>
                          <circle r="10" fill={nodeColor} opacity="0.18"></circle>
                          <circle r="7" fill="none" stroke={nodeColor} strokeWidth="0.8" opacity="0.6">
                            <animate attributeName="r" values="7;14;7" dur="2s" repeatCount="indefinite"></animate>
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"></animate>
                          </circle>
                        </>
                      )}
                      <circle r={isSelected ? "7" : "5"} fill={nodeColor} stroke="rgba(0,0,0,0.45)" strokeWidth="0.45"></circle>
                    </g>
                  );
                })}

                {/* User Node */}
                {userLoc && (
                  <g style={{ transform: `translate(${userLoc.cx}px, ${userLoc.cy}px)` }}>
                    <circle r="35" fill="url(#userGlow)" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle r="8" fill="none" stroke="#ffffff" strokeWidth="1.5">
                      <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="8" fill="none" stroke="#ffffff" strokeWidth="1.5">
                      <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite" begin="1s" />
                      <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </circle>
                    <circle r="6" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 10px #ffffff)' }} />
                    <defs>
                      <radialGradient id="userGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </g>
                )}
              </svg>
              
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_20px_#08080a]"></div>
            </div>

            {/* Bottom info panel matching XeroHost */}
            <div className="flex flex-col gap-4 border-t border-white/[0.06] bg-white/[0.02] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <img
                  alt={activeLocation.country}
                  width={32}
                  height={24}
                  className="rounded-sm object-cover"
                  src={`https://flagcdn.com/w40/${activeLocation.flag}.png`}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-white">{activeLocation.country}</span>
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.7)]"></span>
                  </div>
                  <div className="text-xs text-zinc-400">{activeLocation.name}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:w-[380px] sm:flex-shrink-0">
                <div className="flex items-center gap-2 rounded-xl border-0 bg-white/[0.03] px-4 py-3">
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Plan Básico</div>
                    <div className="truncate text-xs font-semibold text-white">Ryzen 9 5900X</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border-0 bg-white/[0.03] px-4 py-3">
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Plan Pro</div>
                    <div className="truncate text-xs font-semibold text-white">Ryzen 9 9950X</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
