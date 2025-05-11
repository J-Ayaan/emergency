import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { HospitalInfoModule } from '../hospital-info/hospital-info.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    HospitalInfoModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {} 