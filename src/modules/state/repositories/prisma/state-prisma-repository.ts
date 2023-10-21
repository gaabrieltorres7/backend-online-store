import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infra/db/prisma.service';
import { StateDTO } from '../../dto/state.dto';
import { IStateRepository } from '../state-interface';

@Injectable()
export class StatePrismaRepository implements IStateRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<StateDTO[]> {
    const states = await this.prisma.state.findMany({
      include: {
        City: true,
      },
    });
    return states;
  }
}
