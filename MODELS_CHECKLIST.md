# Checklist de modelos 3D

Cuando descargues los GLB de Meshy/Rodin/Tripo, seguí esto:

## 1. Dónde van los archivos

```
c:/Users/victor/Desktop/trabajos/portfolio-v2/public/models/
  ├── vdesing-avatar.glb    ← tu chibi
  └── vdesing-pc.glb         ← la PC gamer
```

**Importante:** nombres EXACTOS, en minúscula, con guión.

## 2. Activar cada modelo cuando llegue

Edita `src/lib/assets-config.ts`:

```ts
export const ASSETS = {
  avatar: {
    ready: true,   ← cambiar a true cuando el GLB esté en su carpeta
    ...
  },
  pc: {
    ready: true,   ← cambiar a true cuando el GLB esté en su carpeta
    ...
  }
};
```

Mientras `ready: false`, el sitio muestra el orbe dorado placeholder.
Cuando `ready: true`, carga el GLB y aplica material unificado.

## 3. Ajustar pose en escena

En el mismo `assets-config.ts` podés tocar:

- `scale` — tamaño del modelo
- `position` — [x, y, z] en la escena
- `rotation` — orientación en radianes

Recargá el navegador después de cada cambio (hot reload se encarga).

## 4. Material unificado

Ambos modelos pasan por `applyUnifiedMaterial()` que les aplica:
- Color base `#e8e0d5` (avatar) / `#2a2a30` (PC)
- Roughness `0.62` (vinyl mate)
- Metalness `0.04` (casi nada metálico)

Esto **fuerza** que se vean del mismo "mundo" sin importar lo que Meshy generó.
Si querés ajustar, edita `MATERIAL_OVERRIDE` en `assets-config.ts`.

## 5. Luces RGB de la PC

Ya están configuradas en `PC_RGB_LIGHTS`:
- Purple `#a855f7`
- Cyan `#06b6d4`
- Magenta `#ec4899`

Salen del interior de la PC y simulan el setup "$5K gaming RGB".
Posiciones y intensidades editables.

## 6. Optimización post-import (cuando ya esté funcionando)

Si los GLB pesan más de 2MB cada uno, optimízalos con:

```bash
npx gltf-transform optimize public/models/vdesing-pc.glb public/models/vdesing-pc.glb --texture-compress webp
```

Esto comprime texturas a WebP y reduce polycount sin perder calidad visible.
