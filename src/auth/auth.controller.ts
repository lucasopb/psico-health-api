import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const result = await this.authService.loginUser(email, password);
    return result;
  }

  @Post('login-psychologist')
  async loginPsychologist(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const result = await this.authService.loginPsychologist(email, password);
    return result;
  }
}