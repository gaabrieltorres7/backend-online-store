import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateProductSchema = z.object({
  categoryId: z.number().int().positive(),
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  image: z.string().url(),
}); // I need to change **strictNullChecks** and **strict** to true in tsconfig.json to be able to use validate

export class CreateProductSchemaDTO extends createZodDto(CreateProductSchema) {}
