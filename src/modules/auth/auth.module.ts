import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../../infra/db/prisma.service';
import { UserPrismaRepository } from '../user/repositories/prisma/user-prisma-repository';
import { IUserRepository } from '../user/repositories/user-interface';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
