'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const GREEN = '#39FF8B';
const PURPLE = '#A855F7';
const YELLOW = '#FFD06B';
const DIM = 'rgba(255,255,255,0.45)';

type ProgressRef = { current: number };

// ─── code text to display ────────────────────────────────────────────────────
type CodeLine = { text: string; x: number; y: number; color: string; indent: number };

const CODE_LINES: CodeLine[] = [
  { text: "'use client'",                    indent: 0, x: -2.05, y:  1.07, color: YELLOW  },
  { text: "export default function VDesing() {", indent: 0, x: -2.05, y:  0.87, color: PURPLE },
  { text: "return (",                         indent: 1, x: -1.83, y:  0.67, color: DIM    },
  { text: "<main className=\"bg-dark\">",      indent: 2, x: -1.61, y:  0.47, color: GREEN  },
  { text: "<nav className=\"fixed top-0\">",   indent: 3, x: -1.39, y:  0.27, color: GREEN  },
  { text: "<Logo />  <NavLinks />",           indent: 4, x: -1.17, y:  0.07, color: '#60a5fa' },
  { text: "</nav>",                           indent: 3, x: -1.39, y: -0.13, color: GREEN  },
  { text: "<section className=\"hero\">",      indent: 3, x: -1.39, y: -0.33, color: GREEN  },
  { text: "<Avatar pose=\"hero\" />",          indent: 4, x: -1.17, y: -0.53, color: '#60a5fa' },
  { text: "<h1>Code to Reality</h1>",         indent: 4, x: -1.17, y: -0.73, color: GREEN  },
  { text: "</section>",                       indent: 3, x: -1.39, y: -0.93, color: GREEN  },
  { text: "<Services />  <Pricing />",        indent: 3, x: -1.39, y: -1.13, color: '#60a5fa' },
  { text: "</main>",                          indent: 2, x: -1.61, y: -1.33, color: GREEN  },
  { text: ")",                                indent: 1, x: -1.83, y: -1.48, color: DIM    },
];

// ─── bar geometry (code pose → web pose) ─────────────────────────────────────
type Bar = {
  cx: number; cy: number; cw: number; ch: number;
  wx: number; wy: number; ww: number; wh: number;
  color: string;
};

function buildBars(): Bar[] {
  const rows = [
    { indent: 0, tokens: [0.5, 1.3] },
    { indent: 1, tokens: [0.8, 0.5, 1.5] },
    { indent: 2, tokens: [1.1, 0.7] },
    { indent: 2, tokens: [0.6, 1.0, 0.5] },
    { indent: 1, tokens: [0.9, 1.3] },
    { indent: 0, tokens: [0.5] },
    { indent: 1, tokens: [1.2, 0.6, 0.7] },
    { indent: 2, tokens: [0.7, 1.0] },
    { indent: 1, tokens: [0.9, 0.5] },
  ];
  const code: { x: number; y: number; w: number }[] = [];
  let rowY = 1.0;
  for (const row of rows) {
    let x = -1.95 + row.indent * 0.22;
    for (const w of row.tokens) {
      code.push({ x: x + w / 2, y: rowY, w });
      x += w + 0.1;
    }
    rowY -= 0.245;
  }

  const web: { x: number; y: number; w: number; h: number }[] = [];
  web.push({ x: -1.6, y: 1.05, w: 0.55, h: 0.13 });
  for (let i = 0; i < 4; i++) web.push({ x: 0.5 + i * 0.42, y: 1.05, w: 0.3, h: 0.1 });
  web.push({ x: -0.5, y: 0.52, w: 2.4, h: 0.21 });
  web.push({ x: -0.3, y: 0.25, w: 2.8, h: 0.21 });
  web.push({ x: -0.85, y: -0.02, w: 1.7, h: 0.21 });
  web.push({ x: -1.3, y: -0.36, w: 0.95, h: 0.24 });
  for (let c = 0; c < 3; c++) {
    const cx = -1.4 + c * 1.4;
    web.push({ x: cx, y: -0.78, w: 1.1, h: 0.52 });
    web.push({ x: cx, y: -1.12, w: 0.88, h: 0.11 });
  }
  for (let i = 0; i < 5; i++) web.push({ x: -1.6 + i * 0.8, y: -1.4, w: 0.56, h: 0.09 });

  return code.map((c, i) => {
    const w = web[i] ?? { x: 0, y: 0, w: 0.5, h: 0.1 };
    return {
      cx: c.x, cy: c.y, cw: c.w, ch: 0.11,
      wx: w.x, wy: w.y, ww: w.w, wh: w.h,
      color: i % 3 === 0 ? PURPLE : GREEN,
    };
  });
}

const BARS = buildBars();

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── code text layer ──────────────────────────────────────────────────────────
function CodeLayer({ progressRef }: { progressRef: ProgressRef }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRefs = useRef<(any | null)[]>([]);
  const smooth = useRef(0);

  useFrame((_, delta) => {
    const target = clamp01(progressRef.current ?? 0);
    smooth.current += (target - smooth.current) * Math.min(1, delta * 6);
    const p = easeInOut(clamp01(smooth.current));
    // fade code out during first 60% of scroll, fully gone at 60%
    const textOpacity = clamp01(1 - p * 1.7);

    for (const t of textRefs.current) {
      try {
        if (t && typeof t.fillOpacity === 'number') t.fillOpacity = textOpacity;
      } catch (_) { /* text not ready yet */ }
    }
  });

  return (
    <>
      {CODE_LINES.map((line, i) => (
        <Text
          key={i}
          ref={(el) => { textRefs.current[i] = el; }}
          position={[line.x, line.y, 0.12]}
          fontSize={0.105}
          color={line.color}
          anchorX="left"
          anchorY="middle"
          font={undefined}
          fillOpacity={1}
          // slight glow hack: render twice with slight z offset
        >
          {line.text}
        </Text>
      ))}
    </>
  );
}

// ─── monitor (bars + code layer) ─────────────────────────────────────────────
function Monitor({ progressRef }: { progressRef: ProgressRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<(THREE.Mesh | null)[]>([]);
  const smooth = useRef(0);

  useFrame((_, delta) => {
    const target = clamp01(progressRef.current ?? 0);
    smooth.current += (target - smooth.current) * Math.min(1, delta * 6);
    const p = easeInOut(clamp01(smooth.current));

    for (let i = 0; i < BARS.length; i++) {
      const m = barsRef.current[i];
      if (!m) continue;
      const b = BARS[i];
      m.position.x = lerp(b.cx, b.wx, p);
      m.position.y = lerp(b.cy, b.wy, p);
      m.position.z = 0.07;
      m.scale.x = lerp(b.cw, b.ww, p);
      m.scale.y = lerp(b.ch, b.wh, p);
      // bars start dim, power up as code fades
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity = lerp(0.22, 1.4, p);
    }

    const g = groupRef.current;
    if (g) {
      g.rotation.y = lerp(0.52, 0, p);
      g.rotation.x = lerp(0.09, 0, p);
      g.position.y = Math.sin(performance.now() * 0.001) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* outer frame */}
      <mesh position={[0, 0, -0.16]}>
        <boxGeometry args={[5.05, 3.25, 0.28]} />
        <meshStandardMaterial color="#16161f" metalness={0.7} roughness={0.32} />
      </mesh>
      {/* screen panel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.6, 2.85]} />
        <meshStandardMaterial color="#06060d" metalness={0.2} roughness={0.7} />
      </mesh>
      {/* screen glow wash */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[4.6, 2.85]} />
        <meshBasicMaterial color={GREEN} toneMapped={false} transparent opacity={0.04} />
      </mesh>

      {/* real code text — fades out as scroll increases */}
      <CodeLayer progressRef={progressRef} />

      {/* morphing bars — power up as code fades */}
      {BARS.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
        >
          <boxGeometry args={[1, 1, 0.07]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={0.22}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* stand */}
      <mesh position={[0, -2.0, -0.1]}>
        <boxGeometry args={[0.38, 0.75, 0.38]} />
        <meshStandardMaterial color="#16161f" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, -2.4, -0.1]}>
        <boxGeometry args={[1.6, 0.13, 0.75]} />
        <meshStandardMaterial color="#16161f" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ─── scene ────────────────────────────────────────────────────────────────────
export default function PCScene({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, -0.15, 7.4], fov: 42 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#08080d']} />
      <ambientLight intensity={0.55} />
      <pointLight position={[-5, 3, 5]} color={GREEN} intensity={70} />
      <pointLight position={[5, -2, 5]} color={PURPLE} intensity={70} />
      <Monitor progressRef={progressRef} />
    </Canvas>
  );
}