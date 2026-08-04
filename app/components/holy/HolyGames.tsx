'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HolyGames() {
  const creators = [
    { name: 'Shadoune', role: 'CREADOR DE CONTENIDO', image: '/assets/images/shadoune.png', desc: 'Conocido como el francés, se destaca por su participar en eventos de Minecraft de alto nivel.', url: 'https://www.instagram.com/shadoune666' },
    { name: 'Conterstine', role: 'CREADOR DE CONTENIDO', image: '/assets/images/conterstine.png', desc: 'Destacado por sus series de Minecraft Hardcore y su participación en Elitecraft.', url: 'https://twitter.com/Conterstine' },
    { name: 'Crisgreen', role: 'CREADOR DE CONTENIDO', image: '/assets/images/crisgreen.png', desc: 'Conocido por su creatividad en Minecraft y su participación en series exitosas.', url: 'https://twitter.com/Crisgreen' }
  ]

  return (
    <section className="w-full bg-[#180228] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-4 uppercase">
          CONFIADOS POR <span className="text-[#64189D]">+200 CREADORES</span>
        </h2>
        <p className="text-white/60 text-center mx-auto mb-12 leading-relaxed text-sm max-w-4xl">
          Más de 200 creadores y creadoras confían en AstralixNodes para alojar sus servidores, comunidades y proyectos personalizados, gracias a nuestra infraestructura optimizada.
          {' '}<span className="font-bold text-white">Únete a una comunidad que elige estabilidad y calidad,</span>{' '}
          para llevar sus ideas al siguiente nivel.
        </p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {creators.map((creator, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-[#13111a] rounded-xl overflow-hidden flex flex-col border border-white/5 hover:border-[#64189D]/30 transition-all duration-300 card-hover"
            >
              <div className="bg-[#64189D] flex items-end justify-center h-44 md:h-52 lg:h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative z-10 translate-y-4 hover:translate-y-0 transition-transform duration-300">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    width={192}
                    height={192}
                    className="w-36 md:w-44 lg:w-48 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="py-5 px-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white text-center">{creator.name}</h3>
                <span className="text-[11px] text-[#A855F7] font-bold uppercase tracking-wider text-center mt-0.5">
                  {creator.role}
                </span>
                <p className="text-sm text-white/50 mt-3 text-center flex-1 leading-snug">
                  {creator.desc}
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href={creator.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
