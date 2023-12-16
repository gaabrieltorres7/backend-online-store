import { CreateCategoryDTO, CreatedCategoryDTO } from '../../dto/category.dto';
import { ICategoryRepository } from '../category-interface';

export class CategoryInMemoryRepository implements ICategoryRepository {
  private categories: CreatedCategoryDTO[] = [];

  async findAll(): Promise<CreatedCategoryDTO[]> {
    const categories = this.categories;
    return categories;
  }

  async create(data: CreateCategoryDTO): Promise<CreatedCategoryDTO> {
    const category = {
      name: data.name,
      id: this.categories.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.categories.push(category);
    return category;
  }

  async findByName(name: string): Promise<CreatedCategoryDTO | null> {
    const category = this.categories.find((category) => category.name === name);
    return category || null;
  }

  async findById(id: number): Promise<CreatedCategoryDTO | null> {
    const category = this.categories.find((category) => category.id === id);
    return category || null;
  }
}
