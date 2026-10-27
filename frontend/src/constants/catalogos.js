// Catálogos compartidos por la interfaz (los mismos valores que valida la API).

export const ROLES = {
  reportante: 'Reportante',
  tecnico: 'Técnico',
  coordinador: 'Coordinador',
  directivo: 'Directivo',
  soporte_ti: 'Soporte TI',
}

export const ESTADOS = {
  abierta: { label: 'Abierta', clase: 'bg-brand-50 text-brand-700 ring-brand-100' },
  asignada: { label: 'Asignada', clase: 'bg-indigo-50 text-indigo-700 ring-indigo-100' },
  en_proceso: { label: 'En proceso', clase: 'bg-accent-100 text-accent-600 ring-accent-200' },
  resuelta: { label: 'Resuelta', clase: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  cerrada: { label: 'Cerrada', clase: 'bg-slate-100 text-slate-600 ring-slate-200' },
}

export const PRIORIDADES = {
  baja: { label: 'Baja', clase: 'text-slate-500' },
  media: { label: 'Media', clase: 'text-brand-600' },
  alta: { label: 'Alta', clase: 'text-accent-600' },
  critica: { label: 'Crítica', clase: 'text-red-700' },
}

export const CATEGORIAS = {
  computo_redes: {
    label: 'Cómputo y redes',
    campo: 'tipo_equipo',
    campoLabel: 'Tipo de equipo',
    opciones: { computadora: 'Computadora', red: 'Red / Wi‑Fi', proyector: 'Proyector', impresora: 'Impresora', software: 'Software', otro: 'Otro' },
  },
  infraestructura: {
    label: 'Infraestructura',
    campo: 'tipo_instalacion',
    campoLabel: 'Tipo de instalación',
    opciones: { electrica: 'Eléctrica', hidraulica: 'Hidráulica', mobiliario: 'Mobiliario', clima: 'Clima', limpieza: 'Limpieza', otro: 'Otro' },
  },
  academico: {
    label: 'Académico',
    campo: 'asunto',
    campoLabel: 'Asunto',
    opciones: { aula: 'Aula', horario: 'Horario', material: 'Material', otro: 'Otro' },
  },
}

export const EDIFICIOS = ['Edificio A', 'Edificio B', 'Edificio C', 'Edificio D', 'Biblioteca', 'Laboratorios', 'Rectoría', 'Cafetería', 'Gimnasio']

export const formatoFecha = (fecha) =>
  new Date(fecha).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
