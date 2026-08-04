'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    ram: '2 GB',
    price: 2.50,
    features: [
      '2 GB DDR5 RAM',
      '1 vCPU Core',
      '15 GB NVMe SSD',
      'DDoS Protection',
      'Unlimited Slots',
      '24/7 Support',
    ],
    popular: false,
  },
  {
    name: 'Essential',
    ram: '4 GB',
    price: 5.00,
    features: [
      '4 GB DDR5 RAM',
      '2 vCPU Cores',
      '30 GB NVMe SSD',
      'DDoS Protection',
      'Unlimited Slots',
      'Daily Backups',
      '24/7 Priority Support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    ram: '8 GB',
    price: 10.00,
    features: [
      '8 GB DDR5 RAM',
      '4 vCPU Cores',
      '60 GB NVMe SSD',
      'Advanced DDoS Protection',
      'Unlimited Slots',
      'Hourly Backups',
      'Custom Domain',
      'Priority Support',
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    ram: '16 GB',
    price: 20.00,
    features: [
      '16 GB DDR5 RAM',
      '6 vCPU Cores',
      '120 GB NVMe SSD',
      'Premium DDoS Protection',
      'Unlimited Slots',
      'Real-time Backups',
      'Custom Domain',
      'Dedicated Support Agent',
      'Free Migration',
    ],
    popular: false,
  },
]

const games = [
  { id: 'minecraft', name: 'Minecraft', image: '/assets/images/games/minecraft-cover-widget.png', desc: 'Nuestros planes de Hosting para Servidores de Minecraft son compatibles con todos los mods y plugins.' },
  { id: 'rust', name: 'Rust', image: '/assets/images/games/rust-cover-widget.webp', desc: 'Servidores de Rust de alto rendimiento para una experiencia sin lag.' },
  { id: 'palworld', name: 'Palworld', image: '/assets/images/games/palworld-cover-widget.webp', desc: 'Atrapa y sobrevive en Palworld con el mejor rendimiento y latencia.' },
  { id: 'ark', name: 'ARK', image: '/assets/images/games/ark-cover-widget.png', desc: 'Sobrevive en ARK: Survival Evolved con nuestros potentes servidores.' },
  { id: 'terraria', name: 'Terraria', image: '/assets/images/games/terraria-cover-widget.jpg', desc: 'Explora y construye en Terraria junto a tus amigos 24/7.' },
]

export default function HolyPricing() {
  const [activeGame, setActiveGame] = useState(games[0])

  return (
    <section id="pricing" className="bg-[#0a0a0f] py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#64189D]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#64189D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#13111a] border border-[#64189D]/20 px-8 py-3 rounded-full mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider">
              NUESTROS <span className="text-[#A855F7]">PLANES</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen protección DDoS y soporte 24/7.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className={`relative bg-[#13111a] rounded-2xl border ${plan.popular ? 'border-[#64189D] shadow-lg shadow-[#64189D]/20' : 'border-white/5'} p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#64189D] to-[#A855F7] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  MÁS POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-[#A855F7] font-semibold text-sm mb-6">{plan.ram} RAM</p>
              
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-white/50 text-xl">$</span>
                <span className="text-white font-black text-4xl">{plan.price.toFixed(2)}</span>
                <span className="text-white/50 text-sm">/mes</span>
              </div>

              <div className="w-full h-px bg-white/10 mb-6" />

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <svg className="w-5 h-5 text-[#64189D] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${plan.popular ? 'bg-gradient-to-r from-[#64189D] to-[#8B3DC4] text-white hover:opacity-90' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                Elegir Plan
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Game Selector Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#13111a] rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center"
        >
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="bg-[#64189D]/20 text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              JUEGOS DESTACADOS
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">{activeGame.name}</h3>
                <p className="text-white/60 mb-8 max-w-md">{activeGame.desc}</p>
              </motion.div>
            </AnimatePresence>
            <button className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors uppercase text-sm tracking-wider mt-2">
              Ver todos los juegos
            </button>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scroll-hidden justify-start md:justify-center">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  className={`relative w-24 md:w-32 aspect-[2/3] rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${activeGame.id === game.id ? 'ring-2 ring-[#64189D] scale-105 opacity-100' : 'opacity-50 hover:opacity-80 scale-95 grayscale-[50%]'}`}
                >
                  <Image src={game.image} alt={game.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
