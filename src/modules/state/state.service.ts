import { Injectable } from '@nestjs/common';
import { StateDTO } from './dto/state.dto';
import { IStateRepository } from './repositories/state-interface';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: IStateRepository) {}

  async findAll(): Promise<StateDTO[]> {
    return await this.stateRepository.findAll();
  }
}
