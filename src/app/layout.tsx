import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VDesing — Architect of immersive web experiences',
  description: 'Diseñador y desarrollador web en Puerto Rico. Sitios inmersivos, 3D, y experiencias premium.',
  metadataBase: new URL('https://creador777.github.io'),
  openGraph: {
    title: 'VDesing — Architect of immersive web experiences',
    description: 'Sitios web inmersivos y experiencias 3D para marcas premium.',
    type: 'website',
    locale: 'es_PR'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* model-viewer — carga temprana para evitar delay del avatar */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script type="module" src="https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js" />
        {/* preload del GLB para que empiece a bajar antes de que React monte */}
        <link rel="preload" href="/models/chibi-animated.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg text-ink antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
