import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/db/prisma.service';
import { StatePrismaRepository } from './repositories/prisma/state-prisma-repository';
import { IStateRepository } from './repositories/state-interface';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  controllers: [StateController],
  providers: [
    StateService,
    PrismaService,
    { provide: IStateRepository, useClass: StatePrismaRepository },
  ],
})
export class StateModule {}
