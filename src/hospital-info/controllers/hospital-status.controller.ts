import { Controller, Get } from '@nestjs/common';
import { HospitalStatusService } from '../services/hospital-status.service';
import { ApiTags, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { HospitalStatusResponseDto } from '../dto/hospital-status.dto';

@ApiTags('병원 현황')
@Controller('hospital-status')
export class HospitalStatusController {
  constructor(private readonly hospitalStatusService: HospitalStatusService) {}

  @Get()
  @ApiOperation({ 
    summary: '최신 병원 현황 조회',
    description: `가장 최근에 업데이트된 병원 현황 정보를 조회합니다.

    응답 데이터 설명:
    1. 기본 정보
    - id: 기록 ID
    - timestamp: 기록 시간
    - totalHospitals: 전체 병원 수
    - activeHospitals: 활성 병원 수 (최근 30분 내 데이터가 있는 병원)

    2. 병상 현황
    - totalBeds: 전체 병상 현황
      * current: 현재 병상 수
      * previous: 이전 병상 수
      * change: 변화량
      * changeType: 변화 유형 (increase/decrease/unchanged)
    
    - availableBeds: 가용 병상 현황
      * current: 현재 가용 병상 수
      * previous: 이전 가용 병상 수
      * change: 변화량
      * changeType: 변화 유형

    - bedTypes: 병상 유형별 현황
      * general: 일반 병상
      * surgery: 수술실 병상
      * icu: 중환자실 병상
      * ward: 입원실 병상
      (각 유형별로 current, previous, change 정보 포함)

    3. 중증질환 수용 현황
    - severeIllness
      * totalHospitals: 전체 병원 수
      * availableHospitals: 가용 병원 수
      * types: 중증질환 유형별 현황
        - cardiac: 심장질환
        - neurology: 신경질환
        - pediatric: 소아질환
        - trauma: 외상질환
        (각 유형별로 available, change 정보 포함)

    4. 구급차 현황
    - ambulance
      * totalHospitals: 전체 병원 수
      * totalAmbulances: 전체 구급차 수
      * availableAmbulances: 가용 구급차 수
      * inUseAmbulances: 운행 중인 구급차 수
      * dailyStats: 일일 통계
        - date: 날짜
        - totalDispatches: 총 출동 횟수
        - change: 변화량

    5. 요약 정보
    - summary
      * emergencyRoomStatus: 응급실 상태
      * severeIllnessStatus: 중증질환 수용 상태
      * ambulanceStatus: 구급차 상태
      * overallStatus: 전체 상태
      * criticalAreas: 주의가 필요한 지역 목록
        - region: 지역명
        - reason: 주의 사유
        - level: 위험도 수준
      * trends: 변화 추이
        - emergencyRoom: 응급실 추이
        - severeIllness: 중증질환 추이
        - ambulance: 구급차 추이`
  })
  @ApiResponse({ 
    status: 200, 
    description: '병원 현황 조회 성공',
    type: HospitalStatusResponseDto 
  })
  async getLatestStatus() {
    return await this.hospitalStatusService.getLatestStatus();
  }

  @Get('update')
  @ApiExcludeEndpoint()
  @ApiOperation({ 
    summary: '병원 현황 수동 업데이트',
    description: '병원 현황 정보를 수동으로 업데이트합니다. 현재 데이터를 기반으로 병원 현황을 새로 계산하고 저장합니다.'
  })
  @ApiResponse({ 
    status: 200, 
    description: '병원 현황 업데이트 성공',
    type: HospitalStatusResponseDto 
  })
  async updateStatus() {
    return await this.hospitalStatusService.updateHospitalStatus();
  }
} 