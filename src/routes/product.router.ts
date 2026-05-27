import { Router } from 'express'

import {
  createProductController,
  getProductsController,
  deleteProductController,
} from '../controllers/product.controller'

import { validateData } from '../middlewares/validateData.middleware'
import { createProductSchema, productParamsSchema } from '../schemas/product.schema'

const router = Router()

router.post(
  '/',
  validateData(createProductSchema, 'body'),
  createProductController
)
//router.post('/', createProductController)

router.get('/', getProductsController)

router.delete(
  '/:id',
  validateData(productParamsSchema, 'params'),
  deleteProductController
)

export default router