'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const billingOptions = [
  { label: 'Monthly', discount: 0 },
  { label: 'Quarterly', discount: 10 },
  { label: 'Annually', discount: 20 },
]

export default function PricingSection() {
  const [billingIndex, setBillingIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    if (!sectionRef.current) return

    // Animar las tarjetas progresivamente
    gsap.fromTo('.pricing-card', 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      }
    )

    // Efecto de spotlight/glow en el background
    gsap.fromTo('.pricing-glow',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center'
        }
      }
    )
  }, { scope: sectionRef })

  // Animar los números cuando cambian (Counter)
  useEffect(() => {
    priceRefs.current.forEach((ref, index) => {
      if (ref) {
        const targetVal = parseFloat(getPrice(plans[index].price))
        gsap.to(ref, {
          innerHTML: targetVal,
          duration: 0.8,
          snap: { innerHTML: 0.01 },
          ease: 'power2.out',
          onUpdate: function() {
            // Force 2 decimal places during animation
            ref.innerHTML = parseFloat(this.targets()[0].innerHTML).toFixed(2)
          }
        })
      }
    })
  }, [billingIndex])

  const getPrice = (basePrice: number) => {
    const discount = billingOptions[billingIndex].discount
    return (basePrice * (1 - discount / 100)).toFixed(2)
  }

  return (
    <section id="pricing" ref={sectionRef} className="relative bg-[#0a0a0f] py-24 overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[radial-gradient(ellipse_at_top,rgba(100,24,157,0.06),transparent_60%)]" />
      </div>

      <div className="relative max-w-[87.5rem] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#A855F7] text-sm font-semibold uppercase tracking-widest mb-3">Pricing Plans</p>
          <h2 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tight">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Flexible plans that scale with your needs. All plans include DDoS protection and instant setup.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-1 mt-8 bg-[#13111a] border border-[#64189D]/10 rounded-xl p-1 max-w-sm mx-auto">
            {billingOptions.map((option, idx) => (
              <button
                key={option.label}
                onClick={() => setBillingIndex(idx)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billingIndex === idx
                    ? 'bg-gradient-to-r from-[#64189D] to-[#8B3DC4] text-white shadow-lg shadow-[#64189D]/20'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {option.label}
                {option.discount > 0 && (
                  <span className={`ml-1.5 text-[10px] font-bold ${billingIndex === idx ? 'text-white/80' : 'text-[#A855F7]'}`}>
                    -{option.discount}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card relative flex flex-col p-6 rounded-2xl border transition-all duration-300 card-hover ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#64189D]/15 to-[#13111a] border-[#64189D]/40 shadow-lg shadow-[#64189D]/10'
                  : 'bg-[#13111a] border-[#64189D]/10 hover:border-[#64189D]/25'
              }`}
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.5s ease-out' }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#64189D] to-[#A855F7] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                <p className="text-white/40 text-sm mt-1">{plan.ram} RAM Server</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-white/40 text-lg">€</span>
                  <span 
                    ref={el => { priceRefs.current[index] = el }} 
                    className="text-white font-black text-5xl"
                  >
                    {getPrice(plan.price)}
                  </span>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>
                {billingOptions[billingIndex].discount > 0 && (
                  <p className="text-[#A855F7] text-xs mt-1 font-medium">
                    Save {billingOptions[billingIndex].discount}% with {billingOptions[billingIndex].label.toLowerCase()} billing
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <svg className="w-4 h-4 text-[#A855F7] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={`block w-full text-center py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#64189D] to-[#8B3DC4] text-white hover:shadow-lg hover:shadow-[#64189D]/30 hover:-translate-y-0.5'
                    : 'bg-[#64189D]/10 text-[#C084FC] border border-[#64189D]/20 hover:bg-[#64189D]/20 hover:border-[#64189D]/40'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-10">
          <p className="text-white/30 text-sm">
            All plans include a 48-hour money-back guarantee. Need a custom plan?{' '}
            <Link href="#" className="text-[#A855F7] hover:text-[#C084FC] underline underline-offset-2 transition-colors">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
