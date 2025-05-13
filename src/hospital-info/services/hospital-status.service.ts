import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { HospitalStatus } from '../entities/hospital-status.entity';
import { HospitalInfo } from '../entities/hospital-info.entity';
import { EmergencyBed } from '../../emergency-bed/entities/emergency-bed.entity';
import { SevereIllness } from '../../severe-illness/entities/severe-illness.entity';

@Injectable()
export class HospitalStatusService {
  constructor(
    @InjectRepository(HospitalStatus)
    private readonly hospitalStatusRepository: Repository<HospitalStatus>,
    @InjectRepository(HospitalInfo)
    private readonly hospitalInfoRepository: Repository<HospitalInfo>,
    @InjectRepository(EmergencyBed)
    private readonly emergencyBedRepository: Repository<EmergencyBed>,
    @InjectRepository(SevereIllness)
    private readonly severeIllnessRepository: Repository<SevereIllness>,
  ) {}

  async updateHospitalStatus() {
    try {
      // 이전 상태 조회
      const previousStatus = await this.hospitalStatusRepository.findOne({
        where: {},
        order: { timestamp: 'DESC' }
      });

      // 현재 데이터 수집
      const currentData = await this.collectCurrentData();
      
      // 변화량 계산
      const changes = this.calculateChanges(currentData, previousStatus);

      // 새로운 상태 저장
      const newStatus = new HospitalStatus();
      newStatus.timestamp = new Date();
      newStatus.totalHospitals = currentData.totalHospitals;
      newStatus.activeHospitals = currentData.activeHospitals;
      newStatus.totalBeds = changes.totalBeds;
      newStatus.availableBeds = changes.availableBeds;
      newStatus.bedTypes = changes.bedTypes;
      newStatus.severeIllness = changes.severeIllness;
      newStatus.ambulance = changes.ambulance;
      newStatus.summary = this.generateSummary(changes);

      await this.hospitalStatusRepository.save(newStatus);

      return newStatus;
    } catch (error) {
      console.error('병원 현황 업데이트 중 오류 발생:', error);
      throw error;
    }
  }

  private async collectCurrentData() {
    // 전체 병원 수 조회
    const totalHospitals = await this.hospitalInfoRepository.count();
    
    // 활성 병원 수 조회 (최근 30분 내 데이터가 있는 병원)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const activeHospitals = await this.hospitalInfoRepository.count({
      where: {
        updatedAt: MoreThan(thirtyMinutesAgo)
      }
    });

    // 응급실 병상 정보 수집
    const emergencyBeds = await this.emergencyBedRepository.find();
    const bedData = this.calculateBedData(emergencyBeds);

    // 중증질환 수용 가능 병원 정보 수집
    const severeIllnessData = await this.collectSevereIllnessData();

    // 구급차 정보 수집
    const ambulanceData = await this.collectAmbulanceData();

    return {
      totalHospitals,
      activeHospitals,
      ...bedData,
      ...severeIllnessData,
      ...ambulanceData
    };
  }

  private calculateBedData(emergencyBeds: EmergencyBed[]) {
    const bedTypes = {
      general: { current: 0, previous: 0, change: 0 },
      surgery: { current: 0, previous: 0, change: 0 },
      icu: { current: 0, previous: 0, change: 0 },
      ward: { current: 0, previous: 0, change: 0 }
    };

    emergencyBeds.forEach(bed => {
      bedTypes.general.current += parseInt(bed.hvec) || 0;
      bedTypes.surgery.current += parseInt(bed.hvoc) || 0;
      bedTypes.icu.current += (
        parseInt(bed.hvcc) || 0 +
        parseInt(bed.hvncc) || 0 +
        parseInt(bed.hvccc) || 0 +
        parseInt(bed.hvicc) || 0
      );
      bedTypes.ward.current += parseInt(bed.hvgc) || 0;
    });

    return {
      totalBeds: {
        current: Object.values(bedTypes).reduce((sum, type) => sum + type.current, 0),
        previous: 0, // 이전 데이터와 비교하여 계산
        change: 0,
        changeType: 'unchanged'
      },
      availableBeds: {
        current: 0, // 가용 병상 수 계산 로직 필요
        previous: 0,
        change: 0,
        changeType: 'unchanged'
      },
      bedTypes
    };
  }

  private async collectSevereIllnessData() {
    const severeIllnessHospitals = await this.severeIllnessRepository.find();
    
    const types = {
      cardiac: { available: 0, change: 0 },
      neurology: { available: 0, change: 0 },
      pediatric: { available: 0, change: 0 },
      trauma: { available: 0, change: 0 }
    };

    severeIllnessHospitals.forEach(hospital => {
      if (hospital.MKioskTy1 || hospital.MKioskTy2) types.cardiac.available++;
      if (hospital.MKioskTy3 || hospital.MKioskTy4) types.neurology.available++;
      if (hospital.MKioskTy10 || hospital.MKioskTy12 || hospital.MKioskTy14) types.pediatric.available++;
      if (hospital.MKioskTy9 || hospital.MKioskTy20) types.trauma.available++;
    });

    return {
      severeIllness: {
        totalHospitals: severeIllnessHospitals.length,
        availableHospitals: Object.values(types).reduce((sum, type) => sum + type.available, 0),
        types
      }
    };
  }

  private async collectAmbulanceData() {
    // 구급차 정보 수집 로직
    // 실제 구현에서는 구급차 관련 데이터를 수집해야 함
    return {
      ambulance: {
        totalHospitals: 0,
        totalAmbulances: 0,
        availableAmbulances: 0,
        inUseAmbulances: 0,
        dailyStats: {
          date: new Date().toISOString().split('T')[0],
          totalDispatches: 0,
          change: 0
        }
      }
    };
  }

  private calculateChanges(currentData: any, previousStatus: HospitalStatus | null) {
    if (!previousStatus) {
      return {
        ...currentData,
        totalBeds: { ...currentData.totalBeds, previous: 0, change: 0, changeType: 'unchanged' },
        availableBeds: { ...currentData.availableBeds, previous: 0, change: 0, changeType: 'unchanged' }
      };
    }

    // 변화량 계산 로직
    return {
      ...currentData,
      totalBeds: this.calculateChange(currentData.totalBeds, previousStatus.totalBeds),
      availableBeds: this.calculateChange(currentData.availableBeds, previousStatus.availableBeds),
      bedTypes: this.calculateBedTypeChanges(currentData.bedTypes, previousStatus.bedTypes)
    };
  }

  private calculateChange(current: any, previous: any) {
    const change = current.current - previous.current;
    return {
      ...current,
      previous: previous.current,
      change,
      changeType: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'unchanged'
    };
  }

  private calculateBedTypeChanges(current: any, previous: any) {
    const types = ['general', 'surgery', 'icu', 'ward'];
    const result = {};

    types.forEach(type => {
      result[type] = {
        current: current[type].current,
        previous: previous[type].current,
        change: current[type].current - previous[type].current
      };
    });

    return result;
  }

  private generateSummary(changes: any) {
    return {
      emergencyRoomStatus: this.determineStatus(changes.availableBeds),
      severeIllnessStatus: this.determineStatus(changes.severeIllness),
      ambulanceStatus: this.determineAmbulanceStatus(changes.ambulance),
      overallStatus: this.determineOverallStatus(changes),
      criticalAreas: this.identifyCriticalAreas(changes),
      trends: {
        emergencyRoom: this.determineTrend(changes.availableBeds),
        severeIllness: this.determineTrend(changes.severeIllness),
        ambulance: this.determineTrend(changes.ambulance)
      }
    };
  }

  private determineStatus(data: any): string {
    // 상태 판단 로직
    return 'stable';
  }

  private determineAmbulanceStatus(data: any): string {
    // 구급차 상태 판단 로직
    return 'normal';
  }

  private determineOverallStatus(changes: any): string {
    // 전체 상태 판단 로직
    return 'stable';
  }

  private identifyCriticalAreas(changes: any): Array<{ region: string; reason: string; level: string }> {
    // 주의가 필요한 지역 식별 로직
    return [];
  }

  private determineTrend(data: any): string {
    // 변화 추이 판단 로직
    return 'stable';
  }

  async getLatestStatus() {
    return await this.hospitalStatusRepository.findOne({
      where: {},
      order: { timestamp: 'DESC' }
    });
  }
} 