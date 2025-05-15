import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HospitalInfoService } from './hospital-info.service';
import { HospitalInfoUpdateService } from './services/hospital-info-update.service';
import { HospitalInfo } from './entities/hospital-info.entity';
import { HospitalInfoResponseDto } from './dto/hospital-info.dto';

@ApiTags('통합 병원 정보')
@Controller('hospital-info')
export class HospitalInfoController {
  constructor(
    private readonly hospitalInfoService: HospitalInfoService,
    private readonly hospitalInfoUpdateService: HospitalInfoUpdateService,
  ) {}

  @Get('update')
  @ApiOperation({ summary: '통합 데이터 업데이트', description: '모든 병원의 통합 정보를 업데이트합니다.' })
  @ApiResponse({ status: 200, description: '통합 데이터가 성공적으로 업데이트되었습니다.' })
  async updateIntegratedData() {
    return await this.hospitalInfoService.updateIntegratedData();
  }

  // @Get(':hpid')
  // @ApiOperation({ summary: '특정 병원 정보 조회', description: 'hpid를 기준으로 특정 병원의 통합 정보를 조회합니다.' })
  // @ApiResponse({ status: 200, description: '병원 정보 조회 성공' })
  // async getHospitalInfo(@Param('hpid') hpid: string) {
  //   return await this.hospitalInfoService.getHospitalInfo(hpid);
  // }

  @Get()
  @ApiOperation({ 
    summary: '모든 병원 정보 조회', 
    description: `모든 병원의 통합 정보를 조회합니다.
    
    응답 데이터 설명:
    - hpid: 병원 고유 식별자
    - dutyName: 병원명
    - dutyTel3: 응급실 전화번호
    - hvidate: 데이터 갱신 일시
    
    병상 정보:
    - hvec: 일반병상 수
    - hvoc: 수술실 병상 수
    - hvcc: 중환자실 - 신경과 병상 수
    - hvncc: 중환자실 - 신생아 병상 수
    - hvccc: 중환자실 - 흉부외과 병상 수
    - hvicc: 중환자실 - 일반 병상 수
    - hvgc: 입원실 - 일반 병상 수
    
    응급 장비 및 특수 시설:
    - hvctayn: CT 사용 가능 여부
    - hvmriayn: MRI 사용 가능 여부
    - hvangioayn: 혈관촬영기 가능 여부
    - hvventiayn: 인공호흡기 가능 여부
    - hvventisoayn: 인공호흡기 (조산아용) 가능 여부
    - hvincuayn: 인큐베이터 가능 여부
    - hvcrrtayn: CRRT 가능 여부
    - hvecmoayn: ECMO 사용 가능 여부
    - hvoxyayn: 고압산소치료기 가능 여부
    - hvhypoayn: 중심체온조절유도기 가능 여부
    - hvamyn: 구급차 보유 여부
    
    중증질환 수용 가능 여부:
    - MKioskTy1: 재관류중재술 – 심근경색
    - MKioskTy2: 재관류중재술 – 뇌경색
    - MKioskTy3: 뇌출혈 수술
    - MKioskTy4: 뇌경색 수술
    - MKioskTy5: 뇌종양 수술
    - MKioskTy6: 뇌동맥류 수술
    - MKioskTy7: 뇌혈관기형 수술
    - MKioskTy8: 척추수술
    - MKioskTy9: 외상성 뇌출혈 수술
    - MKioskTy10: 장중첩 폐색 영유아
    - MKioskTy11: 위장관 출혈
    - MKioskTy12: 위장관 응급내시경
    - MKioskTy13: 응급 복부 수술
    - MKioskTy14: 기관지 응급내시경
    - MKioskTy15: 저체중 출생아
    - MKioskTy16: 신생아 호흡부전
    - MKioskTy17: 신생아 패혈증
    - MKioskTy18: 신생아 경련
    - MKioskTy19: 신생아 고빌리루빈혈증
    - MKioskTy20: 외상성 출혈
    - MKioskTy21: 화상
    - MKioskTy22: 중증 화상
    - MKioskTy23: 중증 외상
    - MKioskTy24: 중증 패혈증
    - MKioskTy25: 중증 호흡부전
    - MKioskTy26: 영상의학 혈관중재술 – 성인
    - MKioskTy27: 영상의학 혈관중재술 – 영유아
    - MKioskTy28: 응급실(Emergency gate keeper)
    
    응급실 메시지:
    - symBlkMsg: 응급실 메시지 내용
    - symTypCod: 메시지 유형 코드
    - symTypCodMagList: 메시지 유형 설명 목록
    - symOutDspYon: 외부 표시 여부
    - symOutDspMth: 외부 표시 방법
    - symBlkSttDtm: 메시지 시작 시간
    - symBlkEndDtm: 메시지 종료 시간
    
    위치 정보:
    - wgs84Lon: 병원 경도
    - wgs84Lat: 병원 위도`
  })
  @ApiResponse({ 
    status: 200, 
    description: '모든 병원 정보 조회 성공',
    type: [HospitalInfoResponseDto]
  })
  async getAllHospitalInfo() {
    return await this.hospitalInfoService.getAllHospitalInfo();
  }

  @Get('reset')
  @ApiOperation({ summary: '통합 데이터베이스 초기화', description: '통합 데이터베이스를 초기화합니다.' })
  @ApiResponse({ status: 200, description: '통합 데이터베이스가 성공적으로 초기화되었습니다.' })
  async resetDatabase() {
    return await this.hospitalInfoService.resetDatabase();
  }
} 