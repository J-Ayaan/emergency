import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class EmergencyBedRequestDto {
  @ApiProperty({ description: '주소 시도 (필수)' })
  @IsString()
  STAGE1: string;

  @ApiProperty({ description: '주소 시군구 (필수)' })
  @IsString()
  STAGE2: string;

  @ApiPropertyOptional({ description: '페이지 번호 (선택)', default: '1' })
  @IsNumberString()
  @IsOptional()
  pageNo?: string;

  @ApiPropertyOptional({ description: '페이지당 건수 (선택)', default: '10' })
  @IsNumberString()
  @IsOptional()
  numOfRows?: string;
}

export class EmergencyBedItemDto {
  @ApiProperty({ description: '병원명' })
  dutyName: string;        // 병원명

  @ApiProperty({ description: '병원 ID' })
  hpid: string;           // 병원 ID

  @ApiProperty({ description: '응급실 전화번호' })
  dutyTel3: string;       // 응급실 전화번호

  @ApiProperty({ description: '데이터 갱신 일시' })
  hvidate: string;        // 데이터 갱신 일시

  // 병상 관련 필드
  @ApiProperty({ description: '일반병상 수' })
  hvec: string;           // 일반병상

  @ApiProperty({ description: '수술실 병상 수' })
  hvoc: string;           // 수술실 병상

  @ApiProperty({ description: '중환자실 - 신경과 병상 수' })
  hvcc: string;           // 중환자실 - 신경과

  @ApiProperty({ description: '중환자실 - 신생아 병상 수' })
  hvncc: string;          // 중환자실 - 신생아

  @ApiProperty({ description: '중환자실 - 흉부외과 병상 수' })
  hvccc: string;          // 중환자실 - 흉부외과

  @ApiProperty({ description: '중환자실 - 일반 병상 수' })
  hvicc: string;          // 중환자실 - 일반

  @ApiProperty({ description: '입원실 - 일반 병상 수' })
  hvgc: string;           // 입원실 - 일반

  // 응급 장비 및 특수 시설 가용 여부
  @ApiProperty({ description: 'CT 사용 가능 여부 (Y/N)' })
  hvctayn: string;        // CT 사용 가능 여부

  @ApiProperty({ description: 'MRI 사용 가능 여부 (Y/N)' })
  hvmriayn: string;       // MRI 사용 가능 여부

  @ApiProperty({ description: '혈관촬영기 가능 여부 (Y/N)' })
  hvangioayn: string;     // 혈관촬영기 가능 여부

  @ApiProperty({ description: '인공호흡기 가능 여부 (Y/N)' })
  hvventiayn: string;     // 인공호흡기 가능 여부

  @ApiProperty({ description: '인공호흡기 (조산아용) 가능 여부 (Y/N)' })
  hvventisoayn: string;   // 인공호흡기 (조산아용) 가능 여부

  @ApiProperty({ description: '인큐베이터 가능 여부 (Y/N)' })
  hvincuayn: string;      // 인큐베이터 가능 여부

  @ApiProperty({ description: 'CRRT 가능 여부 (Y/N)' })
  hvcrrtayn: string;      // CRRT 가능 여부

  @ApiProperty({ description: 'ECMO 사용 가능 여부 (Y/N)' })
  hvecmoayn: string;      // ECMO 사용 가능 여부

  @ApiProperty({ description: '고압산소치료기 가능 여부 (Y/N)' })
  hvoxyayn: string;       // 고압산소치료기 가능 여부

  @ApiProperty({ description: '중심체온조절유도기 가능 여부 (Y/N)' })
  hvhypoayn: string;      // 중심체온조절유도기 가능 여부

  @ApiProperty({ description: '구급차 보유 여부 (Y/N)' })
  hvamyn: string;         // 구급차 보유 여부

  // 당직의 및 연락처
  @ApiProperty({ description: '당직의 이름' })
  hvdnm: string;          // 당직의 이름

  @ApiProperty({ description: '응급실 당직의 직통 연락처' })
  hv1: string;            // 응급실 당직의 직통 연락처

  @ApiProperty({ description: '소아 당직의 직통 연락처' })
  hv12: string;           // 소아 당직의 직통 연락처

  // 특수 병상 코드 (hv2 ~ hv61)
  @ApiProperty({ description: '중환자실 내과 병상 수' })
  hv2: string;            // 중환자실 내과

  @ApiProperty({ description: '중환자실 외과 병상 수' })
  hv3: string;            // 중환자실 외과

  @ApiProperty({ description: '정형외과 입원실 병상 수' })
  hv4: string;            // 정형외과 입원실

  @ApiProperty({ description: '신경과 입원실 병상 수' })
  hv5: string;            // 신경과 입원실

  @ApiProperty({ description: '중환자실 신경외과 병상 수' })
  hv6: string;            // 중환자실 신경외과

  @ApiProperty({ description: '약물중환자 병상 수' })
  hv7: string;            // 약물중환자

  @ApiProperty({ description: '중환자실 화상 병상 수' })
  hv8: string;            // 중환자실 화상

  @ApiProperty({ description: '중환자실 외상 병상 수' })
  hv9: string;            // 중환자실 외상

  @ApiProperty({ description: '소아 VENTI 병상 수' })
  hv10: string;           // 소아 VENTI

  @ApiProperty({ description: '인큐베이터 보육기 병상 수' })
  hv11: string;           // 인큐베이터 보육기

  @ApiProperty({ description: '음압 격리 병상 수' })
  hv13: string;           // 음압 격리 병상

  @ApiProperty({ description: '일반 격리 병상 수' })
  hv14: string;           // 일반 격리 병상

  @ApiProperty({ description: '소아 음압 격리 병상 수' })
  hv15: string;           // 소아 음압 격리

  @ApiProperty({ description: '소아 일반 격리 병상 수' })
  hv16: string;           // 소아 일반 격리

  @ApiProperty({ description: '응급전용 중환자실 음압격리 병상 수' })
  hv17: string;           // 응급전용 중환자실 음압격리

  @ApiProperty({ description: '응급전용 중환자실 일반격리 병상 수' })
  hv18: string;           // 응급전용 중환자실 일반격리

  @ApiProperty({ description: '응급전용 입원실 음압격리 병상 수' })
  hv19: string;           // 응급전용 입원실 음압격리

  @ApiProperty({ description: '응급전용 입원실 일반격리 병상 수' })
  hv21: string;           // 응급전용 입원실 일반격리

  @ApiProperty({ description: '감염병 전담 중환자실 병상 수' })
  hv22: string;           // 감염병 전담 중환자실

  @ApiProperty({ description: '감염병 전담 중환자실 내 음압격리 병상 수' })
  hv23: string;           // 감염병 전담 중환자실 내 음압격리

  @ApiProperty({ description: '감염 중증 병상 수' })
  hv24: string;           // 감염 중증 병상

  @ApiProperty({ description: '감염 준 중증 병상 수' })
  hv25: string;           // 감염 준 중증 병상

  @ApiProperty({ description: '감염 중등증 병상 수' })
  hv26: string;           // 감염 중등증 병상

  @ApiProperty({ description: '코호트 격리 병상 수' })
  hv27: string;           // 코호트 격리

  @ApiProperty({ description: '소아 병상 수' })
  hv28: string;           // 소아 병상

  @ApiProperty({ description: '응급실 음압 격리 병상 수' })
  hv29: string;           // 응급실 음압 격리 병상

  @ApiProperty({ description: '응급실 일반 격리 병상 수' })
  hv30: string;           // 응급실 일반 격리 병상

  @ApiProperty({ description: '응급전용 중환자실 병상 수' })
  hv31: string;           // 응급전용 중환자실

  @ApiProperty({ description: '중환자실 소아 병상 수' })
  hv32: string;           // 중환자실 소아

  @ApiProperty({ description: '응급전용 소아중환자실 병상 수' })
  hv33: string;           // 응급전용 소아중환자실

  @ApiProperty({ description: '중환자실 심장내과 병상 수' })
  hv34: string;           // 중환자실 심장내과

  @ApiProperty({ description: '중환자실 음압격리 병상 수' })
  hv35: string;           // 중환자실 음압격리

  @ApiProperty({ description: '응급전용 입원실 병상 수' })
  hv36: string;           // 응급전용 입원실

  @ApiProperty({ description: '응급전용 소아입원실 병상 수' })
  hv37: string;           // 응급전용 소아입원실

  @ApiProperty({ description: '외상전용 입원실 병상 수' })
  hv38: string;           // 외상전용 입원실

  @ApiProperty({ description: '외상전용 수술실 병상 수' })
  hv39: string;           // 외상전용 수술실

  @ApiProperty({ description: '정신과 폐쇄병동 병상 수' })
  hv40: string;           // 정신과 폐쇄병동

  @ApiProperty({ description: '입원실 음압격리 병상 수' })
  hv41: string;           // 입원실 음압격리

  @ApiProperty({ description: '분만실 병상 수' })
  hv42: string;           // 분만실

  @ApiProperty({ description: '화상전용 처치실 병상 수' })
  hv43: string;           // 화상전용 처치실

  @ApiProperty({ description: '외상소생실 병상 수' })
  hv60: string;           // 외상소생실

  @ApiProperty({ description: '외상환자 진료구역 병상 수' })
  hv61: string;           // 외상환자 진료구역
}

export class EmergencyBedResponseDto {
  @ApiProperty({ description: '결과 코드' })
  resultCode: string;

  @ApiProperty({ description: '결과 메시지' })
  resultMsg: string;

  @ApiProperty({ description: '응답 데이터 목록', type: [EmergencyBedItemDto] })
  items: EmergencyBedItemDto[];

  @ApiProperty({ description: '페이지당 건수' })
  numOfRows: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  pageNo: number;

  @ApiProperty({ description: '전체 데이터 건수' })
  totalCount: number;
} 