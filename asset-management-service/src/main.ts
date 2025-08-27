import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:4000', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Asset Management Service')
      .setDescription('Backend APIs in NestJS')
      .setVersion('1.0')
      .addTag('assets')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`asset-management-service started on http://localhost:${port}`);

  // If development ENV, enable swagger
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Swagger documentation available at http://localhost:${port}/api`);
  }
}

bootstrap();
