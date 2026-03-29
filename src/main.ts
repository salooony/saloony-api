import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fastify = app.getHttpAdapter().getInstance() as any;

  // Register fastify plugins for static assets and multipart handling
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await fastify.register(fastifyStatic, {
    root: join(__dirname, '..', 'uploads'),
    prefix: '/uploads/',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  });

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
