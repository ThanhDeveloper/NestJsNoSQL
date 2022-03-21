import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '../../core/utils/error-handler.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}