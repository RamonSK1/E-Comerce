import express from 'express'
import productsRouter from './routes/products.routes'
import orderRouter from './routes/order.routes'
import { deflate } from 'node:zlib'
import { loggerMiddleware } from './middlewares/logger.middleware'

const app = express()
app.use(express.json())
app.use(loggerMiddleware)
app.use('/products', productsRouter)
app.use('/orders', orderRouter)

export default app
const PORT = 3000

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})