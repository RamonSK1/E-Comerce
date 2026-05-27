import { db } from '../database/connection'
import { Category } from '../entities/category.entity'

export class CategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const result = await db.query(
      `INSERT INTO categories (name) VALUES ($1) RETURNING id, name`,
      [category.name]
    )
    const row = result.rows[0]
    return new (Category as any)(row.id, row.name)
  }

  async getAllCategories(page: number, size: number): Promise<Category[]> {
    const offset = (page - 1) * size
    const result = await db.query(
      `SELECT id, name FROM categories LIMIT $1 OFFSET $2`,
      [size, offset]
    )
    return result.rows.map((row) => new (Category as any)(row.id, row.name))
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const result = await db.query(
      `SELECT id, name FROM categories WHERE id = $1`,
      [id]
    )
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new (Category as any)(row.id, row.name)
  }

  async updateCategory(category: Category): Promise<Category> {
    const result = await db.query(
      `UPDATE categories SET name = $1 WHERE id = $2 RETURNING id, name`,
      [category.name, category.id]
    )
    const row = result.rows[0]
    return new (Category as any)(row.id, row.name)
  }

  async deleteCategory(id: string): Promise<void> {
    await db.query(`DELETE FROM categories WHERE id = $1`, [id])
  }
}