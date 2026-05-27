export class ProductResponseDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string
  ) {}

  static create(
    id: string,
    name: string,
    price: number,
    stock: number,
    categoryId: string
  ): ProductResponseDto {
    return new ProductResponseDto(id, name, price, stock, categoryId)
  }
}

export class ProductListDto {
  private constructor(
    public readonly data: ProductResponseDto[],
    public readonly page: number,
    public readonly size: number
  ) {}

  static create(data: ProductResponseDto[], page: number, size: number): ProductListDto {
    return new ProductListDto(data, page, size)
  }
}