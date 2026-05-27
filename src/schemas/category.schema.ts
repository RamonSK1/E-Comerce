import {size, z} from 'zod'

export const categoryQueryPaginationSchema = z.object({
    page: z.coerce.number().positive(),
    size: z.coerce.number().positive(),
})

export const categoryParamsSchema = z.object({
    id: z.uuid(),
})

export const createCategorySchema = z.object({
    name: z.string().min(3),
})