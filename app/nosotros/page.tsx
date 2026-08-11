'use client';
import React, { useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NosotrosPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo('.hero-anim', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
    
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
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">Equipo Astralix</h1>
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

        <section className="py-20 px-6 bg-[#0b0b0b] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-[#64189D] text-center mb-4">Personal</h2>
            <p className="text-[#9b9b9b] text-center max-w-3xl mx-auto mb-10">Nuestro equipo está organizado en CEO, Developer y Support para cubrir visión, producto y atención.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#111] border border-[#4a1b7b]/40 rounded-3xl p-8 shadow-[0_20px_60px_rgba(100,24,157,0.12)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-3xl bg-[#64189D] flex items-center justify-center text-2xl font-black text-white">CJ</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#cdbcff]/80 mb-1">CEO</p>
                    <h3 className="text-2xl font-bold text-white">Carlos Jahir</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#64189D]/15 text-[#cdbcff] text-xs font-semibold">Founder</span>
                  <span className="px-3 py-1 rounded-full bg-[#ffffff]/10 text-white text-xs font-semibold">Visión</span>
                </div>
                <p className="text-[#bbb] leading-relaxed">Impulsa la visión general del servicio y toma decisiones clave para que AstralixNodes crezca con el estándar de calidad que piden las comunidades.</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-white">CJ</div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#888]">Discord</p>
                    <p className="font-bold text-white">CJ#0001</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-3xl bg-[#2d0f45] flex items-center justify-center text-2xl font-black text-white">DV</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#cdbcff]/80 mb-1">Developer</p>
                    <h3 className="text-2xl font-bold text-white">Desarrollo</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#ffffff]/10 text-white text-xs font-semibold">Backend</span>
                  <span className="px-3 py-1 rounded-full bg-[#ffffff]/10 text-white text-xs font-semibold">Frontend</span>
                </div>
                <p className="text-[#bbb] leading-relaxed">Diseña y mantiene los servicios y las integraciones que hacen posible que tus proyectos funcionen sin caídas ni complicaciones.</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-white">DV</div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#888]">Discord</p>
                    <p className="font-bold text-white">Dev#2202</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-3xl bg-[#241436] flex items-center justify-center text-2xl font-black text-white">SP</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#cdbcff]/80 mb-1">Support</p>
                    <h3 className="text-2xl font-bold text-white">Atención</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#ffffff]/10 text-white text-xs font-semibold">24/7</span>
                  <span className="px-3 py-1 rounded-full bg-[#64189D]/15 text-[#cdbcff] text-xs font-semibold">Comunidad</span>
                </div>
                <p className="text-[#bbb] leading-relaxed">Atiende dudas, resuelve incidencias y mantiene comunicación directa con clientes y creadores para que todo funcione sin ruido.</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-white">SP</div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#888]">Discord</p>
                    <p className="font-bold text-white">Support#7788</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Por qué HolyHosting? / Stats */}
        <section className="py-20 px-6 bg-[#0b0b0b] border-t border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-6 bg-[#0f0f0f] rounded-2xl border border-white/6">
              <h3 className="text-3xl font-extrabold text-[#64189D] mb-4">¿Por qué AstralixNodes?</h3>
              <p className="text-[#bfbfbf] mb-6">Con más de una década alojando servidores, sabemos exactamente lo que necesitas.</p>
              <a href="/vps" className="inline-block bg-[#64189D] text-white font-bold px-6 py-3 rounded-full">Comprar un servidor</a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#111] border border-white/6">
                <div className="text-2xl font-bold text-white">+50.000</div>
                <div className="text-sm text-[#bfbfbf]">Clientes satisfechos</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#111] border border-white/6">
                <div className="text-2xl font-bold text-white">80</div>
                <div className="text-sm text-[#bfbfbf]">Nodos operando</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#111] border border-white/6">
                <div className="text-2xl font-bold text-white">2017</div>
                <div className="text-sm text-[#bfbfbf]">Superiores desde 2017</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#111] border border-white/6">
                <div className="text-2xl font-bold text-white">99.997%</div>
                <div className="text-sm text-[#bfbfbf]">Uptime histórico</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-b from-[#0b0412] to-[#150127] py-24 text-center border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-r from-[#64189D]/8 to-[#3a0b4f]/8 blur-[100px] rounded-t-[100%] pointer-events-none"></div>
          </div>
          <div className="reveal-up relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-[#cdbcff] uppercase tracking-tight mb-6">¿Listo para evolucionar?</h2>
            <p className="text-[#999] text-lg mb-10">Experimenta la verdadera potencia de una red diseñada para ganar.</p>
            <a href="/contacto" className="inline-block bg-gradient-to-r from-[#7b1dc2] to-[#64189D] text-white font-bold px-10 py-4 rounded-xl hover:opacity-95 transition-colors shadow-[0_0_30px_rgba(100,24,157,0.28)]">
              Habla con Ventas
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
