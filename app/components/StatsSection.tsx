'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);

const stats = [
  {
    value: '99.995%',
    label: 'SLA Uptime 2026',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#C8A800" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path></svg>
  },
  {
    value: '+200',
    label: 'Creadores de Contenido',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  },
  {
    value: '+150.000',
    label: 'Servidores Alojados',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="7" rx="1"></rect><rect x="2" y="14" width="20" height="7" rx="1"></rect><line x1="6" y1="6.5" x2="6.01" y2="6.5" strokeWidth="2"></line><line x1="6" y1="17.5" x2="6.01" y2="17.5" strokeWidth="2"></line></svg>
  },
  {
    value: '+8',
    label: 'Años a tu servicio :)',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  },
  {
    value: '+80',
    label: 'Nodos operando',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect></svg>
  },
  {
    value: '+15.000',
    label: 'Miembros en Discord',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>
  }
];

const consoleText = `> Initializing AstralixNodes Core...
> Loading nodes.................... [OK]
> Verifying uptime................. [99.995%]
> Checking active servers.......... [150K+ DETECTED]
> Establishing connection to DB.... [SUCCESS]
> System ready. Welcome to the future of hosting.`;

export default function StatsSection() {
  const container = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLPreElement>(null);

  useGSAP(() => {
    gsap.fromTo('.stat-reveal',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        }
      }
    );

    gsap.to(consoleRef.current, {
      text: consoleText,
      duration: 3,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%'
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="bg-[#101010] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          <div className="rounded-xl overflow-hidden border border-white/10 stat-reveal">
            <div className="bg-[#1f1f1f] px-5 py-3.5 flex items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
              </div>
              <span className="ml-5 text-[#8892b0] text-sm">→ AstralixNodes/Web</span>
            </div>
            <div className="bg-[#0a0a0a] p-5 min-h-[20rem] max-h-[25rem] overflow-auto">
              <pre ref={consoleRef} className="font-mono text-sm leading-relaxed text-[#00ff00] whitespace-pre-wrap break-words"></pre>
            </div>
          </div>

          <div>
            <h2 className="stat-reveal text-4xl font-black uppercase mb-4">
              <span className="text-white">NUESTRAS </span>
              <span className="text-[#64189D]">ESTADÍSTICAS.</span>
            </h2>
            <p className="stat-reveal text-[#888] text-sm leading-relaxed mb-8">
              Estos son solo algunos de nuestros increíbles números, y seguimos esforzándonos cada día para superarlos.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="stat-reveal bg-[#1a1b1b] rounded-lg px-3 py-4 flex items-center gap-3 border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-black text-lg leading-tight truncate">{stat.value}</div>
                    <div className="text-[#999] text-xs mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
