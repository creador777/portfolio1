'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useScrollStore } from '@/lib/scroll-store';

const KEYFRAMES = [
  { pos: [0, 0, 5], look: [0, 0, 0] },
  { pos: [2, 0.5, 3.5], look: [0, 0, 0] },
  { pos: [3, 1.5, 1.5], look: [0, 0.3, 0] },
  { pos: [0, 2.5, -1], look: [0, 0, 0] },
  { pos: [-2, 1, -3], look: [0, 0, 0] }
];

function lerpKeyframes(t: number) {
  const scaled = t * (KEYFRAMES.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = KEYFRAMES[Math.min(i, KEYFRAMES.length - 1)];
  const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
  const smooth = f * f * (3 - 2 * f);
  return {
    pos: [
      THREE.MathUtils.lerp(a.pos[0], b.pos[0], smooth),
      THREE.MathUtils.lerp(a.pos[1], b.pos[1], smooth),
      THREE.MathUtils.lerp(a.pos[2], b.pos[2], smooth)
    ] as [number, number, number],
    look: [
      THREE.MathUtils.lerp(a.look[0], b.look[0], smooth),
      THREE.MathUtils.lerp(a.look[1], b.look[1], smooth),
      THREE.MathUtils.lerp(a.look[2], b.look[2], smooth)
    ] as [number, number, number]
  };
}

export default function ScrollCamera() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const t = useScrollStore.getState().progress;
    const { pos, look } = lerpKeyframes(t);

    const parallaxX = mouse.x * 0.25;
    const parallaxY = mouse.y * 0.15;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, pos[0] + parallaxX, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pos[1] + parallaxY, 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, pos[2], 4, dt);

    target.current.set(look[0], look[1], look[2]);
    currentLook.current.lerp(target.current, 1 - Math.exp(-4 * dt));
    camera.lookAt(currentLook.current);
  });

  return null;
}
