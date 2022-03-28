import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        AutomapperModule.forRoot({
          options: [{ name: 'classMapper', pluginInitializer: classes }],
          singular: true,
        }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
