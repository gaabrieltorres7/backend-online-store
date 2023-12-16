import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { CreateCategoryDTO, CreatedCategoryDTO } from '../../dto/category.dto';
import { ICategoryRepository } from '../category-interface';

@Injectable()
export class CategoryPrismaRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CreatedCategoryDTO[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async create(data: CreateCategoryDTO): Promise<CreatedCategoryDTO> {
    const category = await this.prisma.category.create({ data });
    return category;
  }

  async findByName(name: string): Promise<CreatedCategoryDTO | null> {
    const category = await this.prisma.category.findFirst({
      where: { name },
    });
    return category || null;
  }

  async findById(id: number): Promise<CreatedCategoryDTO | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category || null;
  }
}
