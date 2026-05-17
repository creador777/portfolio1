'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import HeroScene from './HeroScene';
import ScrollCamera from './ScrollCamera';

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 35, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#08080b']} />
        <fog attach="fog" args={['#08080b', 8, 28]} />

        <Suspense fallback={null}>
          <ScrollCamera />
          <HeroScene />
          <Environment preset="night" environmentIntensity={0.35} />
          <Preload all />
        </Suspense>

        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0006, 0.0006] as unknown as THREE.Vector2}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
