'use client';
import React, { useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const games = [
  { id: 'minecraft', name: 'Minecraft', price: '4,24', originalPrice: '4,99', image: '/assets/games/minecraft.jpeg', tag: 'Más popular' },
  { id: 'project-zomboid', name: 'Project Zomboid', price: '4,25', originalPrice: '5,00', image: '/assets/games/project-zomboid.jpeg', tag: 'Próximamente', comingSoon: true},
  { id: 'palworld', name: 'Palworld', price: '8,50', originalPrice: '10,00', image: '/assets/games/palworld.jpeg', tag: 'Próximamente', comingSoon: true },
  { id: 'hytale', name: 'Hytale', price: '9,69', originalPrice: '11,40', image: '/assets/games/hytale-cover.png', tag: 'Próximamente', comingSoon: true },
  { id: 'valheim', name: 'Valheim', price: '3,19', originalPrice: '3,75', image: '/assets/games/valheim.png', tag: 'Próximamente', comingSoon: true },
  { id: 'terraria', name: 'Terraria', price: '2,13', originalPrice: '2,50', image: '/assets/games/terraria.jpeg', tag: 'Próximamente', comingSoon: true },
  { id: 'rust', name: 'Rust', price: '8,50', originalPrice: '10,00', image: '/assets/games/rust.jpeg', tag: 'Próximamente', comingSoon: true },
  { id: 'ark', name: 'ARK: Survival Evolved', price: '10,63', originalPrice: '12,50', image: '/assets/games/ark-survival-evolved.jpeg', tag: 'Próximamente', comingSoon: true }
];

export default function JuegosPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.hero-anim',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
    );

    if (gridRef.current) {
      gsap.fromTo('.game-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]">
      <Navbar />
      <main>
        {/* HERO SECTION ASTRALIXNODES */}
        <section ref={heroRef} className="relative overflow-hidden min-h-[50vh] flex items-center pt-20 border-b border-white/5 bg-gradient-to-br from-[#0b0612] via-[#14053e] to-[#020202]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/95 via-[#180228]/60 to-[#020202] z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#7d3df0]/20 rounded-full blur-[140px] pointer-events-none"></div>
          </div>
          <div className="relative z-20 max-w-[87.5rem] mx-auto px-6 py-20 text-center w-full">
            <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase leading-[1.1] mb-6 tracking-tight">
              HOSTING PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9b5dff]">TUS JUEGOS</span>
            </h1>
            <p className="hero-anim mt-2 text-[#999] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Aloja tus juegos favoritos en nuestra infraestructura de alta disponibilidad. Servidores con procesadores extremos, protección DDoS avanzada, soporte 24/7 y control total.
            </p>
          </div>
        </section>

        {/* GAMES GRID */}
        <section className="bg-[#020202] py-16 px-6 overflow-hidden">
          <div className="max-w-[87.5rem] mx-auto">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                {['Todos', 'Popular', 'Supervivencia', 'Sandbox', 'FPS', 'Simulador'].map((cat, i) => (
                  <button key={i} className={`text-xs px-4 py-2.5 rounded-lg transition-all font-semibold whitespace-nowrap ${i === 0 ? 'bg-[#64189D] text-white shadow-[0_4px_15px_rgba(100,24,157,0.4)]' : 'bg-[#180228] text-[#999] hover:bg-[#210940] hover:text-white border border-white/5'}`}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-80">
                <input type="text" placeholder="Buscar juego..." className="w-full bg-[#180228] border border-white/10 rounded-lg px-4 pr-10 py-3 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#64189D] focus:ring-1 focus:ring-[#64189D] transition-all" />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {games.map((game, i) => (
                <Link key={i} href={`/${game.id}`} className="game-card group block bg-[#10011c] rounded-xl overflow-hidden border border-[#64189D]/10 hover:border-[#64189D]/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(100,24,157,0.15)] hover:-translate-y-1 relative">
                  <div className={`absolute top-3 right-3 z-10 text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition ${game.comingSoon ? 'bg-[#64189D] text-white border-[#64189D]/40 shadow-[0_0_24px_rgba(100,24,157,0.24)]' : 'bg-black/60 text-white border-white/10'}`}>
                    {game.tag}
                  </div>
                  <div className="relative aspect-[3/4] bg-[#0d0d0d] overflow-hidden">
                    <div className="absolute inset-0 bg-[#180228] flex items-center justify-center">
                       <span className="text-[#64189D]/30 font-bold uppercase text-xl rotate-[-45deg] whitespace-nowrap opacity-50">{game.name}</span>
                    </div>
                    <Image src={game.image} alt={game.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10011c] via-transparent to-transparent opacity-80 z-0"></div>
                  </div>
                  <div className="p-4 relative z-10">
                    <h3 className="text-white font-bold text-[1.05rem] truncate mb-1">{game.name}</h3>
                    <div className="flex items-center gap-2">
                      {game.comingSoon ? (
                        <span className="rounded-full bg-[#64189D]/15 px-3 py-1 text-[#e9e1ff] text-xs font-semibold uppercase tracking-[0.12em]">
                          Próximamente
                        </span>
                      ) : (
                        <>
                          <span className="text-[#888] text-xs">Desde</span>
                          <span className="text-[#666] text-xs line-through">€{game.originalPrice}</span>
                          <span className="text-[#64189D] font-black text-sm">€{game.price}</span>
                          <span className="text-[#888] text-xs">/mes</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
