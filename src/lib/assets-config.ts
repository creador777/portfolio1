export const ASSETS = {
  avatar: {
    path: '/models/vdesing-avatar.glb',
    ready: true,
    scale: 0.7,
    position: [-1.2, -0.4, 0] as [number, number, number],
    rotation: [0, 0.35, 0] as [number, number, number]
  },
  pc: {
    path: '/models/vdesing-pc.glb',
    ready: true,
    scale: 0.9,
    position: [0.9, -0.5, 0] as [number, number, number],
    rotation: [0, -0.45, 0] as [number, number, number]
  }
};

export const MATERIAL_OVERRIDE = {
  baseColor: '#e8e0d5',
  roughness: 0.62,
  metalness: 0.04,
  envMapIntensity: 0.85
};

export const PC_RGB_LIGHTS = [
  { color: '#a855f7', position: [0.9, -0.2, 0.2] as [number, number, number], intensity: 1.6, distance: 1.8 },
  { color: '#06b6d4', position: [1.1, 0.1, -0.2] as [number, number, number], intensity: 1.4, distance: 1.5 },
  { color: '#ec4899', position: [0.7, -0.4, 0.1] as [number, number, number], intensity: 1.0, distance: 1.2 }
];
