'use client';

import React, { useRef, useMemo } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION, prefersReducedMotion } from '@/lib/gsap';

interface AnimatedHeadingProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  splitBy?: 'words' | 'chars';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
  start?: string;
  blurIn?: boolean;
}

/**
 * Animated heading that splits text into words or characters
 * and reveals them with GSAP stagger animation.
 * Alternative to SplitText — uses React-based splitting.
 */
export default function AnimatedHeading({
  children,
  as: Tag = 'h2',
  className = '',
  splitBy = 'words',
  stagger = 0.06,
  duration = 0.7,
  delay = 0,
  scrollTrigger = true,
  start = MOTION.scroll.start,
  blurIn = true,
}: AnimatedHeadingProps) {
  const container = useRef<HTMLElement>(null);

  const parts = useMemo(() => {
    if (splitBy === 'chars') {
      return children.split('').map((char, i) => ({
        key: `${char}-${i}`,
        content: char === ' ' ? '\u00A0' : char,
        isSpace: char === ' ',
      }));
    }
    return children.split(' ').map((word, i) => ({
      key: `${word}-${i}`,
      content: word,
      isSpace: false,
    }));
  }, [children, splitBy]);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set('.anim-split-unit', { opacity: 1, clearProps: 'all' });
      return;
    }

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: splitBy === 'chars' ? 30 : 50,
      rotateX: 40,
    };

    if (blurIn) {
      fromVars.filter = 'blur(8px)';
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration,
      stagger,
      delay,
      ease: MOTION.ease.out,
    };

    if (scrollTrigger) {
      toVars.scrollTrigger = {
        trigger: container.current,
        start,
        once: true,
      };
    }

    gsap.fromTo('.anim-split-unit', fromVars, toVars);
  }, { scope: container });

  return (
    <Tag ref={container as any} className={`${className}`} style={{ perspective: '800px' }}>
      {parts.map((part) => (
        <span
          key={part.key}
          className="anim-split-unit inline-block"
          style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
        >
          {part.content}
          {splitBy === 'words' && !part.isSpace && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
