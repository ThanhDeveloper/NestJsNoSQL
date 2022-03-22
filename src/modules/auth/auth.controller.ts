import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../../core/utils/transform-interceptor.util';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(TransformInterceptor)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(TransformInterceptor)
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
}
