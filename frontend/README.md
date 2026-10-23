# Frontend de UTM Desk

React + Vite + Tailwind CSS v4.

## Comandos

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # compilación para producción
npm run lint
```

Copia `.env.example` a `.env` y ajusta `VITE_API_URL` cuando la API esté lista.

## Estructura de `src/`

```
src/
├─ assets/              imágenes y logos
├─ components/
│  ├─ layout/           Navbar, Footer
│  └─ ui/               Button, Logo, SectionHeading
├─ features/
│  └─ landing/
│     ├─ components/    una sección por archivo (Hero, Stats, HowItWorks…)
│     ├─ data.js        textos y datos de ejemplo de la landing
│     └─ index.js
├─ hooks/               hooks reutilizables (useCountUp)
├─ pages/               LandingPage (luego Login, Dashboard…)
├─ routes/              AppRouter (React Router)
└─ services/            cliente HTTP hacia la API
```

Las estadísticas y testimonios de la landing son datos de ejemplo; las estadísticas se conectarán a la API más adelante.
