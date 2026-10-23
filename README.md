# UTM Desk

Sistema web para reportar y dar seguimiento a las incidencias del campus (cómputo y redes, infraestructura y académico).

Proyecto de la materia Base de Datos en la Nube, Equipo 2.

## Estructura

```
utm-desk/
├─ frontend/   React + Vite + Tailwind (interfaz)
├─ backend/    API Node.js + Express en Vercel Functions (pendiente)
└─ docs/       Documentación del proyecto
```

La interfaz nunca se conecta a la base de datos: todo pasa por la API, que es la única con credenciales de MongoDB Atlas y Google Cloud Storage.
