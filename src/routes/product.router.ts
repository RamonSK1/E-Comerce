import { Router } from 'express'
import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from '../controllers/product.controller'
import { validateData } from '../middlewares/validateData.middleware'
import { authMiddleware, authorize } from '../middlewares/auth.middleware'
import {
  createProductSchema,
  productParamsSchema,
  updateProductSchema,
  productQueryPaginationSchema
} from '../schemas/product.schema'

const router = Router()

// rotas públicas
router.get('/', validateData(productQueryPaginationSchema, 'query'), getProductsController)
router.get('/:id', validateData(productParamsSchema, 'params'), getProductByIdController)

// rotas protegidas
router.post('/', authMiddleware, authorize('admin'), validateData(createProductSchema, 'body'), createProductController)
router.put('/:id', authMiddleware, authorize('admin'), validateData(productParamsSchema, 'params'), validateData(updateProductSchema, 'body'), updateProductController)
router.delete('/:id', authMiddleware, authorize('admin'), validateData(productParamsSchema, 'params'), deleteProductController)

export default router