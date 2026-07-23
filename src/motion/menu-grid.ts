import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils';

gsap.registerPlugin(ScrollTrigger);

let triggers: ScrollTrigger[] = [];

export function initMenuGridReveals(): void {
  const categories = document.querySelectorAll('.menu__category');
  if (categories.length === 0) return;

  if (prefersReducedMotion()) {
    gsap.set('.card', { opacity: 1, y: 0, clipPath: 'none' });
    return;
  }

  gsap.set('.card', { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' });

  categories.forEach((cat) => {
    const cards = cat.querySelectorAll('.card');
    if (cards.length === 0) return;

    const st = ScrollTrigger.create({
      trigger: cat,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });
    triggers.push(st);
  });

  initCardHover();
}

function initCardHover(): void {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });
}

export function cleanupMenuGridReveals(): void {
  triggers.forEach((t) => t.kill());
  triggers = [];
}
