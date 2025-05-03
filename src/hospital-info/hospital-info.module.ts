import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalInfo } from './entities/hospital-info.entity';
import { EmergencyBed } from '../emergency-bed/entities/emergency-bed.entity';
import { SevereIllness } from '../severe-illness/entities/severe-illness.entity';
import { EmergencyMessage } from '../emergency-message/entities/emergency-message.entity';
import { HospitalInfoService } from './hospital-info.service';
import { HospitalInfoController } from './hospital-info.controller';
import { HospitalInfoUpdateService } from './services/hospital-info-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HospitalInfo,
      EmergencyBed,
      SevereIllness,
      EmergencyMessage
    ])
  ],
  controllers: [HospitalInfoController],
  providers: [HospitalInfoService, HospitalInfoUpdateService],
  exports: [HospitalInfoService, HospitalInfoUpdateService]
})
export class HospitalInfoModule {} 