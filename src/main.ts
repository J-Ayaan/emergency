import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 전역 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('가제 : 닥터링 or 메디핀')
    .setDescription('응급실 상황판 개선 버전 API 문서')
    .setVersion('1.0')
    .addTag('emergency-bed', '응급실 병상 정보')
    .addTag('severe-illness', '중증질환자 수용 가능 병원 정보')
    .addTag('emergency-message', '응급실 메시지')
    .addTag('emergency-room', '응급실 정보')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      deepLinking: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
    },
    customSiteTitle: '공공데이터 API 문서',
    customfavIcon: 'https://nestjs.com/img/favicon.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
