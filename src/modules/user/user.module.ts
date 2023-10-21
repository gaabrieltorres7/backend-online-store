import { Module } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { PrismaService } from './../../infra/db/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repository';
import { IUserRepository } from './repositories/user-interface';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
})
export class UserModule {}
