import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(@Param('stateId', ParseIntPipe) stateId: number) {
    return await this.cityService.getAllCitiesByStateId(stateId);
  }
}
