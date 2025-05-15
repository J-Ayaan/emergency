import { ApiProperty } from '@nestjs/swagger';

export class EmergencyMessageDto {
  @ApiProperty({ description: '응급실 메시지 내용' })
  symBlkMsg: string;

  @ApiProperty({ description: '메시지 유형 코드' })
  symTypCod: string;

  @ApiProperty({ description: '메시지 유형 설명 목록' })
  symTypCodMagList: string[];

  @ApiProperty({ description: '외부 표시 여부' })
  symOutDspYon: string;

  @ApiProperty({ description: '외부 표시 방법' })
  symOutDspMth: string;

  @ApiProperty({ description: '메시지 시작 시간' })
  symBlkSttDtm: string;

  @ApiProperty({ description: '메시지 종료 시간' })
  symBlkEndDtm: string;
}

export class HospitalInfoResponseDto {
  @ApiProperty({ description: '병원 ID' })
  id: number;

  @ApiProperty({ description: '병원 고유 식별자' })
  hpid: string;

  @ApiProperty({ description: '병원명' })
  dutyName: string;

  @ApiProperty({ description: '응급실 전화번호' })
  dutyTel3: string;

  @ApiProperty({ description: '데이터 갱신 일시' })
  hvidate: string;

  @ApiProperty({ description: '일반병상 수' })
  hvec: string;

  @ApiProperty({ description: '수술실 병상 수' })
  hvoc: string;

  @ApiProperty({ description: '중환자실 - 신경과 병상 수' })
  hvcc: string;

  @ApiProperty({ description: '중환자실 - 신생아 병상 수' })
  hvncc: string;

  @ApiProperty({ description: '중환자실 - 흉부외과 병상 수' })
  hvccc: string;

  @ApiProperty({ description: '중환자실 - 일반 병상 수' })
  hvicc: string;

  @ApiProperty({ description: '입원실 - 일반 병상 수' })
  hvgc: string;

  @ApiProperty({ description: 'CT 사용 가능 여부' })
  hvctayn: boolean;

  @ApiProperty({ description: 'MRI 사용 가능 여부' })
  hvmriayn: boolean;

  @ApiProperty({ description: '혈관촬영기 가능 여부' })
  hvangioayn: boolean;

  @ApiProperty({ description: '인공호흡기 가능 여부' })
  hvventiayn: boolean;

  @ApiProperty({ description: '인공호흡기 (조산아용) 가능 여부' })
  hvventisoayn: boolean;

  @ApiProperty({ description: '인큐베이터 가능 여부' })
  hvincuayn: boolean;

  @ApiProperty({ description: 'CRRT 가능 여부' })
  hvcrrtayn: boolean;

  @ApiProperty({ description: 'ECMO 사용 가능 여부' })
  hvecmoayn: boolean;

  @ApiProperty({ description: '고압산소치료기 가능 여부' })
  hvoxyayn: boolean;

  @ApiProperty({ description: '중심체온조절유도기 가능 여부' })
  hvhypoayn: boolean;

  @ApiProperty({ description: '구급차 보유 여부' })
  hvamyn: boolean;

  @ApiProperty({ description: '재관류중재술 – 심근경색 가능 여부' })
  MKioskTy1: boolean;

  @ApiProperty({ description: '재관류중재술 – 뇌경색 가능 여부' })
  MKioskTy2: boolean;

  @ApiProperty({ description: '뇌출혈 수술 가능 여부' })
  MKioskTy3: boolean;

  @ApiProperty({ description: '뇌경색 수술 가능 여부' })
  MKioskTy4: boolean;

  @ApiProperty({ description: '뇌종양 수술 가능 여부' })
  MKioskTy5: boolean;

  @ApiProperty({ description: '뇌동맥류 수술 가능 여부' })
  MKioskTy6: boolean;

  @ApiProperty({ description: '뇌혈관기형 수술 가능 여부' })
  MKioskTy7: boolean;

  @ApiProperty({ description: '척추수술 가능 여부' })
  MKioskTy8: boolean;

  @ApiProperty({ description: '외상성 뇌출혈 수술 가능 여부' })
  MKioskTy9: boolean;

  @ApiProperty({ description: '장중첩 폐색 영유아 가능 여부' })
  MKioskTy10: boolean;

  @ApiProperty({ description: '위장관 출혈 가능 여부' })
  MKioskTy11: boolean;

  @ApiProperty({ description: '위장관 응급내시경 가능 여부' })
  MKioskTy12: boolean;

  @ApiProperty({ description: '응급 복부 수술 가능 여부' })
  MKioskTy13: boolean;

  @ApiProperty({ description: '기관지 응급내시경 가능 여부' })
  MKioskTy14: boolean;

  @ApiProperty({ description: '저체중 출생아 가능 여부' })
  MKioskTy15: boolean;

  @ApiProperty({ description: '신생아 호흡부전 가능 여부' })
  MKioskTy16: boolean;

  @ApiProperty({ description: '신생아 패혈증 가능 여부' })
  MKioskTy17: boolean;

  @ApiProperty({ description: '신생아 경련 가능 여부' })
  MKioskTy18: boolean;

  @ApiProperty({ description: '신생아 고빌리루빈혈증 가능 여부' })
  MKioskTy19: boolean;

  @ApiProperty({ description: '외상성 출혈 가능 여부' })
  MKioskTy20: boolean;

  @ApiProperty({ description: '화상 가능 여부' })
  MKioskTy21: boolean;

  @ApiProperty({ description: '중증 화상 가능 여부' })
  MKioskTy22: boolean;

  @ApiProperty({ description: '중증 외상 가능 여부' })
  MKioskTy23: boolean;

  @ApiProperty({ description: '중증 패혈증 가능 여부' })
  MKioskTy24: boolean;

  @ApiProperty({ description: '중증 호흡부전 가능 여부' })
  MKioskTy25: boolean;

  @ApiProperty({ description: '영상의학 혈관중재술 – 성인 가능 여부' })
  MKioskTy26: boolean;

  @ApiProperty({ description: '영상의학 혈관중재술 – 영유아 가능 여부' })
  MKioskTy27: boolean;

  @ApiProperty({ description: '응급실(Emergency gate keeper) 가능 여부' })
  MKioskTy28: boolean;

  @ApiProperty({ description: '장중첩 폐색 영유아 메시지' })
  MKioskTy10Msg: string;

  @ApiProperty({ description: '위장관 응급내시경 메시지' })
  MKioskTy12Msg: string;

  @ApiProperty({ description: '기관지 응급내시경 메시지' })
  MKioskTy14Msg: string;

  @ApiProperty({ description: '저체중 출생아 메시지' })
  MKioskTy15Msg: string;

  @ApiProperty({ description: '영상의학 혈관중재술 – 영유아 메시지' })
  MKioskTy27Msg: string;

  @ApiProperty({ description: '응급의료기관 코드' })
  emcOrgCod: string;

  @ApiProperty({ description: '응급실 메시지 목록', type: [EmergencyMessageDto] })
  messages: EmergencyMessageDto[];

  @ApiProperty({ description: '병원 경도' })
  wgs84Lon: string;

  @ApiProperty({ description: '병원 위도' })
  wgs84Lat: string;

  @ApiProperty({ description: '생성 시간' })
  createdAt: Date;

  @ApiProperty({ description: '수정 시간' })
  updatedAt: Date;
} 