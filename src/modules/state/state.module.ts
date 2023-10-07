import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { StatePrismaRepository } from './repositories/prisma/state-prisma-repository';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  controllers: [StateController],
  providers: [StateService, StatePrismaRepository, PrismaService],
})
export class StateModule {}
