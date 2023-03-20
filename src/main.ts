import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './api/app.module';
import { AppEnvInterface } from './configuration/interfaces/app-env.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');

  const configService: ConfigService = app.get(ConfigService);
  const appConfig = configService.get<AppEnvInterface>('app');

  const config = new DocumentBuilder()
    .setTitle('ModsenTestApp')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(appConfig.port, () => {
    console.log(`Server launched on host: ${appConfig.host}:${appConfig.port}`);
  });
}
bootstrap();
