import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils';

gsap.registerPlugin(ScrollTrigger);

let triggers: ScrollTrigger[] = [];

export function initProcessScroll(): void {
  const section = document.getElementById('process');
  const steps = document.querySelectorAll('.process__step');
  if (!section || steps.length === 0) return;

  if (prefersReducedMotion()) {
    gsap.set(steps, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(steps, { opacity: 0, y: 60 });

  const step0 = steps[0]!;
  const step1 = steps[1]!;
  const step2 = steps[2]!;

  const pinTrigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: 0.5,
    animation: gsap.timeline()
      .to(step0, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(step1, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.1')
      .to(step2, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.1'),
  });

  triggers.push(pinTrigger);

  let resizeTimer: ReturnType<typeof setTimeout>;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };
  window.addEventListener('resize', onResize);

  triggers.push({
    kill: () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    },
  } as ScrollTrigger);
}

export function cleanupProcessScroll(): void {
  triggers.forEach((t) => t.kill());
  triggers = [];
}
