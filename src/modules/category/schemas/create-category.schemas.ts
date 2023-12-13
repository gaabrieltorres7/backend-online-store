import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateCategorySchema = z.object({
  name: z.string().min(3),
}); // I need to change **strictNullChecks** and **strict** to true in tsconfig.json to be able to use validate

export class CreateCategorySchemaDTO extends createZodDto(
  CreateCategorySchema,
) {}
