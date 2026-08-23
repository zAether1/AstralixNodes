'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../contexts/CurrencyContext';

const games = [
  { id: 'minecraft', name: 'Minecraft', icon: 'M13 10V3L4 14h7v7l9-11h-7z', image: '/assets/images/minecraft.jpeg', desc: 'Planes de Hosting para Servidores de Minecraft con precios inigualables, compatibles con todos los mods y plugins.' },
  { id: 'project-zomboid', name: 'Project Zomboid', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', image: '/assets/images/project-zomboid.jpg', desc: 'Sobrevive al apocalipsis zombie en servidores estables y rápidos con máxima capacidad de RAM.' },
  { id: 'palworld', name: 'Palworld', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z', image: '/assets/images/palworld.jpeg', desc: 'Crea tu mundo de Palworld con la latencia más baja y la mejor estabilidad del mercado.' },
  { id: 'hytale', name: 'Hytale', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 9.36l-7.1 7.1a1 1 0 0 1-1.4 0l-2.8-2.8a1 1 0 0 1 0-1.4l7.1-7.1a6 6 0 0 1 9.36-7.94l-3.77 3.77a1 1 0 0 0-.2.2z', image: '/assets/images/hytale.jpeg', desc: 'Prepárate para Hytale con nuestros servidores optimizados de alto rendimiento.' },
  { id: 'terraria', name: 'Terraria', icon: 'M20.2 7.8l-7.7 7.7-4-4-5.7 5.7M15 7h6v6', image: '/assets/images/terraria-8.jpeg', desc: 'Explora y construye en Terraria con tus amigos sin interrupciones ni lag.' },
  { id: 'valheim', name: 'Valheim', icon: 'M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21', image: '/assets/images/valheim.jpeg', desc: 'Conquista a las deidades nórdicas en Valheim con un servidor siempre activo.' }
];

export default function FeaturesHighlights() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  
  const activeGame = games[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % games.length);
          setDirection('down');
          return 0;
        }
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 'down' : 'up');
      setActiveIndex(index);
      setProgress(0);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#08080a] py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14 md:mb-16">
          <div className="mb-5 px-3.5 py-1.5 flex items-center justify-center mx-auto w-fit border border-white/[0.08] text-zinc-400 bg-white/[0.03] backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.06] rounded-full">
            <svg className="h-3.5 w-3.5 mr-2 shrink-0 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-[11px] font-bold tracking-wide uppercase">Catálogo de Juegos</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-[#ffeded]">
            Juegos Destacados
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubre nuestra selección de servidores optimizados para los juegos más populares del momento.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-stretch w-full max-w-[1300px] mx-auto">
          
          {/* Left panel */}
          <div className="flex flex-col lg:w-[340px] shrink-0 gap-1.5">
            {games.map((game, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={game.id}
                  onClick={() => handleSelect(idx)}
                  className={`group relative text-left rounded-xl transition-all duration-300 outline-none border overflow-hidden ${
                    isActive 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-black/50 border-white/[0.06] hover:bg-black/20 hover:border-white/10'
                  }`}
                >
                  <div className="px-4 pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-9 h-9 rounded-sm shrink-0 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#9000FA]/10 text-[#9000FA] border-transparent' 
                          : 'bg-white/[0.07] border-transparent text-white/40 group-hover:text-white/65 group-hover:bg-white/10'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d={game.icon}></path>
                        </svg>
                      </div>
                      <span className={`font-medium text-[16px] transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/50 group-hover:text-white/75'
                      }`}>
                        {game.name}
                      </span>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: direction === 'down' ? 8 : -8 }}
                          animate={{ height: 'auto', opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: direction === 'down' ? -8 : 8 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm font-normal text-zinc-400 leading-relaxed mt-3 mb-1">
                            {game.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-[2px] w-full bg-white/8"
                      >
                        <div 
                          className="h-full transition-none bg-[#9000FA]" 
                          style={{ width: `${progress}%` }} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right panel (Image display) */}
          <div className="flex-1 min-w-0 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] h-full min-h-[300px] lg:min-h-0">
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeGame.image}
                      alt={activeGame.name}
                      fill
                      className="object-cover"
                      quality={90}
                      priority
                    />
                    {/* Gradient Overlay for better text readability and styling */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/90 via-[#08080a]/40 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] z-10"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                        {activeGame.name}
                      </h3>
                      <Link 
                        href={`/${activeGame.id}`} 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9000FA] hover:bg-[#7b00d6] text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(144,0,250,0.4)]"
                      >
                        Desplegar Servidor
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
