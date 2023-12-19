import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UpdateProductSchema = z.object({
  categoryId: z.number().int().positive().optional(),
  name: z.string().min(3).max(100).optional(),
  price: z.number().positive().optional(),
  image: z.string().url().optional(),
});

export class UpdateProductSchemaDTO extends createZodDto(UpdateProductSchema) {}
