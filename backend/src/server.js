// Servidor local. En Vercel se usa api/index.js en su lugar.
import app from './app.js'
import { env } from './config/env.js'

app.listen(env.port, () => {
  console.log(`API de UTM Desk en http://localhost:${env.port}/api`)
})
