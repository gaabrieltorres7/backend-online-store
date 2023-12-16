import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CityService } from './city.service';

@Roles(UserType.Admin)
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(@Param('stateId', ParseIntPipe) stateId: number) {
    return await this.cityService.getAllCitiesByStateId(stateId);
  }
}
