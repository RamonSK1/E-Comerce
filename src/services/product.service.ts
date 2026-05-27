import { ProductRepository } from '../repositories/product.repository'
import { CategoryRepository } from '../repositories/category.repository'
import { Product } from '../entities/product.entity'

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async getAll(page: number, size: number): Promise<Product[]> {
    return this.productRepository.getAllProducts(page, size)
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.getProductById(id)
    if (!product) throw new Error('Produto não encontrado')
    return product
  }

  async create(
    name: string,
    price: number,
    stock: number,
    categoryId: string
  ): Promise<Product> {
    const category = await this.categoryRepository.getCategoryById(categoryId)
    if (!category) throw new Error('Categoria não encontrada')

    const product = Product.create(name, price, stock, categoryId)
    return this.productRepository.createProduct(product)
  }

  async update(
    id: string,
    name: string,
    price: number,
    stock: number,
    categoryId?: string
  ): Promise<Product> {
    const product = await this.productRepository.getProductById(id)
    if (!product) throw new Error('Produto não encontrado')

    if (categoryId && categoryId !== product.categoryId) {
      const category = await this.categoryRepository.getCategoryById(categoryId)
      if (!category) throw new Error('Categoria não encontrada')
    }

    product.name = name
    product.price = price
    product.stock = stock
    if (categoryId) product.categoryId = categoryId

    return this.productRepository.updateProduct(product)
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.getProductById(id)
    if (!product) throw new Error('Produto não encontrado')
    await this.productRepository.deleteProduct(id)
  }
}