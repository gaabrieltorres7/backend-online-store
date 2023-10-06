import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from './../../infra/db/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserPrismaRepository],
})
export class UserModule {}
