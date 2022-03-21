import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private usersRepository: typeof User) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    return await this.usersRepository.create<User>(registerUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>({
      attributes: ['id', 'username'],
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne<User>({
      where: { username: username },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { id } });
  }
}
