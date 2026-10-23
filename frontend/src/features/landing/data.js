import {
  BarChart3,
  Building2,
  ClipboardCheck,
  GraduationCap,
  HardHat,
  Monitor,
  Search,
  Send,
  ShieldCheck,
  UserCheck,
  Wrench,
  Camera,
  History,
  UserCog,
} from 'lucide-react'

// Datos de ejemplo. Más adelante las estadísticas vendrán de la API.
export const stats = [
  { value: 1284, label: 'Incidencias cerradas este semestre', suffix: '' },
  { value: 18.5, label: 'Horas promedio de atención', suffix: ' h', decimals: 1 },
  { value: 24, label: 'Edificios conectados', suffix: '' },
  { value: 96, label: 'Reportes resueltos a tiempo', suffix: '%' },
]

export const steps = [
  {
    icon: Send,
    title: 'Reporta',
    description: 'Describe el problema, elige la categoría y el edificio, y adjunta fotos como evidencia.',
  },
  {
    icon: UserCheck,
    title: 'Se asigna',
    description: 'La coordinación revisa el reporte y lo asigna al técnico adecuado en minutos.',
  },
  {
    icon: Wrench,
    title: 'Se atiende',
    description: 'El técnico actualiza el estado, registra horas y sube evidencias del trabajo.',
  },
  {
    icon: ClipboardCheck,
    title: 'Se cierra',
    description: 'Recibes la confirmación y el historial completo queda guardado con su folio.',
  },
]

export const categories = [
  {
    icon: Monitor,
    title: 'Cómputo y redes',
    description: 'Equipos que no encienden, fallas de internet, proyectores, software y cuentas.',
    examples: ['Wi‑Fi', 'Laboratorios', 'Proyectores'],
    color: 'from-brand-500 to-brand-700',
  },
  {
    icon: Building2,
    title: 'Infraestructura',
    description: 'Instalaciones eléctricas, agua, mobiliario, aires acondicionados y limpieza.',
    examples: ['Electricidad', 'Mobiliario', 'Clima'],
    color: 'from-accent-400 to-accent-500',
  },
  {
    icon: GraduationCap,
    title: 'Académico',
    description: 'Aulas, horarios, materiales y cualquier situación que afecte las clases.',
    examples: ['Aulas', 'Horarios', 'Material'],
    color: 'from-indigo-400 to-violet-600',
  },
]

export const roles = [
  {
    icon: Send,
    title: 'Reportante',
    description: 'Crea incidencias y da seguimiento únicamente a las suyas.',
  },
  {
    icon: HardHat,
    title: 'Técnico',
    description: 'Atiende las incidencias asignadas: estado, horas, evidencias y etiquetas.',
  },
  {
    icon: UserCog,
    title: 'Coordinador',
    description: 'Asigna y cierra incidencias, ve todo el campus y consulta la analítica.',
  },
  {
    icon: BarChart3,
    title: 'Directivo',
    description: 'Consulta en modo lectura los reportes y la analítica para tomar decisiones.',
  },
  {
    icon: ShieldCheck,
    title: 'Soporte TI',
    description: 'Da mantenimiento al sistema y gestiona el alta de usuarios.',
  },
]

export const features = [
  { icon: Camera, title: 'Evidencias', description: 'Fotos y archivos guardados de forma segura en la nube.' },
  { icon: History, title: 'Historial', description: 'Cada cambio de estado queda registrado con fecha y autor.' },
  { icon: Search, title: 'Búsqueda', description: 'Encuentra cualquier reporte escribiendo en español.' },
  { icon: BarChart3, title: 'Analítica', description: 'Incidencias por edificio y etiquetas más frecuentes.' },
]

// Testimonios de ejemplo para el prototipo.
export const testimonials = [
  {
    quote:
      'Antes mandaba correos y nunca sabía si alguien los leía. Ahora veo en qué estado va mi reporte con su folio.',
    name: 'Daniela R.',
    role: 'Estudiante de Ingeniería',
    initials: 'DR',
  },
  {
    quote:
      'Tengo mis incidencias asignadas en un solo lugar y puedo subir la foto del trabajo terminado desde el celular.',
    name: 'Marco A.',
    role: 'Técnico de redes',
    initials: 'MA',
  },
  {
    quote:
      'La analítica por edificio nos ayudó a detectar dónde se concentran las fallas y planear el mantenimiento.',
    name: 'Laura G.',
    role: 'Coordinación de servicios',
    initials: 'LG',
  },
]
