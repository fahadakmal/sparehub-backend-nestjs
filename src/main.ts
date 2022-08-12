import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const API_VERSION = '1';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  /** Use URI versioning
   * Routes will be in form
   * v1: http://localhost:3001/v1/users
   * v2: http://localhost:3001/v2/users
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: API_VERSION,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Sparehub API')
    .setDescription('Sparehub API Documentation')
    .setVersion(API_VERSION)
    .addSecurity('ApiKeyAuth', {
      type: 'http',
      in: 'header',
      scheme: 'Bearer',
      name: 'Authorization',
      bearerFormat: 'Bearer',
    })
    .addSecurityRequirements('ApiKeyAuth')
    .addServer(`http://localhost:4000`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(4000);
  logger.log('Application listening on 4000');
}
bootstrap();
