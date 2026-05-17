'use client';

import { useEffect, useRef } from 'react';

type ProgressRef = { current: number };

const GREEN = '#39FF8B';
const PURPLE = '#A855F7';

// stages add up to $680 — Basic package
const STAGES = [
  { label: 'Estructura base',      price: 200, color: GREEN  },
  { label: 'Diseño a tu medida',   price: 120, color: PURPLE },
  { label: 'Listo para celular',   price: 80,  color: GREEN  },
  { label: 'Conexión WhatsApp',    price: 80,  color: PURPLE },
  { label: 'SEO básico',           price: 80,  color: GREEN  },
  { label: 'Dominio + publicación',price: 120, color: PURPLE },
];

export default function Timeline({ progressRef }: { progressRef: ProgressRef }) {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, Math.max(0, progressRef.current ?? 0));
      let sum = 0;

      STAGES.forEach((s, i) => {
        const threshold = (i + 0.55) / STAGES.length;
        const active = p >= threshold;
        if (active) sum += s.price;

        const dot = dotRefs.current[i];
        if (dot) {
          dot.style.background = active ? s.color : 'transparent';
          dot.style.borderColor = active ? s.color : 'rgba(255,255,255,0.22)';
          dot.style.boxShadow = active ? `0 0 16px ${s.color}` : 'none';
        }
        const row = rowRefs.current[i];
        if (row) row.style.opacity = active ? '1' : '0.34';
        const price = priceRefs.current[i];
        if (price) price.style.color = active ? s.color : 'rgba(255,255,255,0.3)';
      });

      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      if (totalRef.current) totalRef.current.textContent = `$${sum}`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <aside
      style={{
        position: 'fixed',
        left: 36,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        color: '#e6e6ee',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: 18,
        }}
      >
        Cotización en vivo
      </div>

      <div style={{ position: 'relative', paddingLeft: 4 }}>
        {/* connector track */}
        <div
          style={{
            position: 'absolute',
            left: 11,
            top: 8,
            bottom: 8,
            width: 2,
            background: 'rgba(255,255,255,0.1)',
          }}
        />
        {/* connector fill */}
        <div
          ref={fillRef}
          style={{
            position: 'absolute',
            left: 11,
            top: 8,
            width: 2,
            height: '0%',
            background: `linear-gradient(${GREEN}, ${PURPLE})`,
            boxShadow: `0 0 10px ${GREEN}`,
            transition: 'height 0.12s linear',
          }}
        />

        {STAGES.map((s, i) => (
          <div
            key={s.label}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 20,
              opacity: 0.34,
              transition: 'opacity 0.2s ease',
            }}
          >
            <div
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.22)',
                background: 'transparent',
                flexShrink: 0,
                transition: 'background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
            />
            <div>
              <div style={{ fontSize: 12.5, lineHeight: 1.2 }}>{s.label}</div>
              <span
                ref={(el) => {
                  priceRefs.current[i] = el;
                }}
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}
              >
                ${s.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 8,
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          Cotización estimada
        </div>
        <span
          ref={totalRef}
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: GREEN,
            textShadow: `0 0 18px ${GREEN}`,
          }}
        >
          $0
        </span>
      </div>
    </aside>
  );
}