import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatedCategoryDTO } from './dto/category.dto';
import { ICategoryRepository } from './repositories/category-interface';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async findAll(): Promise<CreatedCategoryDTO[]> {
    const categories = await this.categoryRepository.findAll();

    if (!categories || categories.length === 0) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }

    return categories;
  }
}
