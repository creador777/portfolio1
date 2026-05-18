'use client';

import { useEffect, useRef } from 'react';

const G    = '#39FF8B';
const P    = '#A855F7';
const Y    = '#FFD06B';
const B    = '#60a5fa';
const DIM  = 'rgba(255,255,255,0.30)';
const MONO  = "'JetBrains Mono', ui-monospace, monospace";
const SERIF = "'Fraunces', Georgia, serif";

// ─── Price sections ───────────────────────────────────────────────────────────
// id 'arch' has no preview element — it's the invisible infrastructure cost
// Preview reveals are timed ~0.04 after their corresponding code comment line
const PRICED_REVEALS = [
  { id: 'arch',  label: 'Arquitectura + lógica',  price: 200, t: 0.520 },
  { id: 'nav',   label: 'Nav + sistema de diseño', price: 150, t: 0.638 },
  { id: 'hero',  label: 'Hero + animaciones',       price: 180, t: 0.712 },
  { id: 'cards', label: 'Pricing + SEO + deploy',   price: 150, t: 0.802 },
  { id: 'cta',   t: 0.742 },
  { id: 'card1', t: 0.818 },
  { id: 'card2', t: 0.832 },
] as const;

const TOTAL = 200 + 150 + 180 + 150; // 680

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

// ─── Code lines — the real star ───────────────────────────────────────────────
type Line = { code: string; color: string; t: number; price?: number; revealId?: string; file?: 'types'|'globals'; ln?: number };
const LINES: Line[] = [
  // ── file header ──
  { code: "'use client'",                                              color: Y,   t: 0.001 },
  { code: '',                                                          color: DIM, t: 0.005 },
  { code: "import { useState, useEffect,",                            color: P,   t: 0.035 },
  { code: "         useRef, useCallback } from 'react'",              color: P,   t: 0.045 },
  { code: "import { useRouter }           from 'next/navigation'",    color: P,   t: 0.055 },
  { code: "import Image                   from 'next/image'",         color: P,   t: 0.065 },
  { code: "import Link                    from 'next/link'",          color: P,   t: 0.072 },
  { code: "import { track }               from '@vercel/analytics'",  color: P,   t: 0.080 },
  { code: '',                                                          color: DIM, t: 0.088 },

  // ── TypeScript types ──
  { code: '// ── Types ─────────────────────────────────────────',    color: DIM, t: 0.095 },
  { code: 'type Plan = {',                                            color: G,   t: 0.105 },
  { code: "  id:       'basic' | 'pro' | 'custom'",                  color: B,   t: 0.113 },
  { code: '  name:     string',                                       color: B,   t: 0.120 },
  { code: '  price:    number',                                       color: B,   t: 0.127 },
  { code: '  features: readonly string[]',                            color: B,   t: 0.134 },
  { code: '  popular?: boolean',                                      color: B,   t: 0.141 },
  { code: '}',                                                        color: G,   t: 0.148 },
  { code: '',                                                         color: DIM, t: 0.153 },
  { code: 'interface QuoteState {',                                   color: G,   t: 0.158 },
  { code: '  plan:    Plan | null',                                   color: B,   t: 0.165 },
  { code: '  addons:  string[]',                                      color: B,   t: 0.172 },
  { code: '  total:   number',                                        color: B,   t: 0.179 },
  { code: '  sent:    boolean',                                       color: B,   t: 0.185 },
  { code: '}',                                                        color: G,   t: 0.191 },
  { code: '',                                                         color: DIM, t: 0.196 },

  // ── config & data ──
  { code: '// ── Config ────────────────────────────────────────',    color: DIM, t: 0.202 },
  { code: "const WA_NUMBER  = '17879449031'",                        color: Y,   t: 0.210 },
  { code: "const DEADLINE   = new Date('2026-05-23T23:59:59')",      color: Y,   t: 0.217 },
  { code: "const SITE_URL   = 'https://vdesing.pages.dev'",          color: Y,   t: 0.224 },
  { code: '',                                                         color: DIM, t: 0.229 },
  { code: 'const PLANS: Plan[] = [',                                 color: G,   t: 0.235 },
  { code: "  { id: 'basic', name: 'Básico', price: 680,",            color: B,   t: 0.242 },
  { code: "    features: ['Landing page','Hosting','WhatsApp','SSL'] },", color: B, t: 0.249 },
  { code: "  { id: 'pro',   name: 'Pro',   price: 1280, popular: true,", color: B, t: 0.256 },
  { code: "    features: ['3 páginas','Logo','Video 60s','SEO'] },",  color: B,   t: 0.263 },
  { code: ']',                                                        color: G,   t: 0.269 },
  { code: '',                                                         color: DIM, t: 0.274 },

  // ── utility functions ──
  { code: '// ── Utils ─────────────────────────────────────────',    color: DIM, t: 0.279 },
  { code: 'function buildWAMessage(state: QuoteState): string {',     color: P,   t: 0.286 },
  { code: "  if (!state.plan) return ''",                             color: DIM, t: 0.293 },
  { code: '  const lines = [',                                        color: DIM, t: 0.299 },
  { code: '    `Plan: ${state.plan.name} ($${state.plan.price})`,',  color: Y,   t: 0.306 },
  { code: '  ]',                                                      color: DIM, t: 0.311 },
  { code: '  if (state.addons.length > 0)',                           color: DIM, t: 0.317 },
  { code: '    lines.push(`Extras: ${state.addons.join(", ")}`)',    color: Y,   t: 0.323 },
  { code: '  lines.push(`Total estimado: $${state.total}`)',         color: Y,   t: 0.329 },
  { code: '  return encodeURIComponent(lines.join("\\n"))',           color: DIM, t: 0.335 },
  { code: '}',                                                        color: P,   t: 0.340 },
  { code: '',                                                         color: DIM, t: 0.345 },

  // ── custom hooks ──
  { code: '// ── Custom Hooks ───────────────────────────────────',   color: DIM, t: 0.351 },
  { code: 'function useScrollNav() {',                                color: P,   t: 0.358 },
  { code: '  const [scrolled, setScrolled] = useState(false)',       color: B,   t: 0.364 },
  { code: '  useEffect(() => {',                                      color: DIM, t: 0.370 },
  { code: '    const fn = () => setScrolled(window.scrollY > 60)',   color: B,   t: 0.376 },
  { code: "    window.addEventListener('scroll', fn, { passive: true })", color: B, t: 0.382 },
  { code: "    return () => window.removeEventListener('scroll', fn)", color: B, t: 0.388 },
  { code: '  }, [])',                                                  color: DIM, t: 0.393 },
  { code: '  return scrolled',                                        color: G,   t: 0.398 },
  { code: '}',                                                        color: P,   t: 0.403 },
  { code: '',                                                         color: DIM, t: 0.408 },
  { code: 'function useCountdown(deadline: Date) {',                  color: P,   t: 0.413 },
  { code: '  const [left, setLeft] = useState({ d:0,h:0,m:0,s:0 })', color: B,   t: 0.419 },
  { code: '  useEffect(() => {',                                      color: DIM, t: 0.425 },
  { code: '    const tick = () => {',                                 color: DIM, t: 0.430 },
  { code: '      const diff = Math.max(0, deadline.getTime()-Date.now())', color: B, t: 0.436 },
  { code: '      setLeft({ d: Math.floor(diff/86400000),',           color: B,   t: 0.442 },
  { code: '               h: Math.floor(diff%86400000/3600000),',    color: B,   t: 0.447 },
  { code: '               m: Math.floor(diff%3600000/60000),',       color: B,   t: 0.452 },
  { code: '               s: Math.floor(diff%60000/1000) })',        color: B,   t: 0.457 },
  { code: '    }',                                                    color: DIM, t: 0.461 },
  { code: '    tick()',                                               color: DIM, t: 0.465 },
  { code: '    const id = setInterval(tick, 1000)',                   color: B,   t: 0.469 },
  { code: '    return () => clearInterval(id)',                       color: B,   t: 0.473 },
  { code: '  }, [deadline])',                                         color: DIM, t: 0.477 },
  { code: '  return left',                                            color: G,   t: 0.481 },
  { code: '}',                                                        color: P,   t: 0.485 },
  { code: '',                                                         color: DIM, t: 0.490 },

  // ── component start  +$200 ──
  { code: '// ── Component ──────────────────────────────',         color: DIM, t: 0.495, price: 200 },
  { code: 'export default function VDesingPage() {',                  color: P,   t: 0.503 },
  { code: '  const scrolled   = useScrollNav()',                      color: B,   t: 0.510 },
  { code: '  const countdown  = useCountdown(DEADLINE)',              color: B,   t: 0.516 },
  { code: '  const router     = useRouter()',                         color: B,   t: 0.522 },
  { code: '  const heroRef    = useRef<HTMLElement>(null)',           color: B,   t: 0.528 },
  { code: '  const [state, setState] = useState<QuoteState>({',      color: B,   t: 0.534 },
  { code: '    plan: null, addons: [], total: 0, sent: false',        color: Y,   t: 0.540 },
  { code: '  })',                                                     color: B,   t: 0.545 },
  { code: '  const [lang, setLang] = useState<"es"|"en">("es")',     color: B,   t: 0.551 },
  { code: '',                                                         color: DIM, t: 0.556 },
  { code: '  const selectPlan = useCallback((plan: Plan) => {',       color: G,   t: 0.561 },
  { code: '    setState(p => ({ ...p, plan, total: plan.price }))',   color: B,   t: 0.567 },
  { code: '    track("plan_selected", { plan: plan.id })',            color: DIM, t: 0.572 },
  { code: '  }, [])',                                                  color: G,   t: 0.577 },
  { code: '',                                                         color: DIM, t: 0.581 },
  { code: '  return (',                                               color: DIM, t: 0.585 },
  { code: '    <main className="bg-[#08080d] min-h-screen text-white">', color: G, t: 0.591 },
  { code: '',                                                         color: DIM, t: 0.596 },

  // ── nav  +$150 ──
  { code: '      {/* ── Nav ──────────────────── */}',               color: DIM, t: 0.602, revealId: 'nav', price: 150 },
  { code: '      <nav className={`fixed top-0 w-full z-50',          color: G,   t: 0.609 },
  { code: '            backdrop-blur transition-all duration-300',    color: G,   t: 0.615 },
  { code: '            border-b border-white/5',                      color: G,   t: 0.620 },
  { code: '            ${scrolled ? "bg-[#08080d]/90" : ""}`}>',     color: G,   t: 0.625 },
  { code: '        <Link href="/">',                                  color: B,   t: 0.630 },
  { code: '          VDesing<span>— 3D Webs PR</span>',              color: B,   t: 0.635 },
  { code: '        </Link>',                                          color: B,   t: 0.639 },
  { code: '        <a href={`https://wa.me/${WA_NUMBER}`}',          color: B,   t: 0.644 },
  { code: '           className="bg-[#39FF8B] text-black ...">',     color: B,   t: 0.649 },
  { code: '          {lang === "es" ? "Cotizar →" : "Get a Quote →"}', color: Y, t: 0.654 },
  { code: '        </a>',                                             color: B,   t: 0.658 },
  { code: '      </nav>',                                             color: G,   t: 0.663 },
  { code: '',                                                         color: DIM, t: 0.667 },

  // ── hero  +$180 ──
  { code: '      {/* ── Hero ──────────────────── */}',              color: DIM, t: 0.671, revealId: 'hero', price: 180 },
  { code: '      <section ref={heroRef} className="hero pt-36 ...">',color: G,   t: 0.678 },
  { code: '        <h1 className="font-serif',                        color: B,   t: 0.684 },
  { code: '             text-[clamp(2rem,5vw,4rem)]',                 color: B,   t: 0.689 },
  { code: '             leading-[1.1] tracking-[-0.02em]">',         color: B,   t: 0.694 },
  { code: '          Tu negocio en una{" "}',                         color: Y,   t: 0.699 },
  { code: '          <em className="text-[#39FF8B] italic">',        color: G,   t: 0.704 },
  { code: '            web profesional',                              color: G,   t: 0.709 },
  { code: '          </em>{" "}que vende',                           color: G,   t: 0.714, revealId: 'cta' },
  { code: '        </h1>',                                            color: B,   t: 0.719 },
  { code: '        <p className="text-white/55 max-w-md ...">',      color: B,   t: 0.724 },
  { code: '          Diseño, desarrollo, logo, video — un techo.',   color: Y,   t: 0.729 },
  { code: '        </p>',                                             color: B,   t: 0.733 },
  { code: '        <a href="#paquetes" className="cta-btn ...">',    color: B,   t: 0.738 },
  { code: '          VER PAQUETES ↓',                                 color: Y,   t: 0.743 },
  { code: '        </a>',                                             color: B,   t: 0.747 },
  { code: '      </section>',                                         color: G,   t: 0.752 },
  { code: '',                                                         color: DIM, t: 0.756 },

  // ── pricing  +$150 ──
  { code: '      {/* ── Pricing ─────────────────── */}',            color: DIM, t: 0.760, revealId: 'cards', price: 150 },
  { code: '      <section id="paquetes" className="...">',            color: G,   t: 0.767 },
  { code: '        {PLANS.map(plan => (',                             color: DIM, t: 0.773 },
  { code: '          <div key={plan.id}',                            color: B,   t: 0.779, revealId: 'card1' },
  { code: '               onClick={() => selectPlan(plan)}',         color: B,   t: 0.785 },
  { code: '               className={plan.popular ? "featured" : ""}>', color: B, t: 0.790, revealId: 'card2' },
  { code: '            <span>{plan.name}</span>',                    color: Y,   t: 0.795 },
  { code: '            <span>${plan.price.toLocaleString()}</span>', color: Y,   t: 0.800 },
  { code: '            <ul>',                                         color: G,   t: 0.805 },
  { code: '              {plan.features.map(f => (',                  color: DIM, t: 0.810 },
  { code: '                <li key={f}>✓ {f}</li>',                  color: B,   t: 0.815 },
  { code: '              ))}',                                        color: DIM, t: 0.820 },
  { code: '            </ul>',                                        color: G,   t: 0.824 },
  { code: '          </div>',                                         color: B,   t: 0.828 },
  { code: '        ))}',                                              color: DIM, t: 0.832 },
  { code: '      </section>',                                         color: G,   t: 0.836 },
  { code: '',                                                         color: DIM, t: 0.839 },
  { code: '    </main>',                                              color: G,   t: 0.843 },
  { code: '  )',                                                      color: DIM, t: 0.847 },
  { code: '}',                                                        color: DIM, t: 0.851 },

  // ── types.ts ──────────────────────────────────────────────────────────────
  { code: "export type Locale     = 'es' | 'en'",           color: G,   t: 0.860, file:'types', ln:1  },
  { code: "export type ServiceId  = 'basic'|'pro'|'custom'",color: G,   t: 0.864, file:'types', ln:2  },
  { code: '',                                                color: DIM, t: 0.867, file:'types', ln:3  },
  { code: 'export interface SiteConfig {',                  color: G,   t: 0.870, file:'types', ln:4  },
  { code: "  name:    string",                              color: B,   t: 0.873, file:'types', ln:5  },
  { code: "  domain:  string",                              color: B,   t: 0.876, file:'types', ln:6  },
  { code: "  phone:   string",                              color: B,   t: 0.879, file:'types', ln:7  },
  { code: "  waLink:  string",                              color: B,   t: 0.882, file:'types', ln:8  },
  { code: '}',                                              color: G,   t: 0.885, file:'types', ln:9  },
  { code: '',                                               color: DIM, t: 0.887, file:'types', ln:10 },
  { code: 'export type NavLink = {',                        color: G,   t: 0.889, file:'types', ln:11 },
  { code: "  href:  string",                                color: B,   t: 0.892, file:'types', ln:12 },
  { code: "  label: Record<Locale, string>",                color: B,   t: 0.895, file:'types', ln:13 },
  { code: "  icon?: string",                                color: B,   t: 0.898, file:'types', ln:14 },
  { code: '}',                                              color: G,   t: 0.901, file:'types', ln:15 },
  { code: '',                                               color: DIM, t: 0.903, file:'types', ln:16 },
  { code: 'export interface Project {',                     color: G,   t: 0.905, file:'types', ln:17 },
  { code: "  slug:   string",                               color: B,   t: 0.908, file:'types', ln:18 },
  { code: "  title:  string",                               color: B,   t: 0.911, file:'types', ln:19 },
  { code: "  tags:   string[]",                             color: B,   t: 0.914, file:'types', ln:20 },
  { code: "  cover:  string",                               color: B,   t: 0.917, file:'types', ln:21 },
  { code: "  url?:   string",                               color: B,   t: 0.920, file:'types', ln:22 },
  { code: '}',                                              color: G,   t: 0.923, file:'types', ln:23 },

  // ── globals.css ───────────────────────────────────────────────────────────
  { code: '/* ── Design tokens ─────────────── */',         color: DIM, t: 0.933, file:'globals', ln:1  },
  { code: ':root {',                                        color: G,   t: 0.936, file:'globals', ln:2  },
  { code: "  --bg:      oklch(8% 0.01 280);",              color: Y,   t: 0.939, file:'globals', ln:3  },
  { code: "  --surface: oklch(12% 0.02 280);",             color: Y,   t: 0.942, file:'globals', ln:4  },
  { code: "  --accent:  #39FF8B;",                         color: G,   t: 0.945, file:'globals', ln:5  },
  { code: "  --purple:  #A855F7;",                         color: P,   t: 0.948, file:'globals', ln:6  },
  { code: "  --ink:     oklch(96% 0.005 280);",            color: Y,   t: 0.950, file:'globals', ln:7  },
  { code: "  --muted:   oklch(96% 0.005 280 / 0.45);",    color: Y,   t: 0.953, file:'globals', ln:8  },
  { code: "  --mono:    'JetBrains Mono', monospace;",     color: Y,   t: 0.956, file:'globals', ln:9  },
  { code: '}',                                             color: G,   t: 0.959, file:'globals', ln:10 },
  { code: '',                                              color: DIM, t: 0.961, file:'globals', ln:11 },
  { code: '@layer base {',                                 color: P,   t: 0.963, file:'globals', ln:12 },
  { code: "  body { background: var(--bg); color: var(--ink) }", color: B, t: 0.966, file:'globals', ln:13 },
  { code: "  h1, h2, h3 { font-family: 'Fraunces', serif }", color: B, t: 0.969, file:'globals', ln:14 },
  { code: '}',                                             color: G,   t: 0.972, file:'globals', ln:15 },
  { code: '',                                              color: DIM, t: 0.974, file:'globals', ln:16 },
  { code: '.cta-btn {',                                    color: P,   t: 0.976, file:'globals', ln:17 },
  { code: '  background:    var(--accent);',               color: Y,   t: 0.978, file:'globals', ln:18 },
  { code: '  padding:       12px 28px;',                   color: Y,   t: 0.980, file:'globals', ln:19 },
  { code: '  border-radius: var(--radius);',               color: Y,   t: 0.982, file:'globals', ln:20 },
  { code: '  box-shadow:    0 0 24px #39FF8B44;',          color: Y,   t: 0.984, file:'globals', ln:21 },
  { code: '}',                                             color: G,   t: 0.986, file:'globals', ln:22 },
];

export default function Demo3DPage() {
  const progressRef    = useRef(0);
  const stateRef       = useRef<HTMLSpanElement>(null);
  const hintRef        = useRef<HTMLDivElement>(null);
  const lineRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef      = useRef<HTMLDivElement>(null);
  const revealRefs     = useRef<Record<string, HTMLElement | null>>({});
  const priceBadgeRefs = useRef<Record<string, HTMLElement | null>>({});
  const invoiceRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const totalRef           = useRef<HTMLSpanElement>(null);
  const totalBarRef        = useRef<HTMLDivElement>(null);
  const codeScrollSmooth   = useRef(0);
  const tabPageRef         = useRef<HTMLDivElement>(null);
  const tabTypesRef        = useRef<HTMLDivElement>(null);
  const tabGlobalsRef      = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    window.addEventListener('resize', fn);
    return () => { window.removeEventListener('scroll', fn); window.removeEventListener('resize', fn); };
  }, []);

  useEffect(() => {
    let raf = 0;
    let smooth = 0;
    let displayedTotal = 0;

    const tick = () => {
      smooth += (progressRef.current - smooth) * 0.12;
      const p = smooth;

      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p * 8));

      // determine active line first
      let activeLine = 0;
      LINES.forEach((line, i) => { if (p >= line.t) activeLine = i; });

      // apply styles — dim lines further from the cursor to focus on current writing
      LINES.forEach((line, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        const vis = p >= line.t;
        const dist = activeLine - i;
        el.style.opacity   = vis ? String(Math.max(0.38, 1 - dist * 0.008)) : '0';
        el.style.transform = vis ? 'translateY(0)' : 'translateY(4px)';
      });

      // cursor
      const activeEl = lineRefs.current[activeLine];
      if (cursorRef.current && activeEl) {
        cursorRef.current.style.top     = `${activeEl.offsetTop}px`;
        cursorRef.current.style.opacity = p < 0.86 ? '1' : '0';
      }

      // auto-scroll code panel to follow the active line
      const codePanel = document.getElementById('code-scroll');
      if (codePanel && activeEl) {
        const target = Math.max(0, activeEl.offsetTop - codePanel.clientHeight * 0.38);
        codeScrollSmooth.current += (target - codeScrollSmooth.current) * 0.055;
        codePanel.scrollTop = codeScrollSmooth.current;
      }

      // tab switching — page → types → globals
      const inTypes   = p >= 0.855;
      const inGlobals = p >= 0.928;
      const setTab = (ref: React.RefObject<HTMLDivElement | null>, active: boolean, accent: string) => {
        const el = ref.current;
        if (!el) return;
        el.style.borderBottom = active ? `2px solid ${accent}` : '2px solid transparent';
        el.style.background   = active ? '#0d0d16' : 'transparent';
        const dot = el.querySelector('.tab-dot') as HTMLElement | null;
        if (dot) { dot.style.background = active ? accent : 'transparent'; dot.style.boxShadow = active ? `0 0 5px ${accent}` : 'none'; }
        const label = el.querySelector('.tab-label') as HTMLElement | null;
        if (label) label.style.color = active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)';
      };
      const file = inGlobals ? 'globals' : inTypes ? 'types' : 'page';
      setTab(tabPageRef,    file === 'page',    G);
      setTab(tabTypesRef,   file === 'types',   B);
      setTab(tabGlobalsRef, file === 'globals', P);

      // state label
      if (stateRef.current) {
        if (file === 'globals')     { stateRef.current.textContent = 'globals.css'; stateRef.current.style.color = P; }
        else if (file === 'types')  { stateRef.current.textContent = 'types.ts';    stateRef.current.style.color = B; }
        else if (p > 0.84)          { stateRef.current.textContent = 'página web';  stateRef.current.style.color = G; }
        else if (p > 0.12)          { stateRef.current.textContent = 'compilando…'; stateRef.current.style.color = Y; }
        else                        { stateRef.current.textContent = 'code →  web'; stateRef.current.style.color = P; }
      }

      // preview elements
      PRICED_REVEALS.forEach(r => {
        const el = revealRefs.current[r.id];
        if (!el) return;
        const ease = easeOut((p - r.t) / 0.06);
        el.style.opacity   = String(ease);
        el.style.transform = `translateY(${(1 - ease) * 12}px)`;
      });

      // price badges
      const priced = PRICED_REVEALS.filter(r => 'price' in r) as { id: string; label: string; price: number; t: number }[];
      priced.forEach(r => {
        const el = priceBadgeRefs.current[r.id];
        if (!el) return;
        const ease = easeOut(Math.max(0, (p - (r.t + 0.015)) / 0.05));
        el.style.opacity   = String(ease);
        el.style.transform = `translateX(${(1 - ease) * 10}px)`;
      });

      // invoice
      let runTarget = 0;
      priced.forEach((r, i) => {
        const active = p >= r.t + 0.025;
        const row = invoiceRefs.current[i];
        if (row) {
          row.style.opacity   = active ? '1' : '0.2';
          row.style.transform = active ? 'translateY(0)' : 'translateY(3px)';
        }
        if (active) runTarget += r.price;
      });
      displayedTotal += (runTarget - displayedTotal) * 0.10;
      if (totalRef.current) {
        const rounded = Math.round(displayedTotal);
        totalRef.current.textContent  = `$${rounded.toLocaleString('en-US')}`;
        const done = rounded >= TOTAL;
        totalRef.current.style.color       = done ? G : '#e6e6ee';
        totalRef.current.style.textShadow  = done ? `0 0 28px ${G}88` : 'none';
      }
      if (totalBarRef.current)
        totalBarRef.current.style.width = `${Math.min(100, (displayedTotal / TOTAL) * 100)}%`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main style={{ background: '#08080d' }}>
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        #code-scroll::-webkit-scrollbar{display:none}
      `}</style>

      {/* top bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:20, height:52, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', background:'rgba(8,8,13,0.94)', backdropFilter:'blur(14px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <a href="/servicios/3d" style={{ fontFamily:MONO, fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', textDecoration:'none', border:'1px solid rgba(255,255,255,0.12)', padding:'5px 12px', borderRadius:3 }}>← Back</a>
          <span style={{ fontFamily:MONO, fontSize:13, letterSpacing:'0.04em', color:'#e6e6ee' }}>VDesing<span style={{ color:G }}> — Code to Reality</span></span>
        </div>
        <div style={{ fontFamily:MONO, fontSize:10, letterSpacing:'0.26em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>
          estado: <span ref={stateRef} style={{ color:P }}>código fuente</span>
        </div>
      </div>

      {/* split layout */}
      <div style={{ position:'fixed', top:52, left:0, right:0, bottom:0, display:'flex' }}>

        {/* ═══ LEFT — editor ═══ */}
        <div style={{ flex:1, borderRight:'1px solid rgba(255,255,255,0.07)', display:'flex', flexDirection:'column', background:'#0d0d16', overflow:'hidden' }}>
          {/* tabs */}
          <div style={{ height:36, background:'#0a0a12', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center' }}>
            <div ref={tabPageRef} style={{ height:'100%', display:'flex', alignItems:'center', gap:8, padding:'0 18px', borderRight:'1px solid rgba(255,255,255,0.06)', borderBottom:`2px solid ${G}`, background:'#0d0d16', transition:'border-color 0.2s, background 0.2s' }}>
              <div className="tab-dot" style={{ width:7, height:7, borderRadius:'50%', background:G, boxShadow:`0 0 5px ${G}`, transition:'background 0.2s, box-shadow 0.2s' }} />
              <span className="tab-label" style={{ fontFamily:MONO, fontSize:11, color:'rgba(255,255,255,0.75)', transition:'color 0.2s' }}>page.tsx</span>
            </div>
            <div ref={tabTypesRef} style={{ height:'100%', display:'flex', alignItems:'center', gap:8, padding:'0 14px', borderRight:'1px solid rgba(255,255,255,0.05)', borderBottom:'2px solid transparent', transition:'border-color 0.2s, background 0.2s' }}>
              <div className="tab-dot" style={{ width:7, height:7, borderRadius:'50%', background:'transparent', transition:'background 0.2s, box-shadow 0.2s' }} />
              <span className="tab-label" style={{ fontFamily:MONO, fontSize:11, color:'rgba(255,255,255,0.28)', transition:'color 0.2s' }}>types.ts</span>
            </div>
            <div ref={tabGlobalsRef} style={{ height:'100%', display:'flex', alignItems:'center', gap:8, padding:'0 14px', borderBottom:'2px solid transparent', transition:'border-color 0.2s, background 0.2s' }}>
              <div className="tab-dot" style={{ width:7, height:7, borderRadius:'50%', background:'transparent', transition:'background 0.2s, box-shadow 0.2s' }} />
              <span className="tab-label" style={{ fontFamily:MONO, fontSize:11, color:'rgba(255,255,255,0.28)', transition:'color 0.2s' }}>globals.css</span>
            </div>
          </div>

          {/* code */}
          <div style={{ flex:1, overflow:'hidden', padding:'14px 0', position:'relative' }} id="code-scroll">
            {/* active line highlight */}
            <div ref={cursorRef} style={{ position:'absolute', left:0, right:0, height:21, background:`${G}09`, borderLeft:`2px solid ${G}66`, pointerEvents:'none', zIndex:1, transition:'top 0.10s linear, opacity 0.2s' }} />

            {LINES.map((line, i) => (
              <div key={i} ref={el => { lineRefs.current[i] = el; }} style={{ display:'flex', alignItems:'center', opacity:0, transform:'translateY(4px)', transition:'opacity 0.20s ease, transform 0.20s ease', minHeight: line.code === '' ? 7 : 21, paddingRight:12 }}>
                <span style={{ fontFamily:MONO, fontSize:10, color:'rgba(255,255,255,0.14)', width:38, textAlign:'right', paddingRight:16, flexShrink:0, userSelect:'none' }}>
                  {line.code !== '' ? (line.ln ?? i + 1) : ''}
                </span>
                <span style={{ fontFamily:MONO, fontSize:11.5, lineHeight:'21px', color:line.color, whiteSpace:'pre', flex:1 }}>
                  {line.code}
                </span>
                {line.price != null && (
                  <span style={{ fontFamily:MONO, fontSize:9.5, color:`${G}cc`, marginLeft:10, whiteSpace:'nowrap', flexShrink:0, letterSpacing:'0.05em' }}>
                    // +${line.price}
                  </span>
                )}
              </div>
            ))}
            <div style={{ paddingLeft:38, paddingTop:2 }}>
              <span style={{ fontFamily:MONO, fontSize:13, color:G, animation:'blink 1s step-start infinite' }}>▋</span>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT — preview + invoice ═══ */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#08080d', overflow:'hidden' }}>
          {/* browser chrome */}
          <div style={{ height:36, background:'#0a0a12', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:10, padding:'0 16px' }}>
            <div style={{ display:'flex', gap:5 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:9, height:9, borderRadius:'50%', background:c, opacity:0.7 }} />)}
            </div>
            <div style={{ flex:1, maxWidth:220, margin:'0 auto', background:'rgba(255,255,255,0.06)', borderRadius:4, height:20, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:MONO, fontSize:9.5, color:'rgba(255,255,255,0.28)' }}>localhost:3000/servicios/3d</span>
            </div>
          </div>

          {/* preview */}
          <div style={{ flex:1, position:'relative', overflow:'hidden' }}>

            {/* nav */}
            <div ref={el => { revealRefs.current['nav'] = el; }} style={{ position:'absolute', top:0, left:0, right:0, height:46, opacity:0, transform:'translateY(12px)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px', background:'rgba(8,8,13,0.9)', backdropFilter:'blur(10px)', borderBottom:'1px solid rgba(255,255,255,0.06)', zIndex:10 }}>
              <span style={{ fontFamily:MONO, fontSize:12, color:'#e6e6ee' }}>VDesing<span style={{ color:G }}> — 3D Webs PR</span></span>
              <span style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', color:'#08080d', background:G, padding:'4px 11px', borderRadius:3, fontWeight:700 }}>COTIZAR →</span>
              <span ref={el => { priceBadgeRefs.current['nav'] = el; }} style={{ position:'absolute', right:6, top:'50%', transform:'translateY(-50%) translateX(10px)', fontFamily:MONO, fontSize:8.5, color:G, background:'rgba(57,255,139,0.12)', border:`1px solid ${G}44`, padding:'2px 7px', borderRadius:20, opacity:0, whiteSpace:'nowrap' }}>+$150</span>
            </div>

            {/* hero */}
            <div ref={el => { revealRefs.current['hero'] = el; }} style={{ position:'absolute', top:58, left:0, right:0, opacity:0, transform:'translateY(12px)', padding:'18px 26px 0' }}>
              <div style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.3em', color:G, marginBottom:8, textTransform:'uppercase' }}>Puerto Rico · Latam · Desde $100/mes</div>
              <div style={{ fontFamily:SERIF, fontSize:'clamp(1.1rem,2.4vw,1.9rem)', lineHeight:1.15, color:'#e6e6ee' }}>
                Tu negocio en una <span style={{ color:G, fontStyle:'italic' }}>web profesional</span> que vende
              </div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.42)', marginTop:7, lineHeight:1.6, maxWidth:290 }}>Diseño, desarrollo, logo, video — todo bajo un mismo techo.</div>
              <span ref={el => { priceBadgeRefs.current['hero'] = el; }} style={{ display:'inline-block', marginTop:7, fontFamily:MONO, fontSize:8.5, color:G, background:'rgba(57,255,139,0.12)', border:`1px solid ${G}44`, padding:'2px 7px', borderRadius:20, opacity:0 }}>+$180</span>
            </div>

            {/* cta */}
            <div ref={el => { revealRefs.current['cta'] = el; }} style={{ position:'absolute', top:196, left:26, opacity:0, transform:'translateY(12px)', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontFamily:MONO, fontSize:11, letterSpacing:'0.1em', color:'#08080d', background:G, padding:'10px 20px', borderRadius:4, fontWeight:700, textTransform:'uppercase', boxShadow:`0 0 20px ${G}44` }}>VER PAQUETES ↓</span>
            </div>

            {/* cards section label */}
            <div ref={el => { revealRefs.current['cards'] = el; }} style={{ position:'absolute', top:248, left:20, right:20, opacity:0, transform:'translateY(12px)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:9 }}>
                <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)' }}>Paquetes — pago único</span>
                <span ref={el => { priceBadgeRefs.current['cards'] = el; }} style={{ fontFamily:MONO, fontSize:8.5, color:P, background:'rgba(168,85,247,0.12)', border:`1px solid ${P}44`, padding:'2px 7px', borderRadius:20, opacity:0, whiteSpace:'nowrap' }}>+$150</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {/* card básico */}
                <div ref={el => { revealRefs.current['card1'] = el; }} style={{ border:`1px solid ${G}44`, borderRadius:8, padding:'13px 12px', background:`${G}07`, opacity:0, transform:'translateY(12px)' }}>
                  <div style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.2em', textTransform:'uppercase', color:G, marginBottom:5 }}>Básico</div>
                  <div style={{ fontFamily:SERIF, fontSize:22, color:'#e6e6ee', marginBottom:9 }}>$680</div>
                  {['Landing page','Hosting incluido','WhatsApp + SSL','Entrega 5-7 días'].map(f => (
                    <div key={f} style={{ fontSize:9, color:'rgba(255,255,255,0.5)', display:'flex', gap:5, marginBottom:4 }}>
                      <span style={{ color:G }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                {/* card pro */}
                <div ref={el => { revealRefs.current['card2'] = el; }} style={{ border:`1px solid ${P}55`, borderRadius:8, padding:'13px 12px', background:`${P}07`, position:'relative', overflow:'hidden', opacity:0, transform:'translateY(12px)' }}>
                  <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', background:P, color:'#08080d', fontFamily:MONO, fontSize:6.5, letterSpacing:'0.2em', textTransform:'uppercase', padding:'2px 8px', borderRadius:20, fontWeight:700, whiteSpace:'nowrap' }}>Más popular</div>
                  <div style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.2em', textTransform:'uppercase', color:P, marginBottom:5 }}>Pro</div>
                  <div style={{ fontFamily:SERIF, fontSize:22, color:'#e6e6ee', marginBottom:9 }}>$1,280</div>
                  {['3 páginas','Logo incluido','Video promo 60s','SEO + WhatsApp'].map(f => (
                    <div key={f} style={{ fontSize:9, color:'rgba(255,255,255,0.5)', display:'flex', gap:5, marginBottom:4 }}>
                      <span style={{ color:P }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── invoice bar ── */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', background:'rgba(8,8,13,0.97)', padding:'11px 18px 13px', flexShrink:0 }}>
            <div style={{ fontFamily:MONO, fontSize:7.5, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)', marginBottom:9 }}>Cotización en vivo</div>
            <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:10 }}>
              {(PRICED_REVEALS.filter(r => 'price' in r) as { id:string; label:string; price:number; t:number }[]).map((r, i) => (
                <div key={r.id} ref={el => { invoiceRefs.current[i] = el; }} style={{ display:'flex', justifyContent:'space-between', opacity:0.2, transition:'opacity 0.3s ease, transform 0.3s ease', transform:'translateY(3px)' }}>
                  <span style={{ fontFamily:MONO, fontSize:9.5, color:'rgba(255,255,255,0.52)' }}>{r.label}</span>
                  <span style={{ fontFamily:MONO, fontSize:9.5, color:G }}>${r.price}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:9, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <span style={{ fontFamily:MONO, fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>Total estimado</span>
              <span ref={totalRef} style={{ fontFamily:SERIF, fontSize:24, color:'#e6e6ee', transition:'color 0.4s, text-shadow 0.4s' }}>$0</span>
            </div>
            <div style={{ height:2, background:'rgba(255,255,255,0.06)', borderRadius:2, marginTop:7, overflow:'hidden' }}>
              <div ref={totalBarRef} style={{ height:'100%', width:'0%', background:`linear-gradient(90deg,${G},${P})`, boxShadow:`0 0 8px ${G}`, transition:'width 0.3s ease' }} />
            </div>
          </div>
        </div>
      </div>

      {/* hint */}
      <div ref={hintRef} style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:20, fontFamily:MONO, fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.42)', pointerEvents:'none', whiteSpace:'nowrap' }}>
        Bajá y mirá cómo el código se vuelve web ↓
      </div>

      <div style={{ height:'400vh' }} aria-hidden />
    </main>
  );
}