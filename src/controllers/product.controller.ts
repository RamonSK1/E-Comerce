import { Request, Response } from 'express'

export function createProductController(
  req: Request,
  res: Response
) {
  return res.status(201).json({
    message: 'Produto criado',
    data: req.body,
  })
}

export function getProductsController(
  req: Request,
  res: Response
) {
  const category =
    req.query.category as string

  const products = [
    {
      id: '1',
      name: 'Notebook',
      price: 3000,
      categoryId: 'abc',
    },
    {
      id: '2',
      name: 'Mouse',
      price: 100,
      categoryId: 'def',
    },
  ]

  if (category) {
    const filtered = products.filter(
      (product) =>
        product.categoryId === category
    )

    return res.status(200).json(filtered)
  }

  return res.status(200).json(products)
}

export function deleteProductController(
  req: Request,
  res: Response
) {
  return res.status(204).send()
}