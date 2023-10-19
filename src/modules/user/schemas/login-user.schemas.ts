import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class LoginUserSchemaDTO extends createZodDto(LoginUserSchema) {}
