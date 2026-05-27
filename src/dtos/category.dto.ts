export class CategoryResponseDto {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  static create(id: string, name: string): CategoryResponseDto {
    return new CategoryResponseDto(id, name)
  }
}

export class CategoryListDto {
  private constructor(
    public readonly data: CategoryResponseDto[],
    public readonly page: number,
    public readonly size: number
  ) {}

  static create(data: CategoryResponseDto[], page: number, size: number): CategoryListDto {
    return new CategoryListDto(data, page, size)
  }
}