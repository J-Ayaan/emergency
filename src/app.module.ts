import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmergencyRoomModule } from './emergency-room/emergency-room.module';
import { EmergencyBedModule } from './emergency-bed/emergency-bed.module';
import { SevereIllnessModule } from './severe-illness/severe-illness.module';
import { EmergencyMessageModule } from './emergency-message/emergency-message.module';
import { HospitalInfoModule } from './hospital-info/hospital-info.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    EmergencyRoomModule,
    EmergencyBedModule,
    SevereIllnessModule,
    EmergencyMessageModule,
    HospitalInfoModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
