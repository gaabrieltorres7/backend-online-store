import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreatedCategoryDTO } from '../../dto/category.dto';
import { ICategoryRepository } from '../category-interface';

@Injectable()
export class CategoryPrismaRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CreatedCategoryDTO[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
}
