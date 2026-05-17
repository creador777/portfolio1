'use client';

import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/lib/scroll-store';

const SECTIONS = [
  {
    label: '01 — INTRO',
    title: 'Architect of\nimmersive web\ndimensions.',
    body: 'Diseñador y desarrollador en Puerto Rico. Construyo sitios que se sienten como lugares, no como páginas.'
  },
  {
    label: '02 — APPROACH',
    title: 'Cada pixel\nestá donde\ndebe estar.',
    body: 'Three.js, GSAP, shaders custom, modelado en Blender. Cero plantillas. Cada sitio una pieza única.'
  },
  {
    label: '03 — STACK',
    title: 'Stack premium\npara marcas\nque importan.',
    body: 'Next.js 15 · React Three Fiber · GSAP · WebGL2 · Gaussian Splatting · GLSL · Blender pipeline completo.'
  },
  {
    label: '04 — WORK',
    title: 'Trabajos\nrecientes.',
    body: 'Samuray Tattoo, Reyes Gas, Velvet, IglesIA, Ymusic, IsaLaValora. Cada uno con su propio mundo.'
  },
  {
    label: '05 — CONTACT',
    title: 'Construyamos\nalgo que valga\nla pena compartir.',
    body: 'iglesia.living@gmail.com · WhatsApp Puerto Rico'
  }
];

export default function Overlay() {
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const t = useScrollStore.getState().progress;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${t})`;
      }
      sectionsRef.current.forEach((el, i) => {
        if (!el) return;
        const center = (i + 0.5) / SECTIONS.length;
        const dist = Math.abs(t - center);
        const opacity = Math.max(0, 1 - dist * SECTIONS.length * 1.4);
        const ty = (t - center) * 60;
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${ty}px, 0)`;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left bg-gradient-to-r from-gold via-magenta to-violet"
          style={{ transform: 'scaleX(0)', boxShadow: '0 0 12px var(--gold, #d4a850)' }}
        />
      </div>

      <header className="fixed top-6 left-6 right-6 z-40 flex items-center justify-between text-xs mono uppercase tracking-widest text-ink/60">
        <span>VDesing<span className="text-gold">.</span></span>
        <span>2026 · Puerto Rico</span>
      </header>

      <main className="fixed inset-0 z-30 pointer-events-none flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          {SECTIONS.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                sectionsRef.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
              style={{ opacity: 0 }}
            >
              <div className="text-xs mono uppercase tracking-[0.3em] text-gold/80 mb-6">
                {s.label}
              </div>
              <h1 className="serif text-5xl md:text-7xl leading-[0.95] font-medium whitespace-pre-line">
                {s.title}
              </h1>
              <p className="mt-8 max-w-md text-ink/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-6 left-6 right-6 z-40 flex items-center justify-between text-xs mono uppercase tracking-widest text-ink/40">
        <span>Scroll to enter</span>
        <a
          href="mailto:iglesia.living@gmail.com"
          className="pointer-events-auto hover:text-gold transition-colors"
        >
          CLICK TO CONTACT →
        </a>
      </footer>
    </>
  );
}
