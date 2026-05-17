# VDesing Portfolio v2 — Experimental

Sitio inmersivo 3D scroll-driven. Stack premium para ver hasta dónde podemos llegar.

## Stack

- **Next.js 15** + App Router + React 19
- **React Three Fiber 9** + **Drei 10** + **postprocessing**
- **GSAP 3.13** (instalado, listo para sumar ScrollTrigger/Observer)
- **Lenis** smooth scroll
- **Zustand** para state de scroll
- **Tailwind** + **oklch** colors

## Comandos

```bash
npm run dev      # http://localhost:3000
npm run build    # producción
npm run start    # producción local
```

## Estructura

```
src/
  app/
    layout.tsx       — html + body + fonts
    page.tsx         — entry, monta Scene + Overlay
    globals.css
  components/
    scene/
      Scene.tsx          — Canvas R3F + postprocessing
      ScrollCamera.tsx   — cámara que sigue el scroll por keyframes
      HeroScene.tsx      — orbe central + debris + lighting
    ui/
      Overlay.tsx        — texto que aparece sobre el 3D
  lib/
    smooth-scroll.ts     — Lenis hook
    scroll-store.ts      — zustand store con progress del scroll
```

## Próximos pasos

1. **Blender MCP** — modelar escena custom desde Claude Code (ver `BLENDER_MCP_SETUP.md`)
2. **GSAP ScrollTrigger** — animaciones complejas por sección
3. **Gaussian Splatting** — escanear con iPhone y embeber
4. **Sonido** — toggle con audio ambient (Suno)
5. **Transiciones de proyecto** — tipo tesseract de Joseph Santamaria
