import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('공공데이터 API')
    .setDescription('공공데이터 API 문서')
    .setVersion('1.0')
    .addTag('emergency-bed', '응급실 병상 정보')
    .addTag('severe-illness', '중증질환자 수용 가능 병원 정보')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
