import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class SevereIllnessRequestDto {
  @ApiProperty({ description: '주소 시도 (필수)' })
  @IsString()
  STAGE1: string;  // 주소 시도 (필수)

  @ApiProperty({ description: '주소 시군구 (필수)' })
  @IsString()
  STAGE2: string;  // 주소 시군구 (필수)

  @ApiPropertyOptional({ description: '질환 코드 (1~28) (선택)' })
  @IsString()
  @IsOptional()
  SM_TYPE?: string;  // 질환 코드 (1~28) (선택)

  @ApiPropertyOptional({ description: '페이지 번호 (선택)', default: '1' })
  @IsNumberString()
  @IsOptional()
  pageNo?: string;  // 페이지 번호 (선택)

  @ApiPropertyOptional({ description: '페이지당 건수 (선택)', default: '10' })
  @IsNumberString()
  @IsOptional()
  numOfRows?: string;  // 페이지당 건수 (선택)
}

export class SevereIllnessItemDto {
  @ApiProperty({ description: '일련번호' })
  rnum: number;  // 일련번호

  @ApiProperty({ description: '병원 ID' })
  hpid: string;  // 병원 ID

  @ApiProperty({ description: '병원 고유 ID' })
  phpid: string;  // 병원 고유 ID

  @ApiProperty({ description: '병원명' })
  dutyName: string;  // 병원명

  @ApiProperty({ description: '응급실 전화번호' })
  dutyTel3: string;  // 응급실 전화번호

  @ApiProperty({ description: '병원 주소' })
  dutyAddr: string;  // 병원 주소

  @ApiProperty({ description: '재관류중재술 심근경색 가능 여부 (Y/N)' })
  MKioskTy1: string;  // 재관류중재술 심근경색

  @ApiProperty({ description: '재관류중재술 뇌경색 가능 여부 (Y/N)' })
  MKioskTy2: string;  // 재관류중재술 뇌경색

  @ApiProperty({ description: '뇌출혈수술 거미막하출혈 가능 여부 (Y/N)' })
  MKioskTy3: string;  // 뇌출혈수술 거미막하출혈

  @ApiProperty({ description: '뇌출혈수술 거미막하출혈 외 가능 여부 (Y/N)' })
  MKioskTy4: string;  // 뇌출혈수술 거미막하출혈 외

  @ApiProperty({ description: '대동맥응급 흉부 가능 여부 (Y/N)' })
  MKioskTy5: string;  // 대동맥응급 흉부

  @ApiProperty({ description: '대동맥응급 복부 가능 여부 (Y/N)' })
  MKioskTy6: string;  // 대동맥응급 복부

  @ApiProperty({ description: '담낭담관질환 담낭질환 가능 여부 (Y/N)' })
  MKioskTy7: string;  // 담낭담관질환 담낭질환

  @ApiProperty({ description: '담낭담관질환 담도포함질환 가능 여부 (Y/N)' })
  MKioskTy8: string;  // 담낭담관질환 담도포함질환

  @ApiProperty({ description: '복부응급수술 비외상 가능 여부 (Y/N)' })
  MKioskTy9: string;  // 복부응급수술 비외상

  @ApiProperty({ description: '장중첩 폐색 영유아 가능 여부 (Y/N)' })
  MKioskTy10: string;  // 장중첩 폐색 영유아

  @ApiProperty({ description: '응급내시경 성인 위장관 가능 여부 (Y/N)' })
  MKioskTy11: string;  // 응급내시경 성인 위장관

  @ApiProperty({ description: '응급내시경 영유아 위장관 가능 여부 (Y/N)' })
  MKioskTy12: string;  // 응급내시경 영유아 위장관

  @ApiProperty({ description: '응급내시경 성인 기관지 가능 여부 (Y/N)' })
  MKioskTy13: string;  // 응급내시경 성인 기관지

  @ApiProperty({ description: '응급내시경 영유아 기관지 가능 여부 (Y/N)' })
  MKioskTy14: string;  // 응급내시경 영유아 기관지

  @ApiProperty({ description: '저체중출생아 집중치료 가능 여부 (Y/N)' })
  MKioskTy15: string;  // 저체중출생아 집중치료

  @ApiProperty({ description: '산부인과응급 분만 가능 여부 (Y/N)' })
  MKioskTy16: string;  // 산부인과응급 분만

  @ApiProperty({ description: '산부인과응급 산과수술 가능 여부 (Y/N)' })
  MKioskTy17: string;  // 산부인과응급 산과수술

  @ApiProperty({ description: '산부인과응급 부인과수술 가능 여부 (Y/N)' })
  MKioskTy18: string;  // 산부인과응급 부인과수술

  @ApiProperty({ description: '중증화상 전문치료 가능 여부 (Y/N)' })
  MKioskTy19: string;  // 중증화상 전문치료

  @ApiProperty({ description: '사지접합 수족지접합 가능 여부 (Y/N)' })
  MKioskTy20: string;  // 사지접합 수족지접합

  @ApiProperty({ description: '사지접합 수족지접합 외 가능 여부 (Y/N)' })
  MKioskTy21: string;  // 사지접합 수족지접합 외

  @ApiProperty({ description: 'HD 응급투석 가능 여부 (Y/N)' })
  MKioskTy22: string;  // HD 응급투석

  @ApiProperty({ description: 'CRRT 응급투석 가능 여부 (Y/N)' })
  MKioskTy23: string;  // CRRT 응급투석

  @ApiProperty({ description: '정신과적응급 폐쇄병동입원 가능 여부 (Y/N)' })
  MKioskTy24: string;  // 정신과적응급 폐쇄병동입원

  @ApiProperty({ description: '안과적수술 응급 가능 여부 (Y/N)' })
  MKioskTy25: string;  // 안과적수술 응급

  @ApiProperty({ description: '영상의학혈관중재 성인 가능 여부 (Y/N)' })
  MKioskTy26: string;  // 영상의학혈관중재 성인

  @ApiProperty({ description: '영상의학혈관중재 영유아 가능 여부 (Y/N)' })
  MKioskTy27: string;  // 영상의학혈관중재 영유아

  @ApiProperty({ description: '응급실(Emergency gate keeper) 가능 여부 (Y/N)' })
  MKioskTy28: string;  // 응급실(Emergency gate keeper)

  @ApiProperty({ description: '장중첩 폐색 영유아 가능연령' })
  MKioskTy10Msg: string;  // 장중첩 폐색 영유아 가능연령

  @ApiProperty({ description: '위장관 응급내시경 영유아 가능연령' })
  MKioskTy12Msg: string;  // 위장관 응급내시경 영유아 가능연령

  @ApiProperty({ description: '기관지 응급내시경 영유아 가능연령' })
  MKioskTy14Msg: string;  // 기관지 응급내시경 영유아 가능연령

  @ApiProperty({ description: '저체중 출생아 가능연령' })
  MKioskTy15Msg: string;  // 저체중 출생아 가능연령

  @ApiProperty({ description: '영상의학 혈관 중재적 시술 영유아 가능연령' })
  MKioskTy27Msg: string;  // 영상의학 혈관 중재적 시술 영유아 가능연령

  @ApiProperty({ description: '위도' })
  wgs84Lat: string;  // 위도

  @ApiProperty({ description: '경도' })
  wgs84Lon: string;  // 경도
}

export class SevereIllnessResponseDto {
  @ApiProperty({ description: '결과 코드' })
  resultCode: string;

  @ApiProperty({ description: '결과 메시지' })
  resultMsg: string;

  @ApiProperty({ description: '응답 데이터 목록', type: [SevereIllnessItemDto] })
  items: SevereIllnessItemDto[];

  @ApiProperty({ description: '페이지당 건수' })
  numOfRows: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  pageNo: number;

  @ApiProperty({ description: '전체 데이터 건수' })
  totalCount: number;
} 