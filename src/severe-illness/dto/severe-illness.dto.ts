import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SevereIllnessRequestDto {
  @ApiProperty({ description: '주소 시도 (필수)' })
  STAGE1: string;  // 주소 시도 (필수)

  @ApiProperty({ description: '주소 시군구 (필수)' })
  STAGE2: string;  // 주소 시군구 (필수)

  @ApiPropertyOptional({ description: '질환 코드 (1~28) (선택)' })
  SM_TYPE?: string;  // 질환 코드 (1~28) (선택)

  @ApiPropertyOptional({ description: '페이지 번호 (선택)', default: 1 })
  pageNo?: number;  // 페이지 번호 (선택)

  @ApiPropertyOptional({ description: '페이지당 건수 (선택)', default: 10 })
  numOfRows?: number;  // 페이지당 건수 (선택)
}

export class SevereIllnessResponseDto {
  resultCode: string;
  resultMsg: string;
  items: SevereIllnessItemDto[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export class SevereIllnessItemDto {
  rnum: number;  // 일련번호
  hpid: string;  // 병원 ID
  phpid: string;  // 병원 고유 ID
  dutyName: string;  // 병원명
  dutyTel3: string;  // 응급실 전화번호
  dutyAddr: string;  // 병원 주소
  MKioskTy1: string;  // 재관류중재술 심근경색
  MKioskTy2: string;  // 재관류중재술 뇌경색
  MKioskTy3: string;  // 뇌출혈수술 거미막하출혈
  MKioskTy4: string;  // 뇌출혈수술 거미막하출혈 외
  MKioskTy5: string;  // 대동맥응급 흉부
  MKioskTy6: string;  // 대동맥응급 복부
  MKioskTy7: string;  // 담낭담관질환 담낭질환
  MKioskTy8: string;  // 담낭담관질환 담도포함질환
  MKioskTy9: string;  // 복부응급수술 비외상
  MKioskTy10: string;  // 장중첩 폐색 영유아
  MKioskTy11: string;  // 응급내시경 성인 위장관
  MKioskTy12: string;  // 응급내시경 영유아 위장관
  MKioskTy13: string;  // 응급내시경 성인 기관지
  MKioskTy14: string;  // 응급내시경 영유아 기관지
  MKioskTy15: string;  // 저체중출생아 집중치료
  MKioskTy16: string;  // 산부인과응급 분만
  MKioskTy17: string;  // 산부인과응급 산과수술
  MKioskTy18: string;  // 산부인과응급 부인과수술
  MKioskTy19: string;  // 중증화상 전문치료
  MKioskTy20: string;  // 사지접합 수족지접합
  MKioskTy21: string;  // 사지접합 수족지접합 외
  MKioskTy22: string;  // HD 응급투석
  MKioskTy23: string;  // CRRT 응급투석
  MKioskTy24: string;  // 정신과적응급 폐쇄병동입원
  MKioskTy25: string;  // 안과적수술 응급
  MKioskTy26: string;  // 영상의학혈관중재 성인
  MKioskTy27: string;  // 영상의학혈관중재 영유아
  MKioskTy28: string;  // 응급실(Emergency gate keeper)
  MKioskTy10Msg: string;  // 장중첩 폐색 영유아 가능연령
  MKioskTy12Msg: string;  // 위장관 응급내시경 영유아 가능연령
  MKioskTy14Msg: string;  // 기관지 응급내시경 영유아 가능연령
  MKioskTy15Msg: string;  // 저체중 출생아 가능연령
  MKioskTy27Msg: string;  // 영상의학 혈관 중재적 시술 영유아 가능연령
  wgs84Lat: string;  // 위도
  wgs84Lon: string;  // 경도
} 