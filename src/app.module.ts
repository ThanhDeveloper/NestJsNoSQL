import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CrawlersModule } from './modules/crawlers/crawlers.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CrawlersModule,
    AutomapperModule.forRoot({
      options: [{ name: 'classMapper', pluginInitializer: classes }],
      singular: true,
    }),
  ],
})
export class AppModule {}
