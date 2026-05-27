import { Router } from 'express'

import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.controller'

import {
  categoryQueryPaginationSchema,
  categoryParamsSchema,
  createCategorySchema,
} from '../schemas/category.schema'

import { validateData } from '../middlewares/validateData.middleware'

const router = Router()

// GET /category?page=1&size=10
router.get(
  '/',
  validateData(categoryQueryPaginationSchema, 'query'),
  getCategoriesController
)

// GET /category/:id
router.get(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  getCategoryByIdController
)

// POST /category
router.post(
  '/',
  validateData(createCategorySchema, 'body'),
  createCategoryController
)

// PUT /category/:id
router.put(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  updateCategoryController
)

// DELETE /category/:id
router.delete(
  '/:id',
  validateData(categoryParamsSchema, 'params'),
  deleteCategoryController
)

export default router