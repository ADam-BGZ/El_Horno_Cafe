export function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function showFallbackSVG(container: HTMLElement): void {
  const el = document.createElement('div');
  el.className = 'hero__fallback';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:auto;opacity:0.4;">
      <rect x="20" y="50" width="160" height="90" rx="4" fill="#B14B2C" opacity="0.8"/>
      <rect x="65" y="75" width="50" height="55" rx="2" fill="#16140F"/>
      <rect x="70" y="80" width="40" height="35" rx="1" fill="#e8613a" opacity="0.5"/>
      <rect x="10" y="140" width="180" height="8" rx="2" fill="#8a3a20"/>
      <rect x="85" y="20" width="30" height="30" rx="2" fill="#B14B2C" opacity="0.8"/>
    </svg>
  `;
  container.appendChild(el);
}
