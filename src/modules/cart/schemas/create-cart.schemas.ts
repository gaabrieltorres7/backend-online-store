import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateCartSchema = z.object({
  productId: z.number().positive(),
  amount: z.number().positive(),
}); // I need to change **strictNullChecks** and **strict** to true in tsconfig.json to be able to use validate

export class CreateCartSchemaDTO extends createZodDto(CreateCartSchema) {}
