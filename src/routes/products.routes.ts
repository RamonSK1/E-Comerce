import { Router, Request, Response } from 'express'

const router = Router()

const products = [
  {
    id: 1,
    name: 'Notebook',
    category: 'eletronicos',
  },

  {
    id: 2,
    name: 'Mouse',
    category: 'eletronicos',
  },

  {
    id: 3,
    name: 'Camiseta',
    category: 'roupas',
  },
]

router.get('/', (req: Request, res: Response) => {
    const category = req.query.category as string

    if (category) {
      const filtered = products.filter(
        (product) =>
          product.category === category
      )

      return res.status(200).json(filtered)
    }

    return res.status(200).json(products)
  }
)

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (id < 0) {
      return res.status(400).json({
        message: 'ID inválido',
      })
    }

    const product = products.find(
      (product) => product.id === id
    )

    return res.status(200).json(product)
  }
)

export default router