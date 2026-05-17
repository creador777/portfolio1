# VDesing v2 — Handoff document

**Última actualización:** 2026-05-14
**Estado:** En desarrollo, base funcional desplegada localmente

## Qué es esto

Rewrite premium del portafolio personal de Victor (`VDesing`), pasando de un HTML monolítico (`/trabajos/victor-design.html`, sigue intacto y NO se toca) a una arquitectura Next.js moderna con avatar 3D animado como pieza firma de marca.

Objetivo: pasar de cobrar $60-200/mes a cobrar $3-8k upfront por proyectos a clientes premium.

## Estado actual

### ✓ Hecho

- Scaffold Next.js 15.5 + TypeScript + Tailwind + Lenis
- Migración de las 11 secciones del HTML original a componentes JSX
- Avatar 3D chibi de Victor cargado en model-viewer (no R3F)
- Componente `AvatarViewer.tsx` con 4 poses (hero, witness, guide, welcoming)
- Mouse follow + breathing CSS + glow + sombra contact
- 4 spots con avatar: Hero, Terminal, Proceso, Contacto
- Servicios cortados de 8 a 6 (principio Mobbin)
- Precios cortados de 4 a 3
- Slot del video Grok en hero (`/hero-grok-pc.mp4`, pendiente)
- Ruta de diagnóstico `/test-model` para inspeccionar GLBs aislados

### ⚠ Pendiente — orden recomendado

1. **Rig + animaciones del avatar en Meshy Animate** (Victor estaba en este paso)
   - Click "Rig" en Meshy Workspace
   - Generar 4 animaciones (idle / asentimiento / presentando / saludo)
   - Descargar nuevo GLB con animaciones embebidas
   - Reemplazar `public/models/vdesing-avatar.glb`
   - Actualizar `AvatarViewer.tsx` para usar `animation-name` por pose

2. **Video Grok del hero** (paralelo al punto 1)
   - Victor generó imagen en Grok Imagine de PC gamer
   - Generar video usando prompt validado (ver memoria reference-meshy o project-vdesing-v2)
   - Descargar MP4
   - Convertir a WebM opcional: `ffmpeg -i in.mp4 -c:v libvpx-vp9 out.webm`
   - Colocar en `public/hero-grok-pc.mp4`

3. **Optimizar GLBs pesados**
   - Avatar: 15 MB → 3-4 MB
   - `npx gltf-transform optimize public/models/vdesing-avatar.glb public/models/vdesing-avatar-opt.glb --texture-compress webp`
   - Actualizar paths en `AvatarViewer.tsx`

4. **Animaciones GSAP/ScrollTrigger en las secciones**
   - Fade-up reveal de headlines
   - Stagger en cards (audiencias, servicios, trabajos, precios)
   - Number count-up en terminal
   - SplitText en h2s (estilo Awwwards)

5. **Imágenes/screenshots reales de proyectos**
   - Actualmente las cards de "Trabajos" usan bloques de color con texto fallback
   - Tomar screenshots (1600x1000) de samuraytattoo, reyesg, corta-pelo, ymusic
   - Guardar en `public/projects/`
   - Actualizar campo `logo` de cada proyecto en `page.tsx`

6. **Deploy a Vercel**
   - `vercel` desde la raíz
   - Conectar dominio (vdesing.com o el que tenga)
   - Configurar OG image + favicon

## Stack

```
Next.js 15.5 App Router + TypeScript
Tailwind 3.4
@google/model-viewer 4.0 (CDN script, no npm)
Lenis 1.3 smooth scroll
Zustand scroll progress
Fraunces + Inter + JetBrains Mono
```

**NO instalar/usar** React Three Fiber para nada nuevo. Ver memoria `feedback-no-r3f-next15`. El código R3F que sobrevive en `src/components/scene/` está muerto, no se importa desde `page.tsx`. Se puede eliminar cuando sea seguro.

## Estructura de archivos

```
portfolio-v2/
├── HANDOFF.md                          ← este archivo
├── README.md
├── BLENDER_MCP_SETUP.md                ← futuro, no usar aún
├── package.json
├── next.config.mjs
├── tsconfig.json
├── public/
│   ├── og-image.png
│   ├── hero-grok-pc.mp4                ← pendiente generar
│   └── models/
│       ├── vdesing-avatar.glb          ← 15 MB, funcional
│       └── vdesing-pc.glb              ← 44 MB, DESCARTADO (eliminar)
└── src/
    ├── app/
    │   ├── layout.tsx                  ← html + fonts
    │   ├── page.tsx                    ← TODA la página, 11 secciones inline
    │   ├── globals.css                 ← Tailwind + custom animations
    │   └── test-model/page.tsx         ← diagnóstico aislado de GLBs
    ├── components/
    │   ├── AvatarViewer.tsx            ← componente clave del avatar
    │   └── scene/                      ← código R3F muerto, no usar
    │       ├── HeroScene.tsx           ← muerto
    │       ├── Scene.tsx               ← muerto
    │       ├── ScrollCamera.tsx        ← muerto
    │       └── SignatureAssets.tsx     ← muerto
    └── lib/
        ├── smooth-scroll.ts            ← Lenis hook + integra con scroll-store
        ├── scroll-store.ts             ← zustand progress
        └── assets-config.ts            ← config viejo R3F, no usar
```

## Comandos

```bash
cd "c:/Users/victor/Desktop/trabajos/portfolio-v2"

# Dev local
npm run dev                              # → http://localhost:3000

# Producción
npm run build
npm run start

# Optimizar GLB
npx gltf-transform optimize in.glb out.glb --texture-compress webp

# Inspeccionar GLB sin código (diagnóstico)
# → abrir http://localhost:3000/test-model
```

## Decisiones de diseño (tomadas, no re-debatir)

| Decisión | Razón |
|---|---|
| Avatar en 4 spots, no 1 ni widget fijo | Opción A confirmada por Victor — ROI máximo del asset |
| model-viewer en lugar de R3F | R3F dio bugs irrecuperables con Next.js 15 + GLBs grandes |
| Sin auto-rotate del avatar | Se ve "demo de venta" — vida viene de mouse follow + breathing |
| PC chibi descartada | No le gustó visualmente — reemplaza video Grok cinematográfico |
| 6 servicios (no 8) | Principio Mobbin: menos = más pro |
| 3 planes precio (no 4) | Mismo principio. El "A la medida" se vuelve CTA |
| Material override descartado | Los GLB van con sus colores nativos de Meshy |
| Paleta cream/beige + gold accent | Clonada de Samuray (su mejor proyecto) |
| Fraunces + Inter + JetBrains Mono | Idem Samuray + Joseph Santamaria standard |

## Cómo arrancar el chat siguiente

Prompt recomendado para chat nuevo:

> Estoy retomando VDesing v2. Usá la skill `vdesing-portfolio` y leé `c:/Users/victor/Desktop/trabajos/portfolio-v2/HANDOFF.md` para ponerte al día. Lo que sigue: [explicar qué tarea concreta]

## Contactos del proyecto (URLs en vivo)

- Original: `victor-design.html` (no deployed, abrir local)
- Samuray Tattoo: https://samuraytattoo.pages.dev
- Reyes Gas: https://reyesg.vercel.app
- CortaPelo: https://corta-pelo.vercel.app
- Ymusic: https://ymusic.nucleo-evo-cuantic7.workers.dev/
- WhatsApp Victor: https://wa.me/17879449031
- Email: nucleo.evo.cuantic7@gmail.com

## Notas para futuras sesiones

- Victor prefiere español PR informal, conciso, sin paternalismo
- Cuando se frustra, no entrar a defensiva — simplificar, mostrar progreso visual
- Antes de declarar "listo", verificar con `curl http://localhost:3000` HTTP 200
- Si algo 3D no aparece, primer paso: ir a `/test-model` (descarta el GLB del problema)
- No prometer "Awwwards-tier" sin justificación — sí prometer "70-80% Rhumb/Joseph en 2-3 semanas"
