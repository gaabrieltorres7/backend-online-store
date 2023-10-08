import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  cpf: z.string().min(11),
  password: z.string().min(6),
}); // I need to change **strictNullChecks** and **strict** to true in tsconfig.json to be able to use validate

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) {}
