import { ApiProperty } from '@nestjs/swagger';

export class BedTypeDto {
  @ApiProperty({ description: '현재 병상 수' })
  current: number;

  @ApiProperty({ description: '이전 병상 수' })
  previous: number;

  @ApiProperty({ description: '변화량' })
  change: number;
}

export class BedStatusDto {
  @ApiProperty({ description: '현재 병상 수' })
  current: number;

  @ApiProperty({ description: '이전 병상 수' })
  previous: number;

  @ApiProperty({ description: '변화량' })
  change: number;

  @ApiProperty({ description: '변화 유형 (increase/decrease/unchanged)' })
  changeType: string;
}

export class SevereIllnessTypeDto {
  @ApiProperty({ description: '가용 병원 수' })
  available: number;

  @ApiProperty({ description: '변화량' })
  change: number;
}

export class SevereIllnessDto {
  @ApiProperty({ description: '전체 병원 수' })
  totalHospitals: number;

  @ApiProperty({ description: '가용 병원 수' })
  availableHospitals: number;

  @ApiProperty({ description: '중증질환 유형별 현황' })
  types: {
    cardiac: SevereIllnessTypeDto;
    neurology: SevereIllnessTypeDto;
    pediatric: SevereIllnessTypeDto;
    trauma: SevereIllnessTypeDto;
  };
}

export class AmbulanceDailyStatsDto {
  @ApiProperty({ description: '날짜' })
  date: string;

  @ApiProperty({ description: '총 출동 횟수' })
  totalDispatches: number;

  @ApiProperty({ description: '변화량' })
  change: number;
}

export class AmbulanceDto {
  @ApiProperty({ description: '전체 병원 수' })
  totalHospitals: number;

  @ApiProperty({ description: '전체 구급차 수' })
  totalAmbulances: number;

  @ApiProperty({ description: '가용 구급차 수' })
  availableAmbulances: number;

  @ApiProperty({ description: '운행 중인 구급차 수' })
  inUseAmbulances: number;

  @ApiProperty({ description: '일일 통계' })
  dailyStats: AmbulanceDailyStatsDto;
}

export class CriticalAreaDto {
  @ApiProperty({ description: '지역명' })
  region: string;

  @ApiProperty({ description: '주의 사유' })
  reason: string;

  @ApiProperty({ description: '위험도 수준' })
  level: string;
}

export class SummaryDto {
  @ApiProperty({ description: '응급실 상태' })
  emergencyRoomStatus: string;

  @ApiProperty({ description: '중증질환 수용 상태' })
  severeIllnessStatus: string;

  @ApiProperty({ description: '구급차 상태' })
  ambulanceStatus: string;

  @ApiProperty({ description: '전체 상태' })
  overallStatus: string;

  @ApiProperty({ description: '주의가 필요한 지역 목록' })
  criticalAreas: CriticalAreaDto[];

  @ApiProperty({ description: '변화 추이' })
  trends: {
    emergencyRoom: string;
    severeIllness: string;
    ambulance: string;
  };
}

export class HospitalStatusResponseDto {
  @ApiProperty({ description: '기록 ID' })
  id: number;

  @ApiProperty({ description: '기록 시간' })
  timestamp: Date;

  @ApiProperty({ description: '전체 병원 수' })
  totalHospitals: number;

  @ApiProperty({ description: '활성 병원 수 (최근 30분 내 데이터가 있는 병원)' })
  activeHospitals: number;

  @ApiProperty({ description: '전체 병상 현황' })
  totalBeds: BedStatusDto;

  @ApiProperty({ description: '가용 병상 현황' })
  availableBeds: BedStatusDto;

  @ApiProperty({ description: '병상 유형별 현황' })
  bedTypes: {
    general: BedTypeDto;
    surgery: BedTypeDto;
    icu: BedTypeDto;
    ward: BedTypeDto;
  };

  @ApiProperty({ description: '중증질환 수용 현황' })
  severeIllness: SevereIllnessDto;

  @ApiProperty({ description: '구급차 현황' })
  ambulance: AmbulanceDto;

  @ApiProperty({ description: '요약 정보' })
  summary: SummaryDto;

  @ApiProperty({ description: '생성 시간' })
  createdAt: Date;
} 