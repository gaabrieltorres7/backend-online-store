import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { CityDTO } from '../../dto/city.dto';
import { ICityRepository } from '../city-interface';

@Injectable()
export class CityPrismaRepository implements ICityRepository {
  constructor(private prisma: PrismaService) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityDTO[]> {
    const cities = await this.prisma.city.findMany({
      where: {
        stateId,
      },
      include: {
        Addresses: true,
      },
    });
    return cities;
  }

  async findCityById(id: number): Promise<CityDTO | null> {
    return await this.prisma.city.findUnique({ where: { id } });
  }
}
