import { StateDTO } from '../../dto/state.dto';
import { IStateRepository } from '../state-interface';

const STATE_SP = {
  id: 1,
  name: 'São Paulo',
  uf: 'SP',
  createdAt: new Date(),
  updatedAt: new Date(),
  City: [],
};

const STATE_PE = {
  id: 2,
  name: 'Pernambuco',
  uf: 'PE',
  createdAt: new Date(),
  updatedAt: new Date(),
  City: [],
};

export class StateInMemoryRepository implements IStateRepository {
  private states: StateDTO[] = [STATE_SP, STATE_PE];

  async findAll(): Promise<StateDTO[]> {
    const states = this.states;
    return states;
  }
}
