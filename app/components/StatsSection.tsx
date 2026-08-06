'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  {
    value: 'Escalable',
    label: 'Infraestructura preparada para crecimiento',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
  },
  {
    value: 'Premium',
    label: 'Servidores optimizados',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
  },
  {
    value: 'DDoS',
    label: 'Protección DDoS activa',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  },
  {
    value: 'Global',
    label: 'Red en expansión',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path></svg>
  },
  {
    value: 'Tiempo Real',
    label: 'Latencia monitoreada',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
  },
  {
    value: '24/7',
    label: 'Soporte técnico',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#64189D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
  }
];

const terminalLines = [
  "> Initializing AstralixNodes Infrastructure...",
  "> Checking network nodes... [OK]",
  "> Loading security modules... [OK]",
  "> Verifying DDoS protection... [ACTIVE]",
  "> Connecting monitoring services... [OK]",
  "> System status: ONLINE"
];

export default function StatsSection() {
  const container = useRef<HTMLDivElement>(null);
  
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLineText, setCurrentLineText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    if (currentLineIndex < terminalLines.length) {
      setIsTyping(true);
      const fullText = terminalLines[currentLineIndex];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setCurrentLineText(fullText.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setDisplayedLines(prev => [...prev, fullText]);
          setCurrentLineText('');
          setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
          }, 400); // pause between lines
        }
      }, 30); // typing speed
      
      return () => clearInterval(typeInterval);
    }
  }, [currentLineIndex, hasStarted]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: container.current,
      start: 'top 75%',
      onEnter: () => setHasStarted(true)
    });

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
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-[#020202] py-24 px-6 border-t border-white/5 overflow-hidden">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#64189D]/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* NOC Terminal */}
          <div className="rounded-xl overflow-hidden border border-white/10 stat-reveal bg-[#10011c]/80 backdrop-blur-md shadow-[0_0_30px_rgba(100,24,157,0.15)] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#64189D]/10 to-transparent pointer-events-none"></div>
            
            <div className="bg-[#1a0a2e] border-b border-[#64189D]/20 px-5 py-3.5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
              </div>
              <span className="text-[#64189D] text-xs font-mono opacity-80">root@astralix-noc:~</span>
            </div>
            
            <div className="p-6 min-h-[20rem] font-mono text-[13px] md:text-sm leading-relaxed text-[#c084fc] whitespace-pre-wrap break-words relative z-10">
              {displayedLines.map((line, index) => (
                 <div key={index} className="mb-2 text-white/90">
                   {line.includes('[OK]') ? (
                      <>
                        {line.replace('[OK]', '')}
                        <span className="text-[#28ca42] font-bold">[OK]</span>
                      </>
                   ) : line.includes('[ACTIVE]') ? (
                      <>
                        {line.replace('[ACTIVE]', '')}
                        <span className="text-[#a855f7] font-bold drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]">[ACTIVE]</span>
                      </>
                   ) : line.includes('ONLINE') ? (
                      <>
                        {line.replace('ONLINE', '')}
                        <span className="text-[#28ca42] font-bold animate-pulse drop-shadow-[0_0_5px_rgba(40,202,66,0.8)]">ONLINE</span>
                      </>
                   ) : (
                     line
                   )}
                 </div>
              ))}
              
              {isTyping && (
                <div className="inline-block text-white/90">
                  {currentLineText}
                  <span className="inline-block w-2 h-4 ml-1 align-middle bg-[#a855f7] animate-pulse"></span>
                </div>
              )}
              
              {!isTyping && currentLineIndex >= terminalLines.length && (
                <div className="mt-2 text-[#a855f7] animate-pulse font-bold">_</div>
              )}
            </div>
          </div>

          {/* Stats Content */}
          <div>
            <h2 className="stat-reveal text-4xl font-black uppercase mb-4">
              <span className="text-white">INFRAESTRUCTURA </span>
              <span className="text-[#64189D]">DE NUEVA GENERACIÓN.</span>
            </h2>
            <p className="stat-reveal text-[#888] text-sm leading-relaxed mb-8">
              En AstralixNodes, hemos construido una red sólida y segura diseñada específicamente para las necesidades actuales de alojamiento. Nos enfocamos en la calidad, seguridad y estabilidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="stat-reveal bg-[#120a1c] hover:bg-[#180a26] transition-colors rounded-xl px-4 py-5 flex items-center gap-4 border border-[#64189D]/20 shadow-[0_0_15px_rgba(100,24,157,0.05)]">
                  <div className="w-12 h-12 rounded-lg bg-[#64189D]/10 flex items-center justify-center flex-shrink-0 border border-[#64189D]/30">
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-black text-lg leading-tight truncate">{stat.value}</div>
                    <div className="text-[#a1a1aa] text-xs mt-1">{stat.label}</div>
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
