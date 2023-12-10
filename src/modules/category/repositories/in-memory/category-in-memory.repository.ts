import { CreatedCategoryDTO } from '../../dto/category.dto';
import { ICategoryRepository } from '../category-interface';

const category = {
  id: 1,
  name: 'Category 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  Products: [],
};

export class CategoryInMemoryRepository implements ICategoryRepository {
  private categories: CreatedCategoryDTO[] = [category];

  async findAll(): Promise<CreatedCategoryDTO[]> {
    const categories = this.categories;
    return categories;
  }
}
