import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDTO, CreatedCategoryDTO } from './dto/category.dto';
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

  async create(data: CreateCategoryDTO): Promise<CreatedCategoryDTO> {
    const category = await this.categoryRepository.findByName(data.name);

    if (category) {
      throw new HttpException(
        'Category name already exists',
        HttpStatus.CONFLICT,
      );
    }

    const createdCategory = await this.categoryRepository.create(data);

    return createdCategory;
  }

  async findByName(name: string): Promise<CreatedCategoryDTO> {
    const category = await this.categoryRepository.findByName(name);

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async findById(id: number): Promise<CreatedCategoryDTO> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
