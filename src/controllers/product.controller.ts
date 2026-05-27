import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import { ProductRepository } from '../repositories/product.repository'
import { CategoryRepository } from '../repositories/category.repository'
import { ProductResponseDto, ProductListDto } from '../dtos/product.dto'

const service = new ProductService(new ProductRepository(), new CategoryRepository())

export async function getProductsController(req: Request, res: Response) {
  const page = req.query.page as string
  const size = req.query.size as string
  const products = await service.getAll(Number(page), Number(size))
  const data = products.map(p => ProductResponseDto.create(p.id!, p.name, Number(p.price), p.stock, p.categoryId))
  return res.status(200).json(ProductListDto.create(data, Number(page), Number(size)))
}

export async function getProductByIdController(req: Request, res: Response) {
  try {
    const product = await service.getById(req.params.id as string)
    return res.status(200).json(ProductResponseDto.create(product.id!, product.name, Number(product.price), product.stock, product.categoryId))
  } catch (error: any) {
    return res.status(404).json({ message: error.message })
  }
}

export async function createProductController(req: Request, res: Response) {
  try {
    const { name, price, stock, categoryId } = req.body
    const product = await service.create(name, price, stock, categoryId)
    return res.status(201).json(ProductResponseDto.create(product.id!, product.name, Number(product.price), product.stock, product.categoryId))
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

export async function updateProductController(req: Request, res: Response) {
  try {
    const { name, price, stock, categoryId } = req.body
    const product = await service.update(req.params.id as string, name, price, stock, categoryId)
    return res.status(200).json(ProductResponseDto.create(product.id!, product.name, Number(product.price), product.stock, product.categoryId))
  } catch (error: any) {
    return res.status(404).json({ message: error.message })
  }
}

export async function deleteProductController(req: Request, res: Response) {
  try {
    await service.delete(req.params.id as string)
    return res.status(204).send()
  } catch (error: any) {
    return res.status(404).json({ message: error.message })
  }
}