import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { EmergencyBedController } from './emergency-bed.controller';
import { EmergencyBedService } from './emergency-bed.service';
import { EmergencyBed } from './entities/emergency-bed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyBed]),
    HttpModule,
  ],
  controllers: [EmergencyBedController],
  providers: [EmergencyBedService],
  exports: [EmergencyBedService],
})
export class EmergencyBedModule {} 