import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformInterceptor } from '../../core/interceptors/transform-interceptor.util';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedInUserDto } from './dto/logged-in-user.dto';
import { TimeoutInterceptor } from '../../core/interceptors/timeout.interceptor';
import { SkipThrottle } from '@nestjs/throttler';
import {User} from "./entities/user.entity";
import { API_VERSION } from "../../core/constants";

@ApiBearerAuth()
//@SkipThrottle()
@ApiTags('users')
@Controller(API_VERSION + 'users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor, TimeoutInterceptor)
  async getAllUser() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(TransformInterceptor, TimeoutInterceptor)
  async get(@Request() req): Promise<LoggedInUserDto> {
    return await this.usersService.getUserLoggedIn(req.user.id);
  }
}
