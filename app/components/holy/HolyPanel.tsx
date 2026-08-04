'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HolyPanel() {
  const panelFeatures = [
    {
      id: 'subdomains',
      title: 'Subdominios',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      desc: 'Crea subdominios más rápido de lo que tardas en decidir qué comer. Tu propia IP con letras, ¡pero sin tener que recordar números complicados!',
      img: '/assets/images/panel-console.png' // Mocked paths for demo
    },
    {
      id: 'flags',
      title: 'Custom Flags',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
        </svg>
      ),
      desc: 'Configura las flags de arranque (startup flags) de tu servidor de Minecraft de manera sencilla y optimiza el rendimiento del recolector de basura de Java.',
      img: '/assets/images/panel-main.png'
    },
    {
      id: 'editor',
      title: 'Editor de Archivos',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      ),
      desc: 'Edita tus configuraciones desde el navegador con nuestro editor de archivos con resaltado de sintaxis integrado.',
      img: '/assets/images/panel-editor.png'
    },
    {
      id: 'backups',
      title: 'Copias de Seguridad',
      icon: (
        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
        </svg>
      ),
      desc: 'Programa copias de seguridad automáticas y protege los datos de tus jugadores ante cualquier eventualidad.',
      img: '/assets/images/panel-main.png'
    }
  ]

  const [activeTab, setActiveTab] = useState(panelFeatures[0])

  return (
    <section id="panelshowcase" className="bg-[#101010] py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#64189D]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[87.5rem] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight text-white">
            UN <span className="text-[#64189D]">PANEL</span> QUE SIMPLEMENTE{' '}
            <span className="inline-block bg-[#64189D] text-white px-5 py-1 rounded-lg ml-1 rotate-2 shadow-lg shadow-[#64189D]/20">
              FUNCIONA
            </span>
          </h2>
          <p className="text-white/50 text-center text-sm max-w-3xl mx-auto mt-6">
            Un panel de control rápido, claro y potente que te simplifica todo desde el primer clic. Construido sobre Pterodactyl, mejorado para ti.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-16">
          {/* Sidebar Tabs */}
          <div className="lg:w-[22rem] flex-shrink-0 flex flex-col gap-2 max-h-[37.5rem] overflow-y-auto pr-2 scrollbar-thin">
            {panelFeatures.map((feat) => (
              <button
                key={feat.id}
                onClick={() => setActiveTab(feat)}
                className={`relative flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 overflow-hidden ${
                  activeTab.id === feat.id 
                    ? 'bg-[#64189D]/15 border border-[#64189D]/30 shadow-lg shadow-[#64189D]/10' 
                    : 'bg-transparent hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={`flex-shrink-0 transition-colors ${activeTab.id === feat.id ? 'text-[#A855F7]' : 'text-white/40'}`}>
                  {feat.icon}
                </span>
                <span className={`text-sm font-bold transition-colors ${activeTab.id === feat.id ? 'text-white' : 'text-white/60'}`}>
                  {feat.title}
                </span>
                
                {/* Active Indicator Line */}
                {activeTab.id === feat.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#64189D] to-[#A855F7]" />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col min-h-[400px]"
          >
            <div className="bg-[#180228] rounded-2xl p-6 md:p-8 mb-8 border border-[#64189D]/20 shadow-xl shadow-[#64189D]/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex-shrink-0 text-[#A855F7]">
                  {activeTab.icon}
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-wider">
                  {activeTab.title}
                </h3>
              </div>
              <div className="w-full h-px bg-white/10 mb-4" />
              <p className="text-white/70 text-base leading-relaxed">
                {activeTab.desc}
              </p>
            </div>

            {/* Image Showcase */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/50 group shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={activeTab.img} 
                  alt={activeTab.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
