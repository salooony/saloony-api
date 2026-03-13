import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Saloony API')
    .setDescription('Saloony management REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000, '0.0.0.0');
}

void bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
