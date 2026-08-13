'use client';

import React, { useRef, useCallback } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/**
 * Button with magnetic hover effect — follows cursor with slight displacement.
 * Automatically disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Tag = 'button',
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || isTouchDevice || prefersReducedMotion()) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [strength, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current || isTouchDevice || prefersReducedMotion()) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  }, [isTouchDevice]);

  const props: any = {
    ref: buttonRef,
    className: `inline-block ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: { willChange: 'transform' },
  };

  if (Tag === 'a') {
    props.href = href;
    props.target = target;
    props.rel = rel;
  }

  return React.createElement(Tag as any, props, children);
}
