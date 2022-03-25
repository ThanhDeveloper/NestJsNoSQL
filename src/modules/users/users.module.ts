import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserProfile } from '../../profiles/user.profile';

@Module({
  controllers: [UsersController],
  providers: [UserProfile, UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
