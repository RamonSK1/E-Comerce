import { Request, Response } from 'express'

export function getCategoriesController(
  req: Request,
  res: Response
) {
  const { page, size } = req.query

  return res.status(200).json({
    page,
    size,
    data: [],
  })
}

export function createCategoryController(
  req: Request,
  res: Response
) {
  return res.status(201).json(req.body)
}

export function getCategoryByIdController(
  req: Request,
  res: Response
) {
  return res.status(200).json({
    id: req.params.id,
  })
}

export function updateCategoryController(
  req: Request,
  res: Response
) {
  return res.status(200).json({
    id: req.params.id,
    data: req.body,
  })
}

export function deleteCategoryController(
  req: Request,
  res: Response
) {
  return res.status(204).send()
}