import { Test, TestingModule } from '@nestjs/testing';
import { StateInMemoryRepository } from './repositories/in-memory/state-in-memory.repository';
import { IStateRepository } from './repositories/state-interface';
import { StateService } from './state.service';

describe('StateService', () => {
  let sut: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: IStateRepository,
          useClass: StateInMemoryRepository,
        },
      ],
    }).compile();

    sut = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should be able to return all states', async () => {
    const result = await sut.findAll();

    expect(result).toHaveLength(2);
  });
});
