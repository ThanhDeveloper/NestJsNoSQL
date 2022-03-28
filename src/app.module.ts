import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://mongo:mongo68@clusternestjs.owql6.mongodb.net/test?retryWrites=true&w=majority',
    ),
    AutomapperModule.forRoot({
      options: [{ name: 'classMapper', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
