import { Request, Response } from 'express'
import { CategoryService } from '../services/category.service'
import { CategoryRepository } from '../repositories/category.repository'
import { CategoryResponseDto, CategoryListDto } from '../dtos/category.dto'

const service = new CategoryService(new CategoryRepository())

export async function getCategoriesController(req: Request, res: Response) {
  const page = req.query.page as string
  const size = req.query.size as string
  const categories = await service.getAll(Number(page), Number(size))
  const data = categories.map(c => CategoryResponseDto.create(c.id!, c.name))
  return res.status(200).json(CategoryListDto.create(data, Number(page), Number(size)))
}

export async function getCategoryByIdController(req: Request, res: Response) {
  try {
    const category = await service.getById(req.params.id as string)
    return res.status(200).json(CategoryResponseDto.create(category.id!, category.name))
  } catch (error: any) {
    return res.status(404).json({ message: error.message })
  }
}

export async function createCategoryController(req: Request, res: Response) {
  try {
    const category = await service.create(req.body.name)
    return res.status(201).json(CategoryResponseDto.create(category.id!, category.name))
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

export async function updateCategoryController(req: Request, res: Response) {
  try {
    const category = await service.update(req.params.id as string, req.body.name)
    return res.status(200).json(CategoryResponseDto.create(category.id!, category.name))
  } catch (error: any) {
    return res.status(404).json({ message: error.message })
  }
}

export async function deleteCategoryController(req: Request, res: Response) {
  try {
    await service.delete(req.params.id as string)
    return res.status(204).send()
  } catch (error: any) {
    return res.status(404).json({ message: error.message })
  }
}