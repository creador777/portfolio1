'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import AvatarViewer from '@/components/AvatarViewer';

const WA_URL = 'https://wa.me/17879449031';
const WA_TEXT =
  'Hola%20V%C3%ADctor%2C%20vi%20la%20edici%C3%B3n%20editorial%20de%20VDesing%20y%20quiero%20una%20p%C3%A1gina%20web';

const GRAIN_SVG =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' seed='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.32'/%3E%3C/svg%3E";

const BODY_TEXT =
  'Diseñador y desarrollador en Puerto Rico. Construyo páginas web a mano —una por una— para negocios, artistas, creadores y músicos que no se conforman con una plantilla. Sin temas reciclados, sin slop genérico: cada sitio una pieza única, dibujada al pixel y entregada lista para operar.';

export default function EditorialHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set('[data-fd-rise]:not([data-fd-rise="title"])', { y: 28, opacity: 0 });
      gsap.set('[data-fd-rise="title"] .word', { y: 32, opacity: 0 });
      gsap.set('[data-fd-fade]', { opacity: 0 });
      gsap.set('[data-fd-rule]', { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set('[data-fd-avatar]', { opacity: 0, scale: 0.94 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to('[data-fd-fade="masthead"]', { opacity: 1, duration: 0.9 }, 0.05)
        .to('[data-fd-rule="top"]', { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.1)
        .to('[data-fd-rise="kicker"]', { y: 0, opacity: 1, duration: 0.9 }, 0.25)
        .to(
          '[data-fd-rise="numeral"]',
          { y: 0, opacity: 1, duration: 1.6, ease: 'expo.out' },
          0.3
        )
        .to(
          '[data-fd-rise="title"] .word',
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.07 },
          0.45
        )
        .to(
          '[data-fd-avatar]',
          { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
          0.55
        )
        .to('[data-fd-rise="pull"]', { y: 0, opacity: 1, duration: 1 }, 0.85)
        .to('[data-fd-rule="bottom"]', { scaleX: 1, duration: 1.1, ease: 'expo.inOut' }, 0.95)
        .to('[data-fd-rise="body"]', { y: 0, opacity: 1, duration: 1 }, 1.0)
        .to('[data-fd-rise="ctas"]', { y: 0, opacity: 1, duration: 0.9 }, 1.15)
        .to('[data-fd-fade="footer"]', { opacity: 1, duration: 0.8 }, 1.25);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        fontFamily: 'var(--font-inter-tight), system-ui, sans-serif',
        color: 'oklch(94% 0.01 80)'
      }}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* DEEP VIGNETTE / ATMOSPHERIC WASH */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 22% 55%, oklch(8% 0.02 60 / 0.55) 0%, oklch(7% 0.01 60 / 0.85) 50%, oklch(5% 0.01 60 / 0.96) 100%)'
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[58%]"
        style={{
          background:
            'linear-gradient(90deg, oklch(6% 0.01 60 / 0.85) 0%, oklch(7% 0.01 60 / 0.55) 60%, transparent 100%)'
        }}
      />

      {/* GRAIN OVERLAY */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: '240px 240px',
          opacity: 0.55
        }}
      />

      {/* TOP RULE */}
      <div
        data-fd-rule="top"
        aria-hidden
        className="absolute left-10 right-10 top-[88px] z-30 h-px"
        style={{ background: 'oklch(78% 0.13 80 / 0.55)' }}
      />

      {/* MASTHEAD */}
      <header
        data-fd-fade="masthead"
        className="absolute left-10 right-10 top-8 z-40 flex items-start justify-between"
      >
        <div className="flex flex-col leading-none">
          <span
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontVariationSettings: '"opsz" 144',
              letterSpacing: '-0.02em',
              fontWeight: 500
            }}
            className="text-[34px]"
          >
            VDesing
            <span style={{ fontFamily: 'var(--font-instrument), serif' }} className="italic">
              {' '}Quarterly
            </span>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono-tight), monospace',
              letterSpacing: '0.32em'
            }}
            className="mt-2 text-[10px] uppercase text-[oklch(78%_0.13_80/0.85)]"
          >
            Anno MMXXVI · Vol. I · San Juan, Puerto Rico
          </span>
        </div>

        <div className="flex flex-col items-end leading-none">
          <span
            style={{
              fontFamily: 'var(--font-mono-tight), monospace',
              letterSpacing: '0.34em'
            }}
            className="flex items-center gap-2 text-[10px] uppercase text-[oklch(94%_0.01_80/0.55)]"
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(75%_0.18_145)]" />
            Editio prima — disponible
          </span>
          <span
            style={{
              fontFamily: 'var(--font-instrument), serif',
              fontStyle: 'italic'
            }}
            className="mt-1 text-[36px] leading-none text-[oklch(78%_0.13_80)]"
          >
            № 01
          </span>
        </div>
      </header>

      {/* MAIN SPREAD: editorial copy LEFT + chibi avatar RIGHT */}
      <main className="relative z-20 mx-auto grid min-h-[100svh] max-w-[1320px] grid-cols-12 items-start gap-8 px-10 pt-[148px] pb-28">
        {/* LEFT — editorial column */}
        <article className="relative col-span-7 col-start-1 max-w-[660px]">
          {/* Numeral I */}
          <span
            data-fd-rise="numeral"
            aria-hidden
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 144',
              fontWeight: 300,
              color: 'oklch(78% 0.13 80 / 0.16)',
              lineHeight: 0.85
            }}
            className="pointer-events-none absolute -top-[72px] -left-[58px] text-[240px]"
          >
            I
          </span>

          {/* Kicker */}
          <span
            data-fd-rise="kicker"
            style={{
              fontFamily: 'var(--font-mono-tight), monospace',
              letterSpacing: '0.34em'
            }}
            className="relative text-[10.5px] uppercase text-[oklch(78%_0.13_80)]"
          >
            Cover Story <span className="mx-3 opacity-50">—</span> Web · Diseño · Puerto Rico
          </span>

          {/* TITLE */}
          <h1
            data-fd-rise="title"
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontVariationSettings: '"opsz" 144',
              letterSpacing: '-0.028em',
              fontWeight: 400,
              lineHeight: 0.93
            }}
            className="mt-6 text-[64px]"
          >
            <span className="word inline-block">Tu</span>{' '}
            <span className="word inline-block">sitio,</span>{' '}
            <span
              className="word inline-block"
              style={{
                fontFamily: 'var(--font-instrument), serif',
                fontStyle: 'italic',
                fontWeight: 400
              }}
            >
              tu mundo,
            </span>{' '}
            <span className="word inline-block">en línea.</span>
          </h1>

          {/* RULE */}
          <div
            data-fd-rule="bottom"
            aria-hidden
            className="mt-8 h-px w-[200px]"
            style={{ background: 'oklch(78% 0.13 80 / 0.7)' }}
          />

          {/* Pull quote inline */}
          <p
            data-fd-rise="pull"
            style={{
              fontFamily: 'var(--font-instrument), serif',
              fontStyle: 'italic',
              lineHeight: 1.15
            }}
            className="mt-6 text-[24px] text-[oklch(94%_0.01_80/0.78)]"
          >
            <span className="text-[oklch(78%_0.13_80)]">“</span>
            Cada negocio merece un sitio que se sienta tan único como su trabajo.
            <span className="text-[oklch(78%_0.13_80)]">”</span>
          </p>

          {/* Body con drop cap */}
          <p
            data-fd-rise="body"
            className="mt-8 max-w-[560px] text-[15.5px] text-[oklch(94%_0.01_80/0.85)]"
            style={{
              fontFamily: 'var(--font-inter-tight), sans-serif',
              lineHeight: 1.65,
              textAlign: 'justify',
              hyphens: 'auto'
            }}
          >
            <span
              aria-hidden
              style={{
                fontFamily: 'var(--font-instrument), serif',
                fontStyle: 'italic',
                color: 'oklch(78% 0.13 80)',
                float: 'left',
                fontSize: '82px',
                lineHeight: 0.85,
                paddingRight: '14px',
                paddingTop: '6px',
                marginBottom: '-4px'
              }}
            >
              {BODY_TEXT.charAt(0)}
            </span>
            {BODY_TEXT.slice(1)}
          </p>

          {/* CTAs editoriales */}
          <div data-fd-rise="ctas" className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`${WA_URL}?text=${WA_TEXT}`}
              target="_blank"
              rel="noopener"
              style={{
                fontFamily: 'var(--font-mono-tight), monospace',
                letterSpacing: '0.3em',
                background: 'oklch(78% 0.13 80)',
                color: 'oklch(8% 0 0)'
              }}
              className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] uppercase transition-transform hover:-translate-y-0.5"
            >
              Send a letter
              <span style={{ fontFamily: 'var(--font-instrument), serif', fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>
                →
              </span>
            </a>
            <a
              href="/#trabajos"
              style={{
                fontFamily: 'var(--font-mono-tight), monospace',
                letterSpacing: '0.3em',
                borderColor: 'oklch(94% 0.01 80 / 0.25)'
              }}
              className="inline-flex items-center gap-3 border px-7 py-3.5 text-[11px] uppercase text-[oklch(94%_0.01_80/0.85)] transition-colors hover:bg-[oklch(94%_0.01_80/0.05)]"
            >
              Read the issue
              <span style={{ fontFamily: 'var(--font-instrument), serif', fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>
                ↓
              </span>
            </a>
          </div>
        </article>

        {/* RIGHT — Avatar chibi 3D */}
        <aside className="col-span-5 col-start-8 flex h-full items-start justify-end">
          <div data-fd-avatar className="relative">
            {/* Frame mark editorial alrededor del avatar */}
            <span
              aria-hidden
              className="absolute -left-6 -top-6 h-10 w-10 border-l border-t"
              style={{ borderColor: 'oklch(78% 0.13 80 / 0.7)' }}
            />
            <span
              aria-hidden
              className="absolute -right-6 -bottom-6 h-10 w-10 border-b border-r"
              style={{ borderColor: 'oklch(78% 0.13 80 / 0.7)' }}
            />
            <AvatarViewer pose="hero" size="lg" ariaLabel="Avatar 3D de Victor — VDesing" />
            {/* Caption editorial */}
            <div
              className="mt-4 flex items-center justify-between gap-3"
              style={{
                fontFamily: 'var(--font-mono-tight), monospace',
                letterSpacing: '0.32em'
              }}
            >
              <span className="text-[9.5px] uppercase text-[oklch(94%_0.01_80/0.45)]">
                Plate I — Self-portrait, MMXXVI
              </span>
              <span
                style={{ fontFamily: 'var(--font-instrument), serif', fontStyle: 'italic', letterSpacing: 0 }}
                className="text-[14px] text-[oklch(78%_0.13_80)]"
              >
                §
              </span>
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER COLOPHON */}
      <footer
        data-fd-fade="footer"
        className="absolute bottom-8 left-10 right-10 z-30 flex items-end justify-between"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono-tight), monospace',
            letterSpacing: '0.34em'
          }}
          className="text-[10px] uppercase text-[oklch(94%_0.01_80/0.45)]"
        >
          Folio I — Cover · iglesia.living@gmail.com
        </span>

        <span
          style={{
            fontFamily: 'var(--font-instrument), serif',
            fontStyle: 'italic'
          }}
          className="hidden text-[14px] text-[oklch(94%_0.01_80/0.55)] md:inline"
        >
          ⁂ &nbsp;Hand-set in San Juan&nbsp; ⁂
        </span>

        <a
          href="tel:+17879449031"
          style={{
            fontFamily: 'var(--font-mono-tight), monospace',
            letterSpacing: '0.34em'
          }}
          className="text-[10px] uppercase text-[oklch(78%_0.13_80)] transition-colors hover:text-[oklch(94%_0.01_80)]"
        >
          (787) 944-9031
        </a>
      </footer>
    </div>
  );
}
