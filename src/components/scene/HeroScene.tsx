'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/lib/scroll-store';
import SignatureAssets, { LoadingCube } from './SignatureAssets';

function FloatingDebris() {
  const COUNT = 80;
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.6;
      arr.push({
        position: [
          Math.cos(theta) * Math.cos(phi) * r,
          Math.sin(phi) * r,
          Math.sin(theta) * Math.cos(phi) * r
        ] as [number, number, number],
        scale: 0.04 + Math.random() * 0.12,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2
      });
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scroll = useScrollStore.getState().progress;
    ref.current.rotation.y = t * 0.05 + scroll * 0.8;
    ref.current.rotation.x = scroll * 0.4;
  });

  return (
    <group ref={ref}>
      <Instances limit={COUNT} castShadow receiveShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#1a1a22" roughness={0.5} metalness={0.7} emissive="#2a1f0a" emissiveIntensity={0.15} />
        {items.map((item, i) => (
          <Instance
            key={i}
            position={item.position}
            scale={item.scale}
            rotation={item.rotation}
          />
        ))}
      </Instances>
    </group>
  );
}

function GroundRing() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
      <ringGeometry args={[1.6, 8, 64]} />
      <meshStandardMaterial
        color="#0d0d12"
        roughness={0.4}
        metalness={0.85}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 6, 3]}
        intensity={1.6}
        color="#ffe2b0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 2, -3]} intensity={1.2} color="#8a4fff" distance={12} />
      <pointLight position={[3, -1, 4]} intensity={0.8} color="#4fc3ff" distance={10} />

      <Suspense fallback={<LoadingCube />}>
        <SignatureAssets />
      </Suspense>
      <FloatingDebris />
      <GroundRing />

      <Sparkles
        count={120}
        scale={[12, 6, 12]}
        size={2.2}
        speed={0.3}
        color="#ffd28a"
        opacity={0.65}
      />
    </>
  );
}
