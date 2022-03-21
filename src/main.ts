import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateAuthMiddleware } from './core/middlewares/validate-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateAuthMiddleware());
  await app.listen(5001);
}
bootstrap();
