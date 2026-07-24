import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import { getMenuCategories, getTotalPlatCount, type ProcessedCategory, type ProcessedMenuItem } from './data/menu';
import { prefersReducedMotion } from './utils';
import { isWebGLAvailable, showFallbackSVG } from './scene/fallback';

let cleanupProcess: (() => void) | null = null;
let cleanupMenuGrid: (() => void) | null = null;

function createCardPlaceholder(): string {
  return `<div class="card-placeholder"></div>`;
}

function createCard(item: ProcessedMenuItem): string {
  const isExternal = item.imageUrl?.startsWith('http') ?? false;
  const imageHtml = item.hasImage && item.imageUrl
    ? `<img
        class="card__image"
        src="${item.imageUrl}"
        alt="${item.name}"
        loading="lazy"
        decoding="async"
        width="400"
        height="400"
        ${isExternal ? 'referrerpolicy="no-referrer"' : ''}
      />`
    : createCardPlaceholder();

  return `
    <article class="card" data-has-image="${item.hasImage}">
      <div class="card__image-wrapper">
        ${imageHtml}
      </div>
      <div class="card__info">
        <span class="card__name">${item.name}</span>
        <span class="card__price">${item.price}</span>
      </div>
      ${item.description !== item.name
        ? `<p class="card__description">${item.description}</p>`
        : ''}
    </article>
  `;
}

function createCategory(category: ProcessedCategory): string {
  const cards = category.items.map(createCard).join('');
  return `
    <div class="menu__category" data-category="${category.slug}">
      <div class="menu__category-header">
        <h3 class="menu__category-name">${category.name}</h3>
        <span class="menu__category-count">${category.count} plats</span>
      </div>
      <div class="menu__grid">
        ${cards}
      </div>
    </div>
  `;
}

function createProcessStep(
  number: string,
  title: string,
  description: string,
  imageSrc: string | null
): string {
  const imageHtml = imageSrc
    ? `<div class="process__step-image">
        <img src="${imageSrc}" alt="${title}" loading="lazy" decoding="async" width="400" height="400" />
      </div>`
    : `<div class="process__step-image"></div>`;

  return `
    <div class="process__step">
      <span class="process__step-number">${number}</span>
      ${imageHtml}
      <h3 class="process__step-title">${title}</h3>
      <p class="process__step-desc">${description}</p>
    </div>
  `;
}

function renderMenu(): void {
  const container = document.getElementById('menu-categories');
  const countEl = document.getElementById('menu-count');
  if (!container || !countEl) return;

  const categories = getMenuCategories();
  countEl.textContent = String(getTotalPlatCount());
  container.innerHTML = categories.map(createCategory).join('');
}

function renderProcess(): void {
  const container = document.getElementById('process-steps');
  if (!container) return;

  container.innerHTML = [
    createProcessStep('01', 'Pétrissage', 'La pâte est pétrie à la main, chaque jour.', '/photos/unnamed%20(2).jpg'),
    createProcessStep('02', 'Façonnage', 'Chaque pizza, calzone, pasticcio est façonné à la main.', '/photos/unnamed%20(3).jpg'),
    createProcessStep('03', 'Cuisson au four', 'Le four à bois donne cette saveur unique — El Horno.', '/photos/unnamed.jpg'),
  ].join('');
}

function initHeroSceneLazy(): void {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  if (prefersReducedMotion() || !isWebGLAvailable()) {
    showFallbackSVG(canvas.parentElement ?? canvas);
    return;
  }

  import('./scene/hero-oven').then(({ initHeroScene }) => {
    initHeroScene(canvas);
  });
}

function initMotionLazy(): void {
  if (prefersReducedMotion()) {
    document.body.setAttribute('data-reduced-motion', '');
    return;
  }

  import('./motion/hero').then(({ initHeroMotion }) => {
    initHeroMotion();
  });

  import('./motion/process').then(({ initProcessScroll, cleanupProcessScroll }) => {
    initProcessScroll();
    cleanupProcess = cleanupProcessScroll;
  });

  import('./motion/menu-grid').then(({ initMenuGridReveals, cleanupMenuGridReveals }) => {
    initMenuGridReveals();
    cleanupMenuGrid = cleanupMenuGridReveals;
  });
}

function initHeroSlideshow(): void {
  if (prefersReducedMotion()) return;

  const slides = document.querySelectorAll<HTMLImageElement>('.hero__slide');
  if (slides.length <= 1) return;

  let current = 0;

  setInterval(() => {
    const prev = slides[current];
    current = (current + 1) % slides.length;
    const next = slides[current];
    if (prev) prev.classList.remove('hero__slide--active');
    if (next) next.classList.add('hero__slide--active');
  }, 5000);
}

function init(): void {
  renderMenu();
  renderProcess();
  initHeroSceneLazy();
  initHeroSlideshow();
  initMotionLazy();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanupProcess?.();
    cleanupMenuGrid?.();
  });
}
