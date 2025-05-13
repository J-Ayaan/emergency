import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalInfo } from './entities/hospital-info.entity';
import { EmergencyBed } from '../emergency-bed/entities/emergency-bed.entity';
import { SevereIllness } from '../severe-illness/entities/severe-illness.entity';
import { EmergencyMessage } from '../emergency-message/entities/emergency-message.entity';
import { EmergencyRoom } from '../emergency-room/entities/emergency-room.entity';
import { HospitalInfoService } from './hospital-info.service';
import { HospitalInfoController } from './hospital-info.controller';
import { HospitalInfoUpdateService } from './services/hospital-info-update.service';
import { HospitalStatus } from './entities/hospital-status.entity';
import { HospitalStatusService } from './services/hospital-status.service';
import { HospitalStatusController } from './controllers/hospital-status.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HospitalInfo,
      EmergencyBed,
      SevereIllness,
      EmergencyMessage,
      EmergencyRoom,
      HospitalStatus
    ])
  ],
  controllers: [HospitalInfoController, HospitalStatusController],
  providers: [HospitalInfoService, HospitalInfoUpdateService, HospitalStatusService],
  exports: [HospitalInfoService, HospitalInfoUpdateService, HospitalStatusService]
})
export class HospitalInfoModule {} 