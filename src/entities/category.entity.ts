export class Category {
  private constructor(
    public readonly id: string | null,
    public name: string
  ) {}

  static create(name: string): Category {
    if (!name || name.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres')
    }
    return new Category(null, name.trim())
  }

  rename(newName: string): void {
    if (!newName || newName.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres')
    }
    this.name = newName.trim()
  }
}