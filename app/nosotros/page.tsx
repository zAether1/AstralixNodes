'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NosotrosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('ASTRALIXNODES2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Reveal up animations for sections
    gsap.utils.toArray('.reveal-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#020202]" ref={containerRef}>
      <Navbar />
      <main>
        {/* Hero Section  */}
        <section className="relative min-h-[70vh] flex items-center" style={{ backgroundImage: "url('https://i.imgur.com/nJwXQ8C.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm"></div>
          <div className="relative z-10 w-full px-6 py-20">
            <div className="max-w-4xl mx-auto text-center text-white">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 text-[#cdbcff] border border-white/6 font-bold text-xs tracking-widest uppercase mb-4">Quiénes Somos</span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">AstralixNodes</h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-medium mb-8">Infraestructura premium diseñada para comunidades de juego y proyectos digitales. Rendimiento, soporte humano y herramientas que facilitan escalar.</p>
              <div className="flex justify-center gap-4">
                <a href="/vps" className="inline-block bg-gradient-to-r from-[#7b1dc2] to-[#64189D] px-6 py-3 rounded-full text-white font-bold shadow-md hover:opacity-95 transition">Conoce nuestros servicios</a>
                <a href="https://discord.gg/6UMfyMM5pu" target="_blank" rel="noopener noreferrer" className="inline-block bg-white/6 px-6 py-3 rounded-full text-white font-bold border border-white/10 hover:bg-white/10 transition">Unirme al Discord</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-r from-[#020202] to-[#0b0412] text-white border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mx-auto max-w-4xl mb-8 text-white/95">
              "Construimos AstralixNodes con un solo objetivo en mente: brindarte el rendimiento puro y la estabilidad que todo creador merece. Sin compromisos, sin ataduras, solo potencia y un soporte que sí entiende tus problemas."
            </blockquote>
            <div className="mt-4">
              <div className="text-2xl font-bold">Carlos Jahir</div>
              <div className="text-sm uppercase tracking-widest text-white/80">Founder & CEO — @_zAether</div>
            </div>
          </div>
        </section>

        {/* Team Section — Pyramid */}
        <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#64189D]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-16 reveal-up">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 text-[#cdbcff] border border-white/6 font-bold text-xs tracking-widest uppercase mb-4">Nuestro Equipo</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Las personas detrás <span className="text-[#9b4dff]">de la red</span></h2>
              <p className="text-[#777] max-w-xl mx-auto text-base">Organización clara, responsabilidades definidas. Cada nivel existe para que tú tengas la mejor experiencia.</p>
            </div>

            {/* CEO */}
            <div className="flex justify-center mb-8 reveal-up">
              <div className="relative group w-full max-w-xl">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#9b4dff]/50 via-[#64189D]/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />
                <div className="relative bg-[#0f0f0f] border border-[#9b4dff]/35 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9b4dff] to-transparent" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#9b4dff]/8 blur-2xl rounded-full pointer-events-none" />

                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_32px_rgba(155,77,255,0.5)] ring-2 ring-[#9b4dff]/50">
                        <img src="https://i.imgur.com/ZopyeO8.png" alt="Carlos Jahir" className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#0f0f0f]" title="En línea" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-black uppercase tracking-[0.25em] text-[#9b4dff]">CEO & Founder</span>
                      </div>
                      <h3 className="text-2xl font-black text-white">Carlos Jahir</h3>
                      <p className="text-[#888] text-sm mt-0.5">@_zAether</p>
                    </div>
                  </div>

                  <p className="text-[#aaa] text-base leading-relaxed mb-6">Visión estratégica, decisiones de producto y crecimiento. Impulsa que AstralixNodes sea la plataforma de alto rendimiento que las comunidades de juego merecen.</p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-[#9b4dff]/10 border border-[#9b4dff]/20 text-[#cdbcff] text-xs font-bold uppercase tracking-wider">Estrategia</span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#9b4dff]/10 border border-[#9b4dff]/20 text-[#cdbcff] text-xs font-bold uppercase tracking-wider">Producto</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-wider">Infraestructura</span>
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-wider">Visión</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pyramid connector */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center gap-0">
                <div className="w-px h-6 bg-gradient-to-b from-[#9b4dff]/50 to-[#64189D]/30" />
                <div className="flex items-center gap-0">
                  <div className="w-24 h-px bg-gradient-to-l from-[#64189D]/40 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-[#64189D]/60" />
                  <div className="w-24 h-px bg-gradient-to-r from-[#64189D]/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Developers */}
            <div className="mb-6 reveal-up">
              <div className="flex items-center gap-3 justify-center mb-8">
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#64189D]/30" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#555]">Desarrolladores</span>
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#64189D]/30" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">

                {/* Dev 1 */}
                <div className="group relative bg-[#0f0f0f] border border-white/8 rounded-2xl p-7 hover:border-[#64189D]/40 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#64189D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden ring-1 ring-[#64189D]/50 flex-shrink-0">
                      <img src="https://i.imgur.com/FUO27Nn.jpeg" alt="Santiago Gualdron" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9b4dff]">Developer</span>
                      </div>
                      <h4 className="text-lg font-black text-white">Santiago Gualdron</h4>
                      <p className="text-[#888] text-sm mt-0.5">@devkopi</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#1a1a2e]/60 border border-[#64189D]/15 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">Backend</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#1a1a2e]/60 border border-[#64189D]/15 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">Frontend</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#1a1a2e]/60 border border-[#64189D]/15 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">APIs</span>
                  </div>
                  <p className="text-[#777] text-sm leading-relaxed">Desarrollo de integraciones, automatización y sistemas internos que hacen posible el servicio.</p>
                </div>

                {/* Dev 2 */}
                <div className="group relative bg-[#0f0f0f] border border-white/8 rounded-2xl p-7 hover:border-[#64189D]/40 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#64189D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] border border-white/8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9b4dff]">Developer</span>
                      </div>
                      <h4 className="text-lg font-black text-white">Vacante</h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#1a1a2e]/60 border border-[#64189D]/15 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">Frontend</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#1a1a2e]/60 border border-[#64189D]/15 text-[#a78bfa] text-xs font-bold uppercase tracking-wider">UI/UX</span>
                  </div>
                  <p className="text-[#777] text-sm leading-relaxed">Interfaces, experiencia de usuario y paneles del cliente, fluidos y modernos.</p>
                </div>

              </div>
            </div>

            {/* Pyramid connector */}
            <div className="flex justify-center my-5">
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-gradient-to-b from-[#64189D]/30 to-[#3a0b4f]/20" />
                <div className="flex items-center">
                  <div className="w-32 h-px bg-gradient-to-l from-[#3a0b4f]/40 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-[#3a0b4f]/60" />
                  <div className="w-32 h-px bg-gradient-to-r from-[#3a0b4f]/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* LEVEL 3 — Support */}
            <div className="reveal-up">
              <div className="flex items-center gap-3 justify-center mb-8">
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#2a2a2a]/60" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#444]">Soporte</span>
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#2a2a2a]/60" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">

                {[
                  { initials: 'S1', label: 'Support Agent' },
                  { initials: 'S2', label: 'Support Agent' },
                  { initials: 'S3', label: 'Support Agent' },
                ].map((s, i) => (
                  <div key={i} className="group relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/8 flex items-center justify-center text-sm font-black text-white/40">{s.initials}</div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444] block mb-0.5">Nivel 3</span>
                        <h4 className="text-base font-black text-white/60">Vacante</h4>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/4 border border-white/6 text-white/35 text-xs font-bold uppercase tracking-wider">24/7</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/4 border border-white/6 text-white/35 text-xs font-bold uppercase tracking-wider">Tickets</span>
                    </div>
                    <p className="text-[#444] text-sm leading-relaxed">Atención directa y resolución de incidencias en tiempo real.</p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 bg-[#080808] border-t border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-7 bg-[#0f0f0f] rounded-2xl border border-[#64189D]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b4dff]/40 to-transparent" />
              <h3 className="text-3xl font-extrabold text-[#9b4dff] mb-3">¿Por qué AstralixNodes?</h3>
              <p className="text-[#bfbfbf] mb-6 text-sm leading-relaxed">Infraestructura nueva, equipo comprometido y tecnología de punta desde el primer día.</p>
              <a href="/vps" className="inline-block bg-[#64189D] hover:bg-[#7b1dc2] text-white font-bold px-6 py-3 rounded-xl transition-colors">Comprar un servidor</a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/6 group hover:border-[#64189D]/25 transition-colors">
                <div className="text-3xl font-black text-white mb-1">Nuevo</div>
                <div className="text-sm text-[#666]">Clientes creciendo</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/6 group hover:border-[#64189D]/25 transition-colors">
                <div className="text-3xl font-black text-white mb-1">7</div>
                <div className="text-sm text-[#666]">Nodos operando</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/6 group hover:border-[#64189D]/25 transition-colors">
                <div className="text-3xl font-black text-[#9b4dff] mb-1">2026</div>
                <div className="text-sm text-[#666]">Superiores desde 2026</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/6 group hover:border-[#64189D]/25 transition-colors">
                <div className="text-3xl font-black text-white mb-1">99.997%</div>
                <div className="text-sm text-[#666]">Uptime histórico</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action — Mega Card */}
        <section className="py-20 px-6 bg-[#080808] border-t border-white/5">
          <div className="max-w-6xl mx-auto reveal-up">
            <div className="relative overflow-hidden rounded-3xl border border-[#9b4dff]/25 bg-gradient-to-br from-[#100818] via-[#0d0614] to-[#0a0a0a] p-10 md:p-14">
              {/* Background glows */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#9b4dff]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#64189D]/8 rounded-full blur-[100px] pointer-events-none" />
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9b4dff]/60 to-transparent" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                {/* Left — Text */}
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#9b4dff]/10 border border-[#9b4dff]/25 text-[#cdbcff] text-xs font-black uppercase tracking-widest mb-5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Oferta de lanzamiento
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    Empieza hoy con<br/>
                    <span className="text-[#9b4dff]">descuento exclusivo</span>
                  </h2>
                  <p className="text-[#888] text-lg leading-relaxed max-w-lg">
                    Prueba nuestros servidores dedicados con infraestructura de punta. Rendimiento real, sin contratos largos, con soporte que responde.
                  </p>
                </div>

                {/* Right — Buttons */}
                <div className="flex flex-col gap-3 lg:items-end">
                  {/* Coupon button */}
                  <button
                    id="copy-coupon-btn"
                    onClick={handleCopy}
                    className="group relative flex items-center gap-3 bg-[#0f0f0f] border border-[#9b4dff]/30 hover:border-[#9b4dff]/60 rounded-2xl px-6 py-4 transition-all duration-200 hover:bg-[#9b4dff]/5 w-full lg:w-auto"
                  >
                    {/* Ticket icon badge */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#9b4dff]/15 border border-[#9b4dff]/25 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-[#666] font-bold uppercase tracking-widest mb-0.5">Cupón de descuento</div>
                      <div className="text-white font-black text-base tracking-wider font-mono">ASTRALIXNODES2026</div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {copied ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                          Copiado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[#666] group-hover:text-[#9b4dff] text-xs font-bold transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          Copiar
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Go to dedicado button */}
                  <a
                    href="/dedicado"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#7b1dc2] to-[#64189D] hover:from-[#9b4dff] hover:to-[#7b1dc2] text-white font-black text-base rounded-2xl px-8 py-4 transition-all duration-200 shadow-[0_0_40px_rgba(155,77,255,0.2)] hover:shadow-[0_0_50px_rgba(155,77,255,0.35)] w-full lg:w-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                    Ver planes Dedicados
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
