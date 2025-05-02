import { IsString, IsOptional, IsNumber } from 'class-validator';

export class EmergencyRoomRequestDto {
  @IsString()
  @IsOptional()
  Q0?: string;            // 주소(시도)

  @IsString()
  @IsOptional()
  Q1?: string;            // 주소(시군구)

  @IsString()
  @IsOptional()
  QT?: string;            // 진료요일

  @IsString()
  @IsOptional()
  QZ?: string;            // 기관분류

  @IsString()
  @IsOptional()
  QD?: string;            // 진료과목

  @IsString()
  @IsOptional()
  QN?: string;            // 기관명

  @IsString()
  @IsOptional()
  ORD?: string;           // 순서

  @IsNumber()
  @IsOptional()
  pageNo?: number;        // 페이지 번호

  @IsNumber()
  @IsOptional()
  numOfRows?: number;     // 목록 건수
}

export class EmergencyRoomResponseDto {
  resultCode: string;
  resultMsg: string;
  items: EmergencyRoomItemDto[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export class EmergencyRoomItemDto {
  rnum: string;           // 일련번호
  hpid: string;           // 기관ID
  phpid: string;          // 기관ID(OLD)
  dutyEmcls: string;      // 응급의료기관분류
  dutyEmclsName: string;  // 응급의료기관분류명
  dutyAddr: string;       // 주소
  dutyName: string;       // 기관명
  dutyTel1: string;       // 대표전화1
  dutyTel3: string;       // 응급실전화
  wgs84Lon: string;       // 병원경도
  wgs84Lat: string;       // 병원위도
} 