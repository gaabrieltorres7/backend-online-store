import { Injectable } from '@nestjs/common';
import { StateDTO } from './dto/state.dto';
import { StatePrismaRepository } from './repositories/prisma/state-prisma-repository';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: StatePrismaRepository) {}

  async findAll(): Promise<StateDTO[]> {
    return await this.stateRepository.findAll();
  }
}
