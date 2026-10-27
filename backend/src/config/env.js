// Lee y valida las variables de entorno en un solo lugar.
function requerida(nombre) {
  const valor = process.env[nombre]
  if (!valor) throw new Error(`Falta la variable de entorno ${nombre} (revisa backend/.env)`)
  return valor
}

export const env = {
  get mongoUri() {
    return requerida('MONGODB_URI')
  },
  mongoDb: process.env.MONGODB_DB ?? 'utm_desk',
  get jwtSecret() {
    return requerida('JWT_SECRET')
  },
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
  port: Number(process.env.PORT ?? 3000),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
}
