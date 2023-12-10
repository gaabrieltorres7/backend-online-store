import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ICategoryRepository } from './repositories/category-interface';
import { CategoryPrismaRepository } from './repositories/prisma/category-prisma-repository';

@Module({
  providers: [
    PrismaService,
    CategoryService,
    { provide: ICategoryRepository, useClass: CategoryPrismaRepository },
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
