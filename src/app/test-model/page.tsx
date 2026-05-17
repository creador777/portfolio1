'use client';

import Script from 'next/script';

export default function TestModel() {
  return (
    <>
      <Script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-[#08080b] text-white p-8 flex flex-col gap-6">
        <header>
          <h1 className="text-3xl font-serif">Test — model-viewer de Google</h1>
          <p className="text-white/60 text-sm mt-2">
            Si esto funciona, tus GLB están bien y el problema era React Three Fiber.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
              Avatar (vdesing-avatar.glb · 15 MB)
            </h2>
            <div className="aspect-square bg-black/40 rounded overflow-hidden">
              {/* @ts-expect-error model-viewer is a custom element */}
              <model-viewer
                src="/models/vdesing-avatar.glb"
                alt="Avatar chibi de Victor"
                auto-rotate
                camera-controls
                shadow-intensity="1"
                exposure="1.1"
                environment-image="neutral"
                style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0e' }}
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
              PC (vdesing-pc.glb · 44 MB)
            </h2>
            <div className="aspect-square bg-black/40 rounded overflow-hidden">
              {/* @ts-expect-error model-viewer is a custom element */}
              <model-viewer
                src="/models/vdesing-pc.glb"
                alt="PC gamer chibi"
                auto-rotate
                camera-controls
                shadow-intensity="1"
                exposure="1.1"
                environment-image="neutral"
                style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0e' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-white/40 text-xs font-mono">
          <p>· Arrastrá con el mouse para rotar</p>
          <p>· Scroll para zoom</p>
          <p>· Espera 5-15 segundos a que carguen (los archivos son pesados)</p>
        </div>
      </div>
    </>
  );
}
