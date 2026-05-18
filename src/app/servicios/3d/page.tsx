'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Servicios3DRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div style={{ background: '#08080d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#39FF8B', fontSize: 12, animation: 'pulse 1.5s infinite' }}>
        Redirigiendo a la versión actualizada...
      </div>
    </div>
  );
}