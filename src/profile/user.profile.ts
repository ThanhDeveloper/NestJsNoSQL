import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from '../modules/users/entities/user.entity';
import { LoggedInUserDto } from '../modules/users/dto/logged-in-user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      // mapper
      //   .createMap(User, LoggedInUserDto)
      //   .forMember(
      //     (destination) => destination.id,
      //     mapFrom((source) => source.id),
      //   )
      //   .forMember(
      //     (destination) => destination.username,
      //     mapFrom((source) => source.username),
      //   );
      mapper.createMap(User, LoggedInUserDto);
      //other mapper here
    };
  }
}
