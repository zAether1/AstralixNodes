'use client';

import React, { useRef, useCallback } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: 'subtle' | 'normal' | 'strong';
  hoverLift?: boolean;
  borderGlow?: boolean;
  cursorGlow?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Premium glassmorphism card with:
 * - backdrop-filter blur
 * - Border glow on hover
 * - Optional cursor-following light effect
 * - Hover lift animation
 */
export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(144, 0, 250, 0.4)',
  glowIntensity = 'normal',
  hoverLift = true,
  borderGlow = true,
  cursorGlow = true,
  as: Tag = 'div',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const intensityMap = {
    subtle: { blur: 12, bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)' },
    normal: { blur: 16, bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)' },
    strong: { blur: 24, bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
  };

  const config = intensityMap[glowIntensity];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cursorGlow || !glowRef.current || !cardRef.current || prefersReducedMotion()) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      opacity: 1,
      x: x - 150,
      y: y - 150,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [cursorGlow]);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

    if (hoverLift) {
      gsap.to(cardRef.current, {
        y: -4,
        duration: 0.4,
        ease: MOTION.ease.out,
      });
    }

    if (borderGlow) {
      gsap.to(cardRef.current, {
        borderColor: glowColor.replace(/[\d.]+\)$/, '0.3)'),
        boxShadow: `0 0 30px ${glowColor.replace(/[\d.]+\)$/, '0.15)')}, inset 0 1px 0 rgba(255,255,255,0.05)`,
        duration: 0.4,
        ease: MOTION.ease.out,
      });
    }
  }, [hoverLift, borderGlow, glowColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

    if (hoverLift) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.4,
        ease: MOTION.ease.out,
      });
    }

    if (borderGlow) {
      gsap.to(cardRef.current, {
        borderColor: config.border,
        boxShadow: 'none',
        duration: 0.4,
        ease: MOTION.ease.out,
      });
    }

    if (cursorGlow && glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  }, [hoverLift, borderGlow, cursorGlow, config.border, glowColor]);

  return React.createElement(
    Tag as any,
    {
      ref: cardRef,
      className: `relative overflow-hidden rounded-2xl transition-colors ${className}`,
      style: {
        backdropFilter: `blur(${config.blur}px) saturate(1.6)`,
        WebkitBackdropFilter: `blur(${config.blur}px) saturate(1.6)`,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
      },
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    <>
      {cursorGlow && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-[300px] h-[300px] rounded-full opacity-0"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </>
  );
}
