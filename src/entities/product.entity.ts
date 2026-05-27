export class Product {
  private constructor(
    public readonly id: string | null,
    public name: string,
    public price: number,
    public stock: number,
    public categoryId: string
  ) {}

  static create(
    name: string,
    price: number,
    stock: number,
    categoryId: string
  ): Product {
    if (!name || name.trim().length < 3) {
      throw new Error('Nome deve ter no mínimo 3 caracteres')
    }
    if (price <= 0) {
      throw new Error('Preço deve ser maior que zero')
    }
    if (stock < 0) {
      throw new Error('Estoque não pode ser negativo')
    }
    return new Product(null, name.trim(), price, stock, categoryId)
  }
}