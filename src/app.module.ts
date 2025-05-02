import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmergencyMessageModule } from './emergency-message/emergency-message.module';
import { EmergencyRoomModule } from './emergency-room/emergency-room.module';
import { EmergencyBedModule } from './emergency-bed/emergency-bed.module';
import { SevereIllnessModule } from './severe-illness/severe-illness.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'public_data',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EmergencyMessageModule,
    EmergencyRoomModule,
    EmergencyBedModule,
    SevereIllnessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
