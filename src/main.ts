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
  app.enableCors();
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
  // app.enableCors({
  //   origin: [
  //         'http://localhost:3000',
  //         'http://15.185.195.73:3000/',
  //         'https://15.185.195.73:3000/',
  //       ],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  // });
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
    .addServer(`http://localhost:${process.env.PORT}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT);
  logger.log(`Application listening on ${process.env.PORT}`);
}
bootstrap();
