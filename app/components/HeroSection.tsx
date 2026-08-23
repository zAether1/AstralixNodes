'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#08080a] min-h-[500px] md:min-h-[700px] flex flex-col justify-center pt-24 pb-16 border-b border-white/[0.06]">
      {/* Background glow effects - XeroHost style */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_20px_#08080a] z-10"></div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#9000FA]/15 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Particles/Stars effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-[#9000FA] rounded-full blur-[1px]"></div>
        <div className="absolute top-[40%] right-[25%] w-2 h-2 bg-white/40 rounded-full blur-[2px]"></div>
        <div className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 bg-[#9000FA]/50 rounded-full blur-[1px]"></div>
        <div className="absolute top-[60%] right-[10%] w-1 h-1 bg-white/30 rounded-full blur-[1px]"></div>
      </div>

      <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 px-3.5 py-1.5 flex items-center justify-center mx-auto w-fit border border-white/[0.08] text-zinc-300 bg-white/[0.03] backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.06] rounded-full"
          >
            <svg className="h-3.5 w-3.5 mr-2 shrink-0 text-[#9000FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span className="text-[11px] font-bold tracking-wide uppercase">
              Infraestructura Premium
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#ffeded] drop-shadow-lg">
              MINECRAFT HOSTING <br className="hidden md:block" /> DE ALTO RENDIMIENTO
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Servidores de Minecraft con soporte para <strong className="text-white">Java & Bedrock</strong>. 
            Equipados con procesadores de última generación, protección Anti-DDoS y panel de control avanzado.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/minecraft" className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#9000FA] text-white font-semibold transition-all duration-300 hover:bg-[#7b00d6] hover:shadow-[0_0_30px_rgba(144,0,250,0.4)] overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center gap-2">
                Ver Planes
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </Link>
            
            <Link href="https://client.astralixnodes.net" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white font-semibold transition-all duration-300 hover:bg-white/10 border border-white/10 w-full sm:w-auto hover:border-white/20">
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Área de Clientes
            </Link>
          </motion.div>

          {/* Features Grid - XeroHost standard feature cards layout */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {[
              { title: "Java & Bedrock", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path> },
              { title: "Anti-DDoS 480Gbps", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> },
              { title: "NVMe SSD", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path> },
              { title: "Slots Ilimitados", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path> }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-zinc-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    {feature.icon}
                  </svg>
                </div>
                <span className="text-xs font-semibold text-zinc-300 text-center">{feature.title}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
