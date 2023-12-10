import { CreatedCategoryDTO } from '../dto/category.dto';

export abstract class ICategoryRepository {
  abstract findAll(): Promise<CreatedCategoryDTO[]>;
}
