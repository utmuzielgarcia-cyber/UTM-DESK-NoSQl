import {
  BarChart3,
  Building2,
  Camera,
  ClipboardCheck,
  GraduationCap,
  HardHat,
  History,
  Monitor,
  Search,
  Send,
  ShieldCheck,
  Tags,
  UserCheck,
  UserCog,
  Wrench,
} from 'lucide-react'

// Pasos de la narrativa por scroll.
export const story = [
  {
    icon: Send,
    kicker: 'Paso 01',
    title: 'Reporta',
    text: 'Elige categoría y edificio, describe el problema y sube fotos. Listo en menos de un minuto.',
    color: 'bg-brand-600',
    status: 'Abierta',
  },
  {
    icon: UserCheck,
    kicker: 'Paso 02',
    title: 'Se asigna',
    text: 'Coordinación revisa el reporte y lo asigna al técnico ideal. Tú ves quién lo atiende.',
    color: 'bg-brand-900',
    status: 'Asignada',
  },
  {
    icon: Wrench,
    kicker: 'Paso 03',
    title: 'Se atiende',
    text: 'El técnico actualiza el estado, registra horas y deja evidencia del trabajo.',
    color: 'bg-accent-500',
    status: 'En atención',
  },
  {
    icon: ClipboardCheck,
    kicker: 'Paso 04',
    title: 'Se cierra',
    text: 'Recibes la confirmación y el historial completo queda guardado con su folio.',
    color: 'bg-accent-400',
    status: 'Cerrada',
  },
]

// "Sabores": las tres categorías de incidencias.
export const categories = [
  {
    icon: Monitor,
    name: 'Cómputo y redes',
    tagline: 'Wi‑Fi, laboratorios, proyectores y cuentas.',
    examples: ['Sin internet', 'PC no enciende', 'Proyector', 'Software'],
    bg: 'bg-brand-600',
    text: 'text-white',
    chip: 'bg-white/15 text-white',
  },
  {
    icon: Building2,
    name: 'Infraestructura',
    tagline: 'Electricidad, agua, clima y mobiliario.',
    examples: ['Apagón', 'Fuga', 'Aire acondicionado', 'Butacas'],
    bg: 'bg-accent-500',
    text: 'text-ink',
    chip: 'bg-ink/10 text-ink',
  },
  {
    icon: GraduationCap,
    name: 'Académico',
    tagline: 'Aulas, horarios y materiales de clase.',
    examples: ['Aula ocupada', 'Horario', 'Material', 'Laboratorio'],
    bg: 'bg-ink',
    text: 'text-white',
    chip: 'bg-white/15 text-white',
  },
]

// "Ingredientes": lo que hace funcionar a UTM Desk.
export const ingredients = [
  { icon: Camera, name: 'Evidencias en la nube', text: 'Fotos y archivos seguros con enlaces firmados.', color: 'text-brand-600' },
  { icon: History, name: 'Historial completo', text: 'Cada cambio con fecha, hora y autor.', color: 'text-brand-900' },
  { icon: Search, name: 'Búsqueda en español', text: 'Encuentra cualquier reporte escribiendo.', color: 'text-brand-600' },
  { icon: BarChart3, name: 'Analítica', text: 'Incidencias por edificio y tendencias.', color: 'text-accent-500' },
  { icon: Tags, name: 'Etiquetas', text: 'Ranking de los problemas más frecuentes.', color: 'text-brand-600' },
  { icon: ShieldCheck, name: 'Permisos por rol', text: 'Cada quien ve solo lo que le toca.', color: 'text-brand-900' },
]

export const roles = [
  { icon: Send, name: 'Reportante', text: 'Crea y sigue sus incidencias.' },
  { icon: HardHat, name: 'Técnico', text: 'Atiende lo que tiene asignado.' },
  { icon: UserCog, name: 'Coordinador', text: 'Asigna, cierra y lo ve todo.' },
  { icon: BarChart3, name: 'Directivo', text: 'Consulta reportes y analítica.' },
  { icon: ShieldCheck, name: 'Soporte TI', text: 'Mantiene el sistema y los usuarios.' },
]

// Datos de ejemplo; más adelante vendrán de la API.
export const stats = [
  { value: 1284, label: 'incidencias cerradas', suffix: '' },
  { value: 18.5, label: 'horas promedio de atención', suffix: 'h', decimals: 1 },
  { value: 24, label: 'edificios conectados', suffix: '' },
  { value: 96, label: 'resueltas a tiempo', suffix: '%' },
]

export const marqueeWords = ['Reporta', 'Asigna', 'Atiende', 'Cierra', 'Evidencia', 'Folio', 'Analítica', 'Campus']
