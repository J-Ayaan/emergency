import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmergencyBedRequestDto {
  @ApiProperty({ description: '주소 시도 (필수)' })
  STAGE1: string;

  @ApiProperty({ description: '주소 시군구 (필수)' })
  STAGE2: string;

  @ApiPropertyOptional({ description: '페이지 번호 (선택)', default: 1 })
  pageNo?: number;

  @ApiPropertyOptional({ description: '페이지당 건수 (선택)', default: 10 })
  numOfRows?: number;
}

export class EmergencyBedResponseDto {
  resultCode: string;
  resultMsg: string;
  items: EmergencyBedItemDto[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export class EmergencyBedItemDto {
  dutyName: string;        // 병원명
  hpid: string;           // 병원 ID
  dutyTel3: string;       // 응급실 전화번호
  hvidate: string;        // 데이터 갱신 일시

  // 병상 관련 필드
  hvec: string;           // 일반병상
  hvoc: string;           // 수술실 병상
  hvcc: string;           // 중환자실 - 신경과
  hvncc: string;          // 중환자실 - 신생아
  hvccc: string;          // 중환자실 - 흉부외과
  hvicc: string;          // 중환자실 - 일반
  hvgc: string;           // 입원실 - 일반

  // 응급 장비 및 특수 시설 가용 여부
  hvctayn: string;        // CT 사용 가능 여부
  hvmriayn: string;       // MRI 사용 가능 여부
  hvangioayn: string;     // 혈관촬영기 가능 여부
  hvventiayn: string;     // 인공호흡기 가능 여부
  hvventisoayn: string;   // 인공호흡기 (조산아용) 가능 여부
  hvincuayn: string;      // 인큐베이터 가능 여부
  hvcrrtayn: string;      // CRRT 가능 여부
  hvecmoayn: string;      // ECMO 사용 가능 여부
  hvoxyayn: string;       // 고압산소치료기 가능 여부
  hvhypoayn: string;      // 중심체온조절유도기 가능 여부
  hvamyn: string;         // 구급차 보유 여부

  // 당직의 및 연락처
  hvdnm: string;          // 당직의 이름
  hv1: string;            // 응급실 당직의 직통 연락처
  hv12: string;           // 소아 당직의 직통 연락처

  // 특수 병상 코드 (hv2 ~ hv61)
  hv2: string;            // 중환자실 내과
  hv3: string;            // 중환자실 외과
  hv4: string;            // 정형외과 입원실
  hv5: string;            // 신경과 입원실
  hv6: string;            // 중환자실 신경외과
  hv7: string;            // 약물중환자
  hv8: string;            // 중환자실 화상
  hv9: string;            // 중환자실 외상
  hv10: string;           // 소아 VENTI
  hv11: string;           // 인큐베이터 보육기
  hv13: string;           // 음압 격리 병상
  hv14: string;           // 일반 격리 병상
  hv15: string;           // 소아 음압 격리
  hv16: string;           // 소아 일반 격리
  hv17: string;           // 응급전용 중환자실 음압격리
  hv18: string;           // 응급전용 중환자실 일반격리
  hv19: string;           // 응급전용 입원실 음압격리
  hv21: string;           // 응급전용 입원실 일반격리
  hv22: string;           // 감염병 전담 중환자실
  hv23: string;           // 감염병 전담 중환자실 내 음압격리
  hv24: string;           // 감염 중증 병상
  hv25: string;           // 감염 준 중증 병상
  hv26: string;           // 감염 중등증 병상
  hv27: string;           // 코호트 격리
  hv28: string;           // 소아 병상
  hv29: string;           // 응급실 음압 격리 병상
  hv30: string;           // 응급실 일반 격리 병상
  hv31: string;           // 응급전용 중환자실
  hv32: string;           // 중환자실 소아
  hv33: string;           // 응급전용 소아중환자실
  hv34: string;           // 중환자실 심장내과
  hv35: string;           // 중환자실 음압격리
  hv36: string;           // 응급전용 입원실
  hv37: string;           // 응급전용 소아입원실
  hv38: string;           // 외상전용 입원실
  hv39: string;           // 외상전용 수술실
  hv40: string;           // 정신과 폐쇄병동
  hv41: string;           // 입원실 음압격리
  hv42: string;           // 분만실
  hv43: string;           // 화상전용 처치실
  hv60: string;           // 외상소생실
  hv61: string;           // 외상환자 진료구역
} 