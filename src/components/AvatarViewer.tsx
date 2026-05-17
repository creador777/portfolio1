'use client';

import { useEffect, useRef, useState } from 'react';

type Pose = 'hero' | 'witness' | 'guide' | 'welcoming' | 'default';
type SizeKey = 'sm' | 'md' | 'lg' | 'xl' | 'hero';

interface Props {
  pose?: Pose;
  size?: SizeKey;
  className?: string;
  ariaLabel?: string;
  followMouse?: boolean;
}

type OrbitTarget = {
  azimuth: number;
  elevation: number;
  radius: number;
  targetY: number;
  fov: number;
};

const POSE_CONFIG: Record<Pose, OrbitTarget> = {
  hero: { azimuth: 10, elevation: 78, radius: 3.4, targetY: 0.55, fov: 34 },
  witness: { azimuth: -22, elevation: 76, radius: 3.6, targetY: 0.6, fov: 32 },
  guide: { azimuth: 18, elevation: 75, radius: 3.5, targetY: 0.6, fov: 33 },
  welcoming: { azimuth: -8, elevation: 80, radius: 3.0, targetY: 0.65, fov: 36 },
  default: { azimuth: 0, elevation: 78, radius: 3.4, targetY: 0.6, fov: 34 }
};

const SIZE_CONFIG: Record<SizeKey, { width: string; height: string }> = {
  sm: { width: '200px', height: '280px' },
  md: { width: '300px', height: '420px' },
  lg: { width: '440px', height: '600px' },
  xl: { width: '560px', height: '780px' },
  hero: { width: '100%', height: '100%' }
};

let scriptLoaded = false;
function ensureScript() {
  if (typeof window === 'undefined') return;
  if (scriptLoaded || document.querySelector('script[data-model-viewer]')) return;
  const s = document.createElement('script');
  s.type = 'module';
  s.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js';
  s.setAttribute('data-model-viewer', '');
  document.head.appendChild(s);
  scriptLoaded = true;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AvatarViewer({
  pose = 'default',
  size = 'md',
  className = '',
  ariaLabel = 'Avatar 3D de Victor — VDesing',
  followMouse = true
}: Props) {
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement & { cameraOrbit?: string; cameraTarget?: string }>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ az: 0, el: 0 });
  const currentRef = useRef({ az: 0, el: 0 });

  const base = POSE_CONFIG[pose];
  const sz = SIZE_CONFIG[size];

  useEffect(() => {
    ensureScript();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current || !followMouse) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      targetRef.current.az = dx * 14;
      targetRef.current.el = -dy * 6;
    };

    const tick = () => {
      currentRef.current.az = lerp(currentRef.current.az, targetRef.current.az, 0.06);
      currentRef.current.el = lerp(currentRef.current.el, targetRef.current.el, 0.06);

      const v = viewerRef.current;
      if (v) {
        const az = base.azimuth + currentRef.current.az;
        const el = base.elevation + currentRef.current.el;
        v.cameraOrbit = `${az}deg ${el}deg ${base.radius}m`;
        v.cameraTarget = `0m ${base.targetY}m 0m`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    if (followMouse) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, followMouse, base.azimuth, base.elevation, base.radius, base.targetY]);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          width: sz.width,
          height: sz.height,
          background:
            'radial-gradient(circle at 50% 60%, oklch(20% 0.02 280) 0%, transparent 70%)'
        }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`avatar-wrap ${className}`}
      style={{
        width: sz.width,
        height: sz.height,
        position: 'relative'
      }}
    >
      {/* Glow detrás */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 65%, oklch(78% 0.13 80 / 0.18) 0%, transparent 55%)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />
      {/* Sombra contact en el piso */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '15%',
          right: '15%',
          height: '20px',
          background: 'radial-gradient(ellipse, oklch(0% 0 0 / 0.55) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none'
        }}
      />

      <div className="avatar-breathe" style={{ width: '100%', height: '100%', position: 'relative' }}>
        {/* @ts-expect-error model-viewer is a custom element */}
        <model-viewer
          ref={viewerRef}
          src="/models/vdesing-avatar.glb"
          alt={ariaLabel}
          camera-orbit={`${base.azimuth}deg ${base.elevation}deg ${base.radius}m`}
          camera-target={`0m ${base.targetY}m 0m`}
          field-of-view={`${base.fov}deg`}
          interaction-prompt="none"
          disable-zoom
          disable-pan
          disable-tap
          shadow-intensity="1.2"
          shadow-softness="0.8"
          exposure="1.15"
          tone-mapping="aces"
          environment-image="neutral"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            '--poster-color': 'transparent'
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
