import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('MediControl API')
    .setDescription('Sistema Web de Gestión de Citas Médicas')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Usuarios')
    .addTag('Roles')
    .addTag('Pacientes')
    .addTag('Especialidades')
    .addTag('Médicos')
    .addTag('Citas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
