import { CheckCircle2, Clock, MapPin } from 'lucide-react'

// Ilustración isométrica del campus con tarjetas flotantes de incidencias.
export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-brand-200 via-accent-300/40 to-white blur-3xl" aria-hidden="true" />

      <svg viewBox="0 0 520 480" className="relative w-full animate-float-slow drop-shadow-2xl" role="img" aria-label="Edificio del campus con una incidencia reportada">
        <defs>
          <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dbe6fe" />
          </linearGradient>
          <linearGradient id="left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b6ff6" />
            <stop offset="1" stopColor="#1d41d8" />
          </linearGradient>
          <linearGradient id="right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e36af" />
            <stop offset="1" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="pin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5eead4" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        {/* Plataforma */}
        <path d="M260 250 L470 355 L260 460 L50 355 Z" fill="#cbd5e1" />
        <path d="M260 236 L470 341 L260 446 L50 341 Z" fill="url(#ground)" />
        <path d="M50 341 L50 355 L260 460 L260 446 Z" fill="#94a3b8" opacity="0.5" />
        <path d="M260 446 L260 460 L470 355 L470 341 Z" fill="#64748b" opacity="0.5" />

        {/* Camino */}
        <path d="M330 376 L380 401 L330 426 L280 401 Z" fill="#e2e8f0" />

        {/* Árboles */}
        <g>
          <ellipse cx="110" cy="352" rx="18" ry="8" fill="#94a3b8" opacity="0.35" />
          <rect x="107" y="320" width="6" height="30" rx="3" fill="#64748b" />
          <circle cx="110" cy="312" r="20" fill="#2dd4bf" />
          <circle cx="104" cy="306" r="8" fill="#5eead4" />
        </g>
        <g>
          <ellipse cx="400" cy="372" rx="16" ry="7" fill="#94a3b8" opacity="0.35" />
          <rect x="397" y="344" width="6" height="26" rx="3" fill="#64748b" />
          <circle cx="400" cy="337" r="17" fill="#14b8a6" />
          <circle cx="395" cy="332" r="6" fill="#5eead4" />
        </g>

        {/* Edificio: cara izquierda */}
        <path d="M140 160 L260 220 L260 380 L140 320 Z" fill="url(#left)" />
        <g transform="matrix(1 0.5 0 1 140 160)" fill="#bfd3fe" opacity="0.9">
          {[24, 64, 104].map((y) =>
            [16, 50, 84].map((x) => <rect key={`l-${x}-${y}`} x={x} y={y} width="20" height="24" rx="2" />),
          )}
        </g>

        {/* Edificio: cara derecha */}
        <path d="M260 220 L380 160 L380 320 L260 380 Z" fill="url(#right)" />
        <g transform="matrix(1 -0.5 0 1 260 220)" fill="#5eead4" opacity="0.75">
          {[24, 64, 104].map((y) =>
            [16, 50, 84].map((x) => <rect key={`r-${x}-${y}`} x={x} y={y} width="20" height="24" rx="2" />),
          )}
        </g>
        {/* Ventana con falla */}
        <g transform="matrix(1 -0.5 0 1 260 220)">
          <rect x="84" y="64" width="20" height="24" rx="2" fill="#f59e0b" />
        </g>

        {/* Puerta */}
        <g transform="matrix(1 0.5 0 1 140 160)">
          <rect x="88" y="128" width="24" height="32" rx="3" fill="#172554" />
        </g>

        {/* Techo */}
        <path d="M260 100 L380 160 L260 220 L140 160 Z" fill="url(#roof)" />
        <path d="M260 120 L340 160 L260 200 L180 160 Z" fill="#eef4ff" />

        {/* Marcador de incidencia */}
        <g className="animate-float">
          <ellipse cx="260" cy="160" rx="14" ry="6" fill="#1e3a8a" opacity="0.18" />
          <path d="M260 150 C240 125 228 112 228 92 a32 32 0 0 1 64 0 c0 20 -12 33 -32 58 Z" fill="url(#pin)" />
          <circle cx="260" cy="92" r="17" fill="#ffffff" />
          <rect x="257.5" y="81" width="5" height="14" rx="2.5" fill="#14b8a6" />
          <circle cx="260" cy="101" r="2.8" fill="#14b8a6" />
        </g>
      </svg>

      {/* Tarjeta: incidencia nueva */}
      <div className="absolute -left-2 top-4 w-44 rounded-2xl bg-white/90 p-3 sm:top-10 sm:w-52 sm:p-4 shadow-lift ring-1 ring-slate-100 backdrop-blur animate-float sm:-left-8">
        <p className="text-xs font-semibold text-brand-600">INC-2026-0142</p>
        <p className="mt-1 text-sm font-bold text-brand-950">Sin internet en Lab. 3</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Edificio C
        </p>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
          <Clock className="h-3 w-3" aria-hidden="true" /> En atención
        </span>
      </div>

      {/* Tarjeta: resuelta */}
      <div className="absolute -right-2 bottom-4 flex items-center gap-3 rounded-2xl bg-white/90 p-3 sm:bottom-12 sm:p-4 shadow-lift ring-1 ring-slate-100 backdrop-blur animate-float-slow sm:-right-6">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-300/30 text-accent-500">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-bold text-brand-950">Incidencia resuelta</p>
          <p className="text-xs text-slate-500">Proyector · Aula B‑204</p>
        </div>
      </div>
    </div>
  )
}
