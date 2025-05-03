import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalInfo } from './entities/hospital-info.entity';
import { EmergencyBed } from '../emergency-bed/entities/emergency-bed.entity';
import { SevereIllness } from '../severe-illness/entities/severe-illness.entity';
import { EmergencyMessage } from '../emergency-message/entities/emergency-message.entity';
import { Not, IsNull } from 'typeorm';

@Injectable()
export class HospitalInfoService {
  constructor(
    @InjectRepository(HospitalInfo)
    private readonly hospitalInfoRepository: Repository<HospitalInfo>,
    @InjectRepository(EmergencyBed)
    private readonly emergencyBedRepository: Repository<EmergencyBed>,
    @InjectRepository(SevereIllness)
    private readonly severeIllnessRepository: Repository<SevereIllness>,
    @InjectRepository(EmergencyMessage)
    private readonly emergencyMessageRepository: Repository<EmergencyMessage>,
  ) {}

  async updateIntegratedData() {
    console.log('=== 통합 데이터 업데이트 시작 ===');
    
    try {
      // 각 테이블에서 고유한 hpid 목록 가져오기
      const emergencyBedHpids = await this.emergencyBedRepository
        .createQueryBuilder('emergencyBed')
        .select('DISTINCT emergencyBed.hpid')
        .getRawMany();
      
      const severeIllnessHpids = await this.severeIllnessRepository
        .createQueryBuilder('severeIllness')
        .select('DISTINCT severeIllness.hpid')
        .getRawMany();
      
      const emergencyMessageHpids = await this.emergencyMessageRepository
        .createQueryBuilder('emergencyMessage')
        .select('DISTINCT emergencyMessage.hpid')
        .getRawMany();

      // 모든 hpid를 하나의 Set으로 통합
      const allHpids = new Set([
        ...emergencyBedHpids.map(item => item.hpid),
        ...severeIllnessHpids.map(item => item.hpid),
        ...emergencyMessageHpids.map(item => item.hpid)
      ]);

      console.log(`총 ${allHpids.size}개의 병원 ID 처리 시작`);

      // 각 hpid에 대해 데이터 통합
      for (const hpid of allHpids) {
        const emergencyBed = await this.emergencyBedRepository.findOne({ where: { hpid } });
        const severeIllness = await this.severeIllnessRepository.findOne({ where: { hpid } });
        const emergencyMessages = await this.emergencyMessageRepository.find({ where: { hpid } });

        const hospitalInfo = new HospitalInfo();
        
        // EmergencyBed 데이터 매핑
        if (emergencyBed) {
          Object.assign(hospitalInfo, {
            hpid: emergencyBed.hpid,
            dutyName: emergencyBed.dutyName,
            dutyTel3: emergencyBed.dutyTel3,
            hvidate: emergencyBed.hvidate,
            hvec: emergencyBed.hvec,
            hvoc: emergencyBed.hvoc,
            hvcc: emergencyBed.hvcc,
            hvncc: emergencyBed.hvncc,
            hvccc: emergencyBed.hvccc,
            hvicc: emergencyBed.hvicc,
            hvgc: emergencyBed.hvgc,
            hvctayn: emergencyBed.hvctayn,
            hvmriayn: emergencyBed.hvmriayn,
            hvangioayn: emergencyBed.hvangioayn,
            hvventiayn: emergencyBed.hvventiayn,
            hvventisoayn: emergencyBed.hvventisoayn,
            hvincuayn: emergencyBed.hvincuayn,
            hvcrrtayn: emergencyBed.hvcrrtayn,
            hvecmoayn: emergencyBed.hvecmoayn,
            hvoxyayn: emergencyBed.hvoxyayn,
            hvhypoayn: emergencyBed.hvhypoayn,
            hvamyn: emergencyBed.hvamyn
          });
        }

        // SevereIllness 데이터 매핑
        if (severeIllness) {
          Object.assign(hospitalInfo, {
            MKioskTy1: severeIllness.MKioskTy1,
            MKioskTy2: severeIllness.MKioskTy2,
            MKioskTy3: severeIllness.MKioskTy3,
            MKioskTy4: severeIllness.MKioskTy4,
            MKioskTy5: severeIllness.MKioskTy5,
            MKioskTy6: severeIllness.MKioskTy6,
            MKioskTy7: severeIllness.MKioskTy7,
            MKioskTy8: severeIllness.MKioskTy8,
            MKioskTy9: severeIllness.MKioskTy9,
            MKioskTy10: severeIllness.MKioskTy10,
            MKioskTy11: severeIllness.MKioskTy11,
            MKioskTy12: severeIllness.MKioskTy12,
            MKioskTy13: severeIllness.MKioskTy13,
            MKioskTy14: severeIllness.MKioskTy14,
            MKioskTy15: severeIllness.MKioskTy15,
            MKioskTy16: severeIllness.MKioskTy16,
            MKioskTy17: severeIllness.MKioskTy17,
            MKioskTy18: severeIllness.MKioskTy18,
            MKioskTy19: severeIllness.MKioskTy19,
            MKioskTy20: severeIllness.MKioskTy20,
            MKioskTy21: severeIllness.MKioskTy21,
            MKioskTy22: severeIllness.MKioskTy22,
            MKioskTy23: severeIllness.MKioskTy23,
            MKioskTy24: severeIllness.MKioskTy24,
            MKioskTy25: severeIllness.MKioskTy25,
            MKioskTy26: severeIllness.MKioskTy26,
            MKioskTy27: severeIllness.MKioskTy27,
            MKioskTy28: severeIllness.MKioskTy28,
            MKioskTy10Msg: severeIllness.MKioskTy10Msg,
            MKioskTy12Msg: severeIllness.MKioskTy12Msg,
            MKioskTy14Msg: severeIllness.MKioskTy14Msg,
            MKioskTy15Msg: severeIllness.MKioskTy15Msg,
            MKioskTy27Msg: severeIllness.MKioskTy27Msg
          });
        }

        // EmergencyMessage 데이터 매핑
        if (emergencyMessages && emergencyMessages.length > 0) {
          hospitalInfo.emcOrgCod = emergencyMessages[0].emcOrgCod;
          hospitalInfo.messages = emergencyMessages.map(message => ({
            symBlkMsg: message.symBlkMsg,
            symBlkMsgTyp: message.symBlkMsgTyp,
            symTypCod: message.symTypCod,
            symTypCodMag: message.symTypCodMag,
            symOutDspYon: message.symOutDspYon,
            symOutDspMth: message.symOutDspMth,
            symBlkSttDtm: message.symBlkSttDtm,
            symBlkEndDtm: message.symBlkEndDtm
          }));
        }

        // 기존 데이터 확인 및 업데이트 또는 새로 저장
        const existingInfo = await this.hospitalInfoRepository.findOne({ where: { hpid } });
        if (existingInfo) {
          await this.hospitalInfoRepository.update(existingInfo.id, hospitalInfo);
        } else {
          await this.hospitalInfoRepository.save(hospitalInfo);
        }
      }

      console.log('=== 통합 데이터 업데이트 완료 ===');
      return { message: '통합 데이터가 성공적으로 업데이트되었습니다.' };
    } catch (error) {
      console.error('통합 데이터 업데이트 중 오류 발생:', error);
      throw error;
    }
  }

  async getHospitalInfo(hpid: string) {
    return await this.hospitalInfoRepository.findOne({ where: { hpid } });
  }

  async getAllHospitalInfo() {
    return await this.hospitalInfoRepository.find({
      where: {
        hpid: Not(IsNull()),
        dutyName: Not(IsNull())
      }
    });
  }

  async resetDatabase() {
    try {
      console.log('=== 통합 데이터베이스 초기화 시작 ===');
      
      // 트랜잭션 시작
      await this.hospitalInfoRepository.manager.transaction(async (manager) => {
        // hospital_info 테이블 초기화
        await manager.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.query('TRUNCATE TABLE hospital_info');
        await manager.query('ALTER TABLE hospital_info AUTO_INCREMENT = 1');
        await manager.query('SET FOREIGN_KEY_CHECKS = 1');
        
        console.log('hospital_info 테이블 초기화 완료');
      });

      console.log('=== 통합 데이터베이스 초기화 완료 ===');
      return { message: '통합 데이터베이스가 성공적으로 초기화되었습니다.' };
    } catch (error) {
      console.error('통합 데이터베이스 초기화 중 오류 발생:', error);
      throw error;
    }
  }
} 