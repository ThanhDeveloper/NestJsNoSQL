import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          options: [{ name: 'classMapper', pluginInitializer: classes }],
          singular: true,
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
