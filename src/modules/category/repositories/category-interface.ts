import { CreateCategoryDTO, CreatedCategoryDTO } from '../dto/category.dto';

export abstract class ICategoryRepository {
  abstract findAll(): Promise<CreatedCategoryDTO[]>;
  abstract create(data: CreateCategoryDTO): Promise<CreatedCategoryDTO>;
  abstract findByName(name: string): Promise<CreatedCategoryDTO | null>;
}
