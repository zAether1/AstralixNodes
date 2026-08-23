'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Comisión del 20%',
    desc: 'Recibe el 20% de cada pago que haga tu referido mientras siga siendo cliente. Ingreso pasivo real y recurrente.',
    color: '#9b4dff',
    badge: 'TOP BENEFICIO',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Pagos Instantáneos',
    desc: 'Sin esperas. En cuanto tu referido paga, la comisión aparece en tu panel. Retira cuando quieras.',
    color: '#f59e0b',
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Soporte Prioritario',
    desc: 'Tú y tus referidos tienen acceso preferencial a nuestro equipo. Canal exclusivo en Discord para afiliados.',
    color: '#10b981',
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Material Gratuito',
    desc: 'Banners, gráficos y copys listos para publicar. Todo lo necesario para promocionar sin esfuerzo.',
    color: '#3b82f6',
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Panel de Analytics',
    desc: 'Visualiza tus clics, conversiones y ganancias en tiempo real. Datos claros para optimizar tu estrategia.',
    color: '#ec4899',
    badge: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Comunidad Exclusiva',
    desc: 'Acceso a un canal privado con otros afiliados, estrategias, novedades y recursos antes que nadie.',
    color: '#8b5cf6',
    badge: null,
  },
];

const steps = [
  {
    num: '01',
    title: 'Regístrate',
    desc: 'Crea tu cuenta de afiliado en menos de 2 minutos. Sin complicaciones.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Obtén tu enlace',
    desc: 'Recibe tu enlace único personalizado para rastrear cada referido.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Comparte',
    desc: 'Publícalo en Discord, redes, streams o donde esté tu comunidad.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Cobra',
    desc: 'Cada vez que alguien compra usando tu enlace, tú ganas. Así de simple.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const requirements = [
  'Tener una cuenta activa en AstralixNodes (o crearla gratis)',
  'Compartir tu enlace de forma honesta y sin spam',
  'Aceptar los términos del programa de afiliados',
];

export default function AfiliadosPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('ASTRALIXNODES2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    gsap.fromTo('.aff-hero-el',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
    );

    gsap.utils.toArray('.aff-reveal').forEach((el: any) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    gsap.utils.toArray('.step-card').forEach((el: any, i: number) => {
      gsap.fromTo(el,
        { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      );
    });

    gsap.utils.toArray('.benefit-card').forEach((el: any, i: number) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          delay: (i % 3) * 0.08,
        }
      );
    });
  }, []);

  return (
    <div className="bg-[#020202] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0320] via-[#020202] to-[#020202]" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#9b4dff]/12 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#64189D]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#f59e0b]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(155,77,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(155,77,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="aff-hero-el inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#9b4dff]/10 border border-[#9b4dff]/30 text-[#cdbcff] text-xs font-black uppercase tracking-widest mb-7">
            <span className="w-2 h-2 rounded-full bg-[#9b4dff] animate-pulse" />
            Programa de Afiliados · AstralixNodes
          </div>

          <h1 className="aff-hero-el text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6">
            Recomienda.<br />
            <span className="bg-gradient-to-r from-[#9b4dff] via-[#c084fc] to-[#f59e0b] bg-clip-text text-transparent">
              Gana real.
            </span>
          </h1>

          <p className="aff-hero-el text-lg md:text-xl text-[#aaa] max-w-2xl mx-auto leading-relaxed mb-10">
            Únete al programa de afiliados de AstralixNodes y convierte cada recomendación en{' '}
            <strong className="text-white">ingresos pasivos recurrentes</strong>. Sin inversión inicial. Sin límites.
          </p>

          <div className="aff-hero-el flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://clientes.astralixnodes.com/affiliates.php"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7b1dc2] to-[#9b4dff] hover:from-[#9b4dff] hover:to-[#c084fc] text-white font-black text-base px-8 py-4 rounded-2xl shadow-[0_0_50px_rgba(155,77,255,0.35)] hover:shadow-[0_0_70px_rgba(155,77,255,0.55)] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Comenzar Ahora — Es Gratis
            </a>
            <a
              href="https://discord.gg/6UMfyMM5pu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.028.016.056.036.074a19.977 19.977 0 0 0 6.066 3.07.077.077 0 0 0 .083-.028 14.09 14.09 0 0 0 1.226-1.994.075.075 0 0 0-.041-.106 13.201 13.201 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.073-3.07.077.077 0 0 0 .036-.073c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Hablar con el equipo
            </a>
          </div>

          {/* Mini stats */}
          <div className="aff-hero-el mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {[
              { val: '20%', label: 'Comisión recurrente' },
              { val: '∞', label: 'Sin límite de referidos' },
              { val: '$0', label: 'Costo de entrada' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white leading-none mb-1">{s.val}</div>
                <div className="text-xs text-[#666] uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" />
      </section>

      <main>
        {/* ── HOW IT WORKS ── */}
        <section className="py-28 px-6 bg-[#020202]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 aff-reveal">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 text-[#cdbcff] border border-white/6 font-bold text-xs tracking-widest uppercase mb-4">Así funciona</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">4 pasos para <span className="text-[#9b4dff]">ganar dinero</span></h2>
              <p className="text-[#666] max-w-xl mx-auto">Sin cursos, sin inversión, sin complicaciones. Solo recomienda y cobra.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="step-card relative bg-[#0a0a0a] border border-white/6 rounded-2xl p-7 hover:border-[#9b4dff]/30 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b4dff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-[#9b4dff]/10 border border-[#9b4dff]/20 flex items-center justify-center text-[#9b4dff] mb-5">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-[#9b4dff] tracking-[0.3em] uppercase mb-2">Paso {step.num}</div>
                  <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-28 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 aff-reveal">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 text-[#cdbcff] border border-white/6 font-bold text-xs tracking-widest uppercase mb-4">Beneficios</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Todo lo que <span className="text-[#9b4dff]">incluye</span></h2>
              <p className="text-[#666] max-w-xl mx-auto">El programa más generoso del mercado hispano de hosting de juegos.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="benefit-card group relative bg-[#0a0a0a] border border-white/6 rounded-2xl p-7 hover:border-white/12 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${b.color}40, transparent)` }}
                  />
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{ background: `${b.color}15` }}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${b.color}15`, color: b.color, border: `1px solid ${b.color}25` }}
                    >
                      {b.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-base font-black text-white">{b.title}</h3>
                        {b.badge && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#9b4dff]/20 border border-[#9b4dff]/30 text-[#cdbcff] uppercase tracking-wider">
                            {b.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#666] text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REQUIREMENTS ── */}
        <section className="py-20 px-6 bg-[#020202] border-t border-white/5">
          <div className="max-w-4xl mx-auto aff-reveal">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 text-[#cdbcff] border border-white/6 font-bold text-xs tracking-widest uppercase mb-4">Requisitos</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Casi <span className="text-[#9b4dff]">sin barreras</span>
              </h2>
              <p className="text-[#666] max-w-xl mx-auto">No pedimos seguidores mínimos, ni experiencia, ni nada raro.</p>
            </div>

            <div className="space-y-3 mb-10">
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#0a0a0a] border border-white/6 rounded-xl px-6 py-4 hover:border-[#9b4dff]/20 transition-colors duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-[#9b4dff]/15 border border-[#9b4dff]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#9b4dff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#ccc] text-sm font-medium">{req}</span>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-black mb-0.5">Eso es todo.</div>
                <div className="text-[#aaa] text-sm">Sin followers mínimos, sin auditorías, sin contratos. Si tienes ganas de recomendar, ya calificas.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL — estilo nosotros ── */}
        <section className="py-20 px-6 bg-[#080808] border-t border-white/5">
          <div className="max-w-6xl mx-auto aff-reveal">
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
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Únete ahora
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                    Empieza hoy y<br/>
                    <span className="text-[#9b4dff]">gana sin límites</span>
                  </h2>
                  <p className="text-[#888] text-lg leading-relaxed max-w-lg">
                    Crea tu cuenta de afiliado, comparte tu enlace con tu comunidad y empieza a recibir comisiones recurrentes del 20%. Sin costo, sin contratos.
                  </p>
                </div>

                {/* Right — Buttons */}
                <div className="flex flex-col gap-3 lg:items-end">
                  {/* Coupon button */}
                  <button
                    id="copy-coupon-aff-btn"
                    onClick={handleCopy}
                    className="group relative flex items-center gap-3 bg-[#0f0f0f] border border-[#9b4dff]/30 hover:border-[#9b4dff]/60 rounded-2xl px-6 py-4 transition-all duration-200 hover:bg-[#9b4dff]/5 w-full lg:w-auto"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#9b4dff]/15 border border-[#9b4dff]/25 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-[#666] font-bold uppercase tracking-widest mb-0.5">Cupón de descuento</div>
                      <div className="text-white font-black text-base tracking-wider font-mono">ASTRALIXNODES2026</div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {copied ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          Copiado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[#666] group-hover:text-[#9b4dff] text-xs font-bold transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copiar
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Main CTA button */}
                  <a
                    href="https://clientes.astralixnodes.com/affiliates.php"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#7b1dc2] to-[#64189D] hover:from-[#9b4dff] hover:to-[#7b1dc2] text-white font-black text-base rounded-2xl px-8 py-4 transition-all duration-200 shadow-[0_0_40px_rgba(155,77,255,0.2)] hover:shadow-[0_0_50px_rgba(155,77,255,0.35)] w-full lg:w-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Crear cuenta de afiliado
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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
