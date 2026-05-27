import { Router } from 'express'
import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller'
import { validateData } from '../middlewares/validateData.middleware'
import { authMiddleware, authorize } from '../middlewares/auth.middleware'
import {
  categoryQueryPaginationSchema,
  categoryParamsSchema,
  createCategorySchema,
} from '../schemas/category.schema'

const router = Router()

// rotas públicas
router.get('/', validateData(categoryQueryPaginationSchema, 'query'), getCategoriesController)
router.get('/:id', validateData(categoryParamsSchema, 'params'), getCategoryByIdController)

// rotas protegidas
router.post('/', authMiddleware, authorize('admin'), validateData(createCategorySchema, 'body'), createCategoryController)
router.put('/:id', authMiddleware, authorize('admin'), validateData(categoryParamsSchema, 'params'), validateData(createCategorySchema, 'body'), updateCategoryController)
router.delete('/:id', authMiddleware, authorize('admin'), validateData(categoryParamsSchema, 'params'), deleteCategoryController)

export default router