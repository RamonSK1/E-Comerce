import { z } from 'zod'

export const productQueryPaginationSchema = z.object({
  page: z.coerce.number().positive(),
  size: z.coerce.number().positive(),
})

export const productParamsSchema = z.object({
  id: z.string().uuid(),
})

export const createProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.string().uuid(),
})

export const updateProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  categoryId: z.string().uuid().optional(),
})