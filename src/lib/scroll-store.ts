'use client';

import { create } from 'zustand';

type ScrollState = {
  progress: number;
  setProgress: (p: number) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress })
}));

if (typeof window !== 'undefined') {
  let rafId = 0;
  const onScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY || doc.scrollTop || 0;
      const p = max > 0 ? y / max : 0;
      useScrollStore.getState().setProgress(Math.max(0, Math.min(1, p)));
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  setTimeout(onScroll, 50);
}
