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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedInUserDto } from './dto/logged-in-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(TransformInterceptor)
  async get(@Request() req): Promise<LoggedInUserDto> {
    return await this.usersService.getUserLoggedIn(req.user.id);
  }
}
