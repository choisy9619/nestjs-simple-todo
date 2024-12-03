import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './todos/interceptors/logging-interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('할일 API')
    .setDescription('할일 API 문서입니다.')
    .setVersion('1.0')
    .addTag('todos', '할일 관련 API')
    .addBearerAuth()
    .setTermsOfService('http://swagger.io/terms/')
    .setContact('담당자', 'http://www.test.com', 'choisy9619@gmail.com')
    .setLicense('MIT', 'http://www.test.com')
    .addServer('http://localhost:8080/', 'develop')
    .addServer('http://localhost:8081/', 'stg')
    .addServer('https://prod-site.com/', 'prod')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(8080);
}
bootstrap();
