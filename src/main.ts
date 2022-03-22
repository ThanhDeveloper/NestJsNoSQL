import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateAuthMiddleware } from './core/middlewares/validate-auth.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API NestJS')
    .setDescription('Nestjs API developer documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalPipes(new ValidateAuthMiddleware());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(5001);
}
bootstrap();
