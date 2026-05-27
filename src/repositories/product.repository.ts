import { db } from '../database/connection'
import { Product } from '../entities/product.entity'

export class ProductRepository {
  async createProduct(product: Product): Promise<Product> {
    const result = await db.query(
      `INSERT INTO products (name, price, stock, category_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, price, stock, category_id`,
      [product.name, product.price, product.stock, product.categoryId]
    )
    const row = result.rows[0]
    return new (Product as any)(row.id, row.name, row.price, row.stock, row.category_id)
  }

  async getAllProducts(page: number, size: number): Promise<Product[]> {
    const offset = (page - 1) * size
    const result = await db.query(
      `SELECT id, name, price, stock, category_id FROM products LIMIT $1 OFFSET $2`,
      [size, offset]
    )
    return result.rows.map(
      (row) => new (Product as any)(row.id, row.name, row.price, row.stock, row.category_id)
    )
  }

  async getProductById(id: string): Promise<Product | null> {
    const result = await db.query(
      `SELECT id, name, price, stock, category_id FROM products WHERE id = $1`,
      [id]
    )
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new (Product as any)(row.id, row.name, row.price, row.stock, row.category_id)
  }

  async updateProduct(product: Product): Promise<Product> {
    const result = await db.query(
      `UPDATE products SET name = $1, price = $2, stock = $3, category_id = $4
       WHERE id = $5
       RETURNING id, name, price, stock, category_id`,
      [product.name, product.price, product.stock, product.categoryId, product.id]
    )
    const row = result.rows[0]
    return new (Product as any)(row.id, row.name, row.price, row.stock, row.category_id)
  }

  async deleteProduct(id: string): Promise<void> {
    await db.query(`DELETE FROM products WHERE id = $1`, [id])
  }
}