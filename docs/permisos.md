# Matriz de permisos

Definida en `backend/src/permissions/roles.js`. La API decide; la interfaz solo oculta lo que el rol no puede usar.

| Permiso | Reportante | Técnico | Coordinador | Directivo | Soporte TI |
| --- | :-: | :-: | :-: | :-: | :-: |
| incidencias:crear | ✓ | | | | |
| incidencias:ver_propias | ✓ | | | | |
| incidencias:ver_asignadas | | ✓ | | | |
| incidencias:ver_todas | | | ✓ | ✓ | |
| incidencias:atender | | ✓ | | | |
| incidencias:asignar | | | ✓ | | |
| incidencias:cerrar | | | ✓ | | |
| usuarios:ver | | | ✓ | | ✓ |
| usuarios:administrar | | | | | ✓ |
| analitica:ver | | | ✓ | ✓ | |
| sistema:ver | | | | | ✓ |

Decisión (23 oct 2026): Soporte TI es el único que crea cuentas, cambia roles y activa o desactiva accesos. El Coordinador consulta la lista para asignar técnicos.
