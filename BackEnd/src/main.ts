import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);




  app.enableCors({
    origin: 'http://localhost:3000', // Permite solicitudes desde el frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
    credentials: true, // Permite el uso de cookies y credenciales
  });


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}

bootstrap();
