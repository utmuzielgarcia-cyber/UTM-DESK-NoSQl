# UTM Desk

Sistema web para reportar y dar seguimiento a las incidencias del campus (cómputo y redes, infraestructura y académico).

Proyecto de la materia Base de Datos en la Nube, Equipo 2.

## Estructura

```
utm-desk/
├─ frontend/   React + Vite + Tailwind (interfaz)
├─ backend/    API Node.js + Express + MongoDB (JWT y permisos por rol)
└─ docs/       Documentación del proyecto
```

La interfaz nunca se conecta a la base de datos: todo pasa por la API, que es la única con credenciales de MongoDB Atlas y Google Cloud Storage.

## Probar la versión local

En dos terminales:

```bash
# 1. API (MongoDB en memoria con datos de prueba)
cd backend && npm install && npm run dev:memoria

# 2. Interfaz
cd frontend && npm install && npm run dev
```

Abre http://localhost:5173, entra a **Iniciar sesión** y usa los botones de "entrar como" para probar cada perfil (contraseña `UtmDesk2026!`). Detalles en [backend/README.md](backend/README.md) y [docs/permisos.md](docs/permisos.md).
