'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HolyFeatures() {
  const comparisons = [
    { name: 'AstralixNodes', price: '0,94', logo: '/icons/AstralixNodes.png', current: true },
    { name: 'Theminecrafthost', price: '2,50', logo: '/assets/images/theminecrafthost.png', current: false },
    { name: 'Sparkedhost', price: '2,59', logo: '/assets/images/sparkedhost.png', current: false },
    { name: 'Bisecthosting', price: '3,00', logo: '/assets/images/bisecthosting.png', current: false },
    { name: 'ApexHosting', price: '3,75', logo: '/assets/images/apexhosting.png', current: false },
    { name: 'Shockbyte', price: '3,99', logo: '/assets/images/shockbyte.png', current: false },
    { name: 'Scalacube', price: '4,99', logo: '/assets/images/scalacube.png', current: false },
  ]

  // Calculate percentage width based on max price to create the bars
  const maxPrice = 5.00
  
  return (
    <section className="bg-[#180228] py-24 px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center uppercase mb-4 tracking-[0.05em]">
          COMPARACIÓN DE <span className="text-[#64189D]">PRECIOS</span>
        </h2>
        <p className="text-white/50 text-sm text-center mb-16 max-w-3xl mx-auto">
          El siguiente cuadro se calculó utilizando especificaciones de hardware similares a las ofrecidas por AstralixNodes.
        </p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-4"
        >
          {comparisons.map((comp, idx) => {
            const priceNum = parseFloat(comp.price.replace(',', '.'))
            const width = (priceNum / maxPrice) * 100

            return (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 sm:min-w-[16rem]">
                  <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-black/20 ${comp.current ? '' : 'grayscale brightness-90'}`}>
                    <Image src={comp.logo} alt={comp.name} width={32} height={32} className="object-contain w-full h-full" />
                  </div>
                  <span className={`${comp.current ? 'text-[#A855F7] font-black' : 'text-white/80 font-medium'} text-sm sm:text-base`}>
                    {comp.name}
                  </span>
                  <span className={`${comp.current ? 'text-[#A855F7]' : 'text-white/60'} text-xs font-bold sm:hidden ml-auto`}>
                    ${comp.price}/gb
                  </span>
                </div>
                
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 h-8 bg-black/40 rounded-md overflow-hidden relative">
                    <motion.div 
                      className={`absolute top-0 left-0 h-full rounded-md ${comp.current ? 'bg-gradient-to-r from-[#64189D] to-[#A855F7]' : 'bg-white/10'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                    />
                  </div>
                  <span className={`hidden sm:inline ${comp.current ? 'text-[#A855F7] font-black' : 'text-white/60 font-medium'} min-w-[5rem] text-right text-sm tracking-wider`}>
                    ${comp.price}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <p className="text-white/40 text-center mt-12 text-xs">
          Esta información fue revisada y actualizada por última vez en 2026.
        </p>
      </div>
    </section>
  )
}
