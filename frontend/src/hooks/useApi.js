import { useCallback, useEffect, useState } from 'react'

// Carga datos de la API y expone { datos, error, cargando, recargar }.
export function useApi(cargar, dependencias = []) {
  const [estado, setEstado] = useState({ datos: null, error: '', cargando: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ejecutar = useCallback(cargar, dependencias)

  const recargar = useCallback(async () => {
    setEstado((e) => ({ ...e, cargando: true, error: '' }))
    try {
      setEstado({ datos: await ejecutar(), error: '', cargando: false })
    } catch (error) {
      setEstado({ datos: null, error: error.message, cargando: false })
    }
  }, [ejecutar])

  useEffect(() => {
    recargar()
  }, [recargar])

  return { ...estado, recargar }
}
