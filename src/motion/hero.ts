import gsap from 'gsap';
import { prefersReducedMotion } from '../utils';

export function initHeroMotion(): void {
  const eyebrow = document.querySelector('.hero__eyebrow');
  const title = document.querySelector('.hero__title');
  const subtitle = document.querySelector('.hero__subtitle');
  const cta = document.querySelector('.hero__cta');
  const scrollHint = document.querySelector('.hero__scroll-hint');

  if (!eyebrow || !title || !cta) return;

  if (prefersReducedMotion()) {
    gsap.set([eyebrow, title, subtitle, cta, scrollHint], {
      opacity: 1,
      y: 0,
    });
    return;
  }

  gsap.set([eyebrow, title, subtitle, cta, scrollHint], {
    opacity: 0,
    y: 30,
  });

  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(eyebrow, {
    opacity: 0.7,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
  })
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .to(subtitle, {
      opacity: 0.85,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .to(scrollHint, {
      opacity: 0.5,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    }, '-=0.2');
}
