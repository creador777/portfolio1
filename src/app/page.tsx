'use client';

import { useSmoothScroll } from '@/lib/smooth-scroll';
import AvatarViewer from '@/components/AvatarViewer';
import CodeToRealitySection from '@/components/CodeToRealitySection';

const AUDIENCES = [
  { emoji: '🛠️', title: 'Dueños de negocio', body: 'Que tus clientes te encuentren, te llamen, te paguen y te agenden — todo desde un solo lugar.' },
  { emoji: '🎨', title: 'Artistas', body: 'Una galería seria para tu trabajo. Tatuajes, fotografía, ilustración, pintura. Que se vea como en revista.' },
  { emoji: '🎤', title: 'Cantantes y bandas', body: 'Tu música, tus videos, tus fechas, tu tienda de merch. Tu universo en un solo enlace.' },
  { emoji: '📱', title: 'Creadores de contenido', body: 'Un home digital para tu marca. Más profesional que un link-in-bio, más tuyo que un perfil prestado.' }
];

const MARQUEE_ITEMS = [
  'Barberos', 'Tatuadores', 'Cantantes', 'Repostería', 'Fotógrafos', 'Mecánicos',
  'Creadores', 'Restaurantes', 'Bandas', 'Pintores', 'Iglesias', 'Pequeños comercios'
];

const SERVICES = [
  { title: 'Tu sitio, tu identidad', body: 'Cada negocio, cada artista, cada marca es única. Tu sitio también. Nada de plantillas iguales a las del vecino. Incluye tu dominio .com y galería profesional.' },
  { title: 'Mensajes en tu WhatsApp', body: 'Lo que un cliente escribe en tu sitio te llega directo al celular. No tienes que estar revisando correos.' },
  { title: 'Citas y reservas', body: 'Tus clientes agendan ellos mismos, en el horario que está abierto. Tú solo recibes la confirmación.' },
  { title: 'Cobra desde tu sitio', body: 'Tarjeta de crédito, suscripciones, depósitos para reservas. Sin intermediarios que te coman las ganancias.' },
  { title: 'Se instala como app', body: 'Tu sitio aparece como ícono en el celular de tus clientes. Funciona sin internet. Sin pasar por App Store.' },
  { title: 'Asistente que conversa solo', body: 'Un chat inteligente que contesta a tus clientes en español, agenda y resuelve dudas — 24/7 — sin que tengas que estar pendiente.' }
];

const PROJECTS = [
  { tag: 'Cliente activo', title: 'Estudio de tatuajes', desc: 'Sitio completo con galería de trabajos, sistema de citas y conexión directa a WhatsApp e Instagram. Optimizado para celular — donde están sus clientes.', tags: ['Galería', 'Reservas', 'WhatsApp'], url: 'https://samuraytattoo.pages.dev', extraUrl: 'https://www.instagram.com/samuraytattoostudio', extraLabel: 'Instagram', logo: '/projects/samuray.jpg', fallbackBg: 'oklch(15% 0.02 280)' },
  { tag: 'Entrega · Caguas', title: 'Pedidos de gas propano', desc: 'El cliente pide, comparte su ubicación GPS, y la orden llega completa por WhatsApp al negocio. Sin app que instalar, sin formularios largos.', tags: ['GPS', 'Órdenes', 'WhatsApp'], url: 'https://reyesg.vercel.app', fallbackBg: 'oklch(20% 0.07 30)' },
  { tag: 'Barbería', title: 'Reservas para barbería', desc: 'Agenda online, panel para administrar, y un chatbot que conversa con los clientes y los agenda automáticamente. Confirmaciones por WhatsApp.', tags: ['Citas', 'Asistente IA', 'Panel admin'], url: 'https://corta-pelo.vercel.app', fallbackBg: 'oklch(20% 0.05 90)' },
  { tag: 'Para músicos · Showcase', title: 'Experiencia de audio inmersiva', desc: 'Demostración de hasta dónde puede llegar un sitio web: música con visuales en tiempo real, video de fondo, ambiente envolvente. Para artistas que quieren algo que nadie más tiene.', tags: ['Música', 'Visuales', 'Experiencia'], url: 'https://ymusic.nucleo-evo-cuantic7.workers.dev/', fallbackBg: 'oklch(18% 0.08 340)' },
  { tag: 'Bienes raíces', title: 'IslaValora — Valoración', desc: 'Plataforma para evaluar el valor de propiedades en PR. Formularios guiados, cálculos automáticos y reportes generados al instante.', tags: ['Formularios', 'Cálculos', 'Reportes'], url: '#contacto', extraLabel: 'Pedir demo', fallbackBg: 'oklch(18% 0.05 200)' }
];

const STEPS = [
  { n: '01', title: 'Conversamos', body: 'Me cuentas qué haces, qué quieres lograr, cómo te imaginas el sitio. Por WhatsApp, llamada o en persona.' },
  { n: '02', title: 'Te muestro', body: 'Hago una primera versión y te la enseño. Tú me dices qué te gusta, qué cambiar. Sin compromiso.' },
  { n: '03', title: 'Construimos', body: 'Termino todo lo que acordamos. Te envío avances. Tú apruebas cada paso antes de seguir.' },
  { n: '04', title: 'Estrenamos', body: 'Sitio en vivo, dominio conectado, te enseño cómo administrarlo. Soporte incluido.' }
];

const TESTIMONIALS = [
  { quote: 'Antes vivía contestando DMs todo el día. Ahora la gente me llega por WhatsApp con la fecha ya pensada y el diseño que quieren. Me cambió cómo trabajo.', name: 'Samuel', role: 'Samuray Tattoo', initial: 'S' },
  { quote: 'Necesitaba algo serio que diera confianza al valorar una propiedad. Víctor entendió el negocio sin que se lo explicara dos veces y entregó algo que se ve profesional de verdad.', name: 'Julio', role: 'Bienes raíces · IslaValora', initial: 'J' },
  { quote: 'Quería algo que se viera distinto a todo lo demás. Víctor hizo que mi música se sintiera como una experiencia completa, no como una página web cualquiera.', name: 'Ninoshka', role: 'Ymusic · Artista', initial: 'N' }
];

const PRICING = [
  { name: 'Esencial', who: 'Una presencia digital sencilla y profesional.', features: ['Página principal hecha a la medida', 'Información de contacto y WhatsApp', 'Optimizado para celular', 'Tu dominio .com conectado'], cta: 'Pedir cotización', waText: 'Hola%20V%C3%ADctor%2C%20me%20interesa%20una%20p%C3%A1gina%20Esencial', featured: false },
  { name: 'Negocio', who: 'Para negocios que reciben pedidos, citas o pagos.', features: ['Todo lo del plan Esencial', 'Sistema de citas o pedidos', 'Galería o catálogo', 'WhatsApp con mensajes pre-armados', 'Panel admin desde tu celular'], cta: 'Pedir cotización', waText: 'Hola%20V%C3%ADctor%2C%20me%20interesa%20una%20p%C3%A1gina%20de%20Negocio', featured: true },
  { name: 'Creador', who: 'Para artistas, músicos y creadores de contenido.', features: ['Todo lo del plan Negocio', 'Galería profesional (música, fotos, videos)', 'Tienda en línea para merch', 'Página de fechas / eventos', 'Diseño a tu identidad visual'], cta: 'Pedir cotización', waText: 'Hola%20V%C3%ADctor%2C%20me%20interesa%20una%20p%C3%A1gina%20de%20Creador', featured: false }
];

const WA_URL = 'https://wa.me/17879449031';

export default function Home() {
  useSmoothScroll();

  return (
    <>
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-5 backdrop-blur-md bg-bg/60 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-tight">
            V<span className="text-gold">Desing</span><span className="text-gold">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em] text-ink/60">
            <a href="#servicios" className="hover:text-ink transition-colors">Servicios</a>
            <a href="#demo" className="hover:text-[#39FF8B] text-[#39FF8B]/60 transition-colors">Code to Reality</a>
            <a href="#precios" className="hover:text-ink transition-colors">Precios</a>
            <a href="#contacto" className="hover:text-ink transition-colors">Contacto</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] flex items-center px-6 md:px-10 pt-32 pb-20 overflow-hidden">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-40 -z-10"
          poster="/og-image.png"
        >
          <source src="/hero-grok-pc.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/60 to-bg -z-10" />
        <div className="absolute inset-0 -z-10" style={{
          background: 'radial-gradient(ellipse at 30% 50%, oklch(15% 0.04 280 / 0.5), transparent 60%)'
        }} />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-ink/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponible para nuevos proyectos
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em] font-medium">
              Tu sitio,<br />
              tu <span className="text-gold italic">mundo,</span><br />
              en línea.
            </h1>
            <p className="mt-8 max-w-md text-ink/70 leading-relaxed text-lg">
              Hago páginas web para negocios, artistas, creadores y músicos en Puerto Rico.
              Diseñadas a mano, una por una. Sin plantillas.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`${WA_URL}?text=Hola%20V%C3%ADctor%2C%20quiero%20una%20p%C3%A1gina%20web`} target="_blank" rel="noopener"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-bg font-medium rounded-full hover:bg-gold/90 transition-colors">
                Escríbeme por WhatsApp
              </a>
              <a href="#trabajos"
                 className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 rounded-full hover:bg-white/5 transition-colors">
                Ver trabajos
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <AvatarViewer pose="hero" size="xl" />
          </div>
        </div>
      </section>

      {/* CODE TO REALITY — segunda sección, visible de inmediato al scrollear */}
      <div id="demo">
        <CodeToRealitySection />
      </div>

      {/* TERMINAL */}
      <section className="relative px-6 md:px-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-[0_30px_80px_oklch(0%_0_0/0.5)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="flex-1 text-center text-xs font-mono text-ink/40">~ vdesing — bash</span>
              <span className="w-12" />
            </div>
            <div className="p-6 md:p-10 font-mono text-sm md:text-base space-y-3">
              <div><span className="text-gold">~$</span> <span className="text-ink/50">sitios_en_vivo:</span> <span className="text-ink">7+</span></div>
              <div><span className="text-gold">~$</span> <span className="text-ink/50">hecho_a_medida:</span> <span className="text-ink">100%</span></div>
              <div><span className="text-gold">~$</span> <span className="text-ink/50">region:</span> <span className="text-ink">Puerto_Rico</span></div>
              <div><span className="text-gold">~$</span> <span className="text-ink/50">status:</span> <span className="text-green-400">disponible</span><span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse align-middle" /></div>
            </div>
          </div>
          <div className="hidden md:block">
            <AvatarViewer pose="witness" size="md" />
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-4">Para quién es esto</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Si tienes algo que mostrarle al mundo, te hago el espacio.
            </h2>
            <p className="mt-6 text-ink/60 text-lg">
              No importa si vendes empanadillas, tatuajes, casas o canciones. Si tu trabajo es bueno, merece un sitio bueno.
            </p>
          </div>

          <div className="relative overflow-hidden border-y border-white/[0.06] py-6 mb-16 -mx-6 md:-mx-10">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="font-serif text-2xl md:text-3xl text-ink/30">
                  {item} <span className="text-gold/40 ml-12">·</span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="p-6 border border-white/[0.06] rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="text-3xl mb-4">{a.emoji}</div>
                <h3 className="font-serif text-xl mb-3">{a.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-4">Qué hago</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Sitios que trabajan por ti, no solo te ven bonito.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="p-8 bg-bg hover:bg-white/[0.02] transition-colors">
                <div className="text-xs font-mono text-gold mb-4">0{i + 1}</div>
                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRABAJOS */}
      <section id="trabajos" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-4">Portafolio</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Algunos de mis trabajos.
            </h2>
            <p className="mt-6 text-ink/60 text-lg">
              Cada uno hecho a mano, desde el diseño hasta la publicación. Negocios y proyectos reales operando en Puerto Rico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <article key={p.title} className="group relative overflow-hidden border border-white/[0.06] rounded-2xl bg-white/[0.02]">
                <div className="aspect-[16/10] flex items-center justify-center" style={{ background: p.fallbackBg }}>
                  <span className="font-serif text-4xl text-ink/30">{p.title.split(' ')[0]}</span>
                </div>
                <div className="p-8">
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold/80 mb-3">{p.tag}</div>
                  <h3 className="font-serif text-2xl mb-3">{p.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/10 text-ink/60">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={p.url} target="_blank" rel="noopener"
                       className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold/80 transition-colors">
                      {p.extraLabel === 'Pedir demo' ? p.extraLabel : 'Ver sitio'} →
                    </a>
                    {p.extraUrl && (
                      <a href={p.extraUrl} target="_blank" rel="noopener"
                         className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink/80 transition-colors">
                        {p.extraLabel}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO + AVATAR GUÍA */}
      <section className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start mb-16">
            <div className="hidden md:block">
              <AvatarViewer pose="guide" size="md" />
            </div>
            <div className="max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-4">Cómo trabajamos</div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium text-balance">
                Cuatro pasos. Sin enredos.
              </h2>
              <p className="mt-6 text-ink/60 text-lg">
                Desde el primer mensaje hasta el sitio en vivo. Tú me dices qué necesitas. Yo te entrego.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="p-6">
                <div className="font-mono text-5xl text-gold/30 mb-4">{s.n}</div>
                <h4 className="font-serif text-2xl mb-3">{s.title}</h4>
                <p className="text-sm text-ink/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-4">Lo que dicen</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Personas reales. Negocios reales.
            </h2>
            <p className="mt-6 text-ink/60 text-lg">
              No son influencers ni pagados. Son los dueños y artistas detrás de los proyectos que viste arriba.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-8 border border-white/[0.06] rounded-2xl bg-white/[0.02] flex flex-col">
                <div className="font-serif text-6xl text-gold/30 leading-none mb-4">"</div>
                <p className="text-ink/80 leading-relaxed flex-1 italic font-serif text-lg">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center font-medium">{t.initial}</div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-ink/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-4">Cómo se cobra</div>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium text-balance">
              Se cotiza según el sitio.
            </h2>
            <p className="mt-6 text-ink/60 text-lg">
              Tú me dices qué necesitas — cuántas secciones, qué funciones, qué estilo — y te paso un precio claro. Sin paquetes prefabricados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <div key={p.name} className={`p-8 border rounded-2xl flex flex-col ${p.featured ? 'border-gold/40 bg-gold/[0.04] relative' : 'border-white/[0.06] bg-white/[0.02]'}`}>
                {p.featured && (
                  <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] bg-gold text-bg rounded-full">Más pedido</span>
                )}
                <h3 className="font-serif text-3xl mb-2">{p.name}</h3>
                <p className="text-sm text-ink/60 mb-6">{p.who}</p>
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-gold/70 mb-6">Se cotiza según el sitio</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-ink/80">
                      <span className="text-gold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={`${WA_URL}?text=${p.waText}`} target="_blank" rel="noopener"
                   className={`text-center px-6 py-3 rounded-full font-medium transition-colors ${p.featured ? 'bg-gold text-bg hover:bg-gold/90' : 'border border-white/15 hover:bg-white/5'}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href={`${WA_URL}?text=Hola%20V%C3%ADctor%2C%20tengo%20un%20proyecto%20a%20la%20medida`} target="_blank" rel="noopener"
               className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors">
              ¿Algo más grande o distinto? Hablemos →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO + AVATAR WELCOMING */}
      <section id="contacto" className="relative px-6 md:px-10 py-20 md:py-32 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center p-8 md:p-14 border border-white/10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] font-medium">
                ¿Empezamos a <span className="text-gold italic">construir</span>?
              </h2>
              <p className="mt-6 text-ink/70 text-lg max-w-md">
                La forma más rápida es un mensaje por WhatsApp. Cuéntame qué tienes en mente — sin compromiso.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={`${WA_URL}?text=Hola%20V%C3%ADctor%2C%20quiero%20una%20p%C3%A1gina%20web`} target="_blank" rel="noopener"
                   className="inline-flex items-center gap-3 px-6 py-3 bg-gold text-bg font-medium rounded-full hover:bg-gold/90 transition-colors">
                  Escríbeme por WhatsApp →
                </a>
                <a href="mailto:nucleo.evo.cuantic7@gmail.com?subject=Quiero%20una%20p%C3%A1gina%20web"
                   className="inline-flex items-center gap-3 px-6 py-3 border border-white/15 rounded-full hover:bg-white/5 transition-colors">
                  Email
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 text-sm text-ink/50">
                <a href="tel:+17879449031" className="hover:text-ink transition-colors">(787) 944-9031</a>
                <a href="mailto:nucleo.evo.cuantic7@gmail.com" className="hover:text-ink transition-colors">nucleo.evo.cuantic7@gmail.com</a>
                <span>Puerto Rico</span>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <AvatarViewer pose="welcoming" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 md:px-10 py-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-ink/40">
          <div className="flex items-center gap-2">
            <span className="font-serif text-base text-ink/60">V</span>
            <span>VDesing · Hecho en PR · 2026</span>
          </div>
          <div>Diseñado y desarrollado por mí. Como todo lo que aquí ves.</div>
        </div>
      </footer>
    </>
  );
}
