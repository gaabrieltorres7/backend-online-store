import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserSchemaDTO } from '../user/schemas/login-user.schemas';
import { AuthService } from './auth.service';
import { ReturnLoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: LoginUserSchemaDTO): Promise<ReturnLoginDTO> {
    return await this.authService.login(data);
  }
}
