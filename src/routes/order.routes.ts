import { Router, Request, Response } from 'express'

const router = Router()

router.post('/', (req: Request, res: Response) => {
    const body = req.body

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        message: 'Body vazio',
      })
    }

    return res.status(201).json(body)
  }
)

router.patch(
  '/:id',
  (req: Request, res: Response) => {
    const id = req.params.id
    const { status } = req.body

    return res.status(200).json({
      message: `Pedido ${id} atualizado`,
      status,
    })
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response) => {
    return res.status(204).send()
  }
)

export default router