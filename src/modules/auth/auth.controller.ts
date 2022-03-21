import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../../core/utils/transform-interceptor.util';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(TransformInterceptor)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  @UseInterceptors(TransformInterceptor)
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
}
