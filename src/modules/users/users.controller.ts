import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformInterceptor } from '../../core/utils/transform-interceptor.util';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @UseInterceptors(TransformInterceptor)
  async get(@Request() req) {
    return await this.usersService.getUserLoggedIn(req.user.id);
  }
}
