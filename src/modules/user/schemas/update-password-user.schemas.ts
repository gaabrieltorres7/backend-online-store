import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UpdatePasswordUserSchema = z.object({
  newPassword: z.string().min(6),
  oldPassword: z.string().min(6),
});

export class UpdatePasswordUserSchemaDTO extends createZodDto(
  UpdatePasswordUserSchema,
) {}
