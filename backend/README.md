# Backend · API de UTM Desk

Node.js + Express 5 + driver oficial de MongoDB (sin ODM). JWT de 8 h, contraseñas con bcrypt y permisos por rol (403 si el rol no tiene permiso). Se despliega en Vercel Functions con `api/index.js`.

## Arrancar

```bash
cd backend
npm install
```

**Opción A · Prueba local sin Atlas** (MongoDB en memoria, datos de prueba ya cargados; se borran al detenerlo):

```bash
npm run dev:memoria
```

La primera vez descarga el binario de MongoDB (unos 100 MB).

**Opción B · MongoDB Atlas**:

```bash
cp .env.example .env     # pon tu MONGODB_URI y un JWT_SECRET largo
npm run db:seed          # crea colecciones, $jsonSchema, índices y usuarios de prueba
npm run dev
```

La API queda en `http://localhost:3000/api`.

## Usuarios de prueba

Contraseña de todos: `UtmDesk2026!`

| Correo | Rol |
| --- | --- |
| reportante@utm.mx | reportante |
| tecnico@utm.mx | tecnico |
| tecnico2@utm.mx | tecnico |
| coordinador@utm.mx | coordinador |
| directivo@utm.mx | directivo |
| soporte@utm.mx | soporte_ti |

## Estructura

```
backend/
├─ api/index.js              Entrada para Vercel
├─ src/
│  ├─ app.js                 Express: middlewares y rutas
│  ├─ server.js              Servidor local
│  ├─ config/                Variables de entorno y conexión a MongoDB
│  ├─ permissions/roles.js   Matriz rol → permisos (única fuente de verdad)
│  ├─ middlewares/           autenticar (JWT), autorizar (403), errores
│  ├─ utils/                 HttpError y validaciones
│  └─ modules/               auth, usuarios, incidencias, analitica, sistema
│                            (cada uno: routes → controller → service)
└─ scripts/                  setup-db, seed, dev-memoria y esquemas ($jsonSchema + índices)
```

## Endpoints

| Método | Ruta | Permiso |
| --- | --- | --- |
| POST | /api/auth/login | público |
| GET | /api/auth/me | sesión |
| GET | /api/incidencias?estado&categoria&q | ver_propias / ver_asignadas / ver_todas |
| GET | /api/incidencias/:id | igual que arriba |
| POST | /api/incidencias | incidencias:crear |
| PATCH | /api/incidencias/:id/asignar | incidencias:asignar |
| PATCH | /api/incidencias/:id/atencion | incidencias:atender (solo el técnico asignado) |
| PATCH | /api/incidencias/:id/cerrar | incidencias:cerrar |
| GET | /api/usuarios?rol&activo | usuarios:ver |
| POST | /api/usuarios | usuarios:administrar |
| PATCH | /api/usuarios/:id | usuarios:administrar |
| GET | /api/analitica | analitica:ver |
| GET | /api/sistema/estado | sistema:ver |

Flujo de una incidencia: `abierta → asignada → en_proceso → resuelta → cerrada`. El índice TTL borra la incidencia 60 días después de resuelta.
