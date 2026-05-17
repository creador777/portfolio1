'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ASSETS, PC_RGB_LIGHTS } from '@/lib/assets-config';
import { useScrollStore } from '@/lib/scroll-store';

function AvatarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASSETS.avatar.path);

  useEffect(() => {
    console.log('[avatar] scene:', scene);
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    console.log('[avatar] size:', size.toArray());
  }, [scene]);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = ASSETS.avatar.position[1] + Math.sin(t * 0.8) * 0.04;
    groupRef.current.rotation.y = ASSETS.avatar.rotation[1] + mouse.x * 0.15;
  });

  return (
    <group
      ref={groupRef}
      position={ASSETS.avatar.position}
      rotation={ASSETS.avatar.rotation}
      scale={ASSETS.avatar.scale}
    >
      <primitive object={scene} />
    </group>
  );
}

function PCModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASSETS.pc.path);

  useEffect(() => {
    console.log('[pc] scene:', scene);
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    console.log('[pc] size:', size.toArray());
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const scroll = useScrollStore.getState().progress;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = ASSETS.pc.rotation[1] + t * 0.05 + scroll * 0.6;
  });

  return (
    <group
      ref={groupRef}
      position={ASSETS.pc.position}
      rotation={ASSETS.pc.rotation}
      scale={ASSETS.pc.scale}
    >
      <primitive object={scene} />
      {PC_RGB_LIGHTS.map((light, i) => (
        <pointLight
          key={i}
          color={light.color}
          intensity={light.intensity}
          distance={light.distance}
          position={light.position}
        />
      ))}
    </group>
  );
}

function LoadingCube() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = t * 0.4;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#d4a850" wireframe />
    </mesh>
  );
}

function PlaceholderOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scroll = useScrollStore.getState().progress;
    ref.current.rotation.y = t * 0.15 + scroll * Math.PI * 1.5;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    ref.current.scale.setScalar(1 + scroll * 0.35);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} castShadow receiveShadow>
        <icosahedronGeometry args={[1.1, 32]} />
        <meshStandardMaterial
          color="#d4a850"
          roughness={0.18}
          metalness={0.92}
          emissive="#3a2a10"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function SignatureAssets() {
  const showAvatar = ASSETS.avatar.ready;
  const showPC = ASSETS.pc.ready;
  const showPlaceholder = !showAvatar && !showPC;

  return (
    <>
      {showPlaceholder && <PlaceholderOrb />}
      {showAvatar && <AvatarModel />}
      {showPC && <PCModel />}
    </>
  );
}

export { LoadingCube };
