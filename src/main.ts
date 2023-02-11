import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const conf = new DocumentBuilder()
    .setTitle('board-app')
    .setDescription('made with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('api', app, document);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
