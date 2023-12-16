import { Controller, Get } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { StateService } from './state.service';

@Roles(UserType.Admin)
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async findAll() {
    return await this.stateService.findAll();
  }
}
