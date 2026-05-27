import { CategoryRepository } from '../repositories/category.repository'
import { Category } from '../entities/category.entity'

export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async getAll(page: number, size: number): Promise<Category[]> {
    return this.repository.getAllCategories(page, size)
  }

  async getById(id: string): Promise<Category> {
    const category = await this.repository.getCategoryById(id)
    if (!category) throw new Error('Categoria não encontrada')
    return category
  }

  async create(name: string): Promise<Category> {
    const category = Category.create(name)
    return this.repository.createCategory(category)
  }

  async update(id: string, name: string): Promise<Category> {
    const category = await this.repository.getCategoryById(id)
    if (!category) throw new Error('Categoria não encontrada')
    category.rename(name)
    return this.repository.updateCategory(category)
  }

  async delete(id: string): Promise<void> {
    const category = await this.repository.getCategoryById(id)
    if (!category) throw new Error('Categoria não encontrada')
    await this.repository.deleteCategory(id)
  }
}