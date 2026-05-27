import {z} from 'zod'

export const createProductSchema = z.object({
    name: z.string().min(3),
    price: z.coerce.number().positive(),
    categoryId: z.uuid(),
})

export const productParamsSchema = z.object({
  id: z.uuid(),
})