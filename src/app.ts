import express from 'express'

import productsRouter from './routes/product.router'
import orderRouter from './routes/order.routes'
import categoryRouter from './routes/category.router'
import { loggerMiddleware } from './middlewares/logger.middleware'
import authRouter from './routes/auth.router'

const app = express()

app.use(express.json())

app.use(loggerMiddleware)

app.use('/products', productsRouter)

app.use('/orders', orderRouter)

app.use('/category', categoryRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

export default app