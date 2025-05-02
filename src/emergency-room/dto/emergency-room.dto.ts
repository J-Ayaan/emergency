import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmergencyRoomRequestDto {
  @ApiPropertyOptional({ description: '주소(시도)' })
  @IsString()
  @IsOptional()
  Q0?: string;            // 주소(시도)

  @ApiPropertyOptional({ description: '주소(시군구)' })
  @IsString()
  @IsOptional()
  Q1?: string;            // 주소(시군구)

  @ApiPropertyOptional({ description: '진료요일' })
  @IsString()
  @IsOptional()
  QT?: string;            // 진료요일

  @ApiPropertyOptional({ description: '기관분류' })
  @IsString()
  @IsOptional()
  QZ?: string;            // 기관분류

  @ApiPropertyOptional({ description: '진료과목' })
  @IsString()
  @IsOptional()
  QD?: string;            // 진료과목

  @ApiPropertyOptional({ description: '기관명' })
  @IsString()
  @IsOptional()
  QN?: string;            // 기관명

  @ApiPropertyOptional({ description: '순서' })
  @IsString()
  @IsOptional()
  ORD?: string;           // 순서

  @ApiPropertyOptional({ description: '페이지 번호', default: 1 })
  @IsNumber()
  @IsOptional()
  pageNo?: number;        // 페이지 번호

  @ApiPropertyOptional({ description: '목록 건수', default: 10 })
  @IsNumber()
  @IsOptional()
  numOfRows?: number;     // 목록 건수
}

export class EmergencyRoomItemDto {
  @ApiProperty({ description: '일련번호' })
  rnum: string;           // 일련번호

  @ApiProperty({ description: '기관ID' })
  hpid: string;           // 기관ID

  @ApiProperty({ description: '기관ID(OLD)' })
  phpid: string;          // 기관ID(OLD)

  @ApiProperty({ description: '응급의료기관분류' })
  dutyEmcls: string;      // 응급의료기관분류

  @ApiProperty({ description: '응급의료기관분류명' })
  dutyEmclsName: string;  // 응급의료기관분류명

  @ApiProperty({ description: '주소' })
  dutyAddr: string;       // 주소

  @ApiProperty({ description: '기관명' })
  dutyName: string;       // 기관명

  @ApiProperty({ description: '대표전화1' })
  dutyTel1: string;       // 대표전화1

  @ApiProperty({ description: '응급실전화' })
  dutyTel3: string;       // 응급실전화

  @ApiProperty({ description: '병원경도' })
  wgs84Lon: string;       // 병원경도

  @ApiProperty({ description: '병원위도' })
  wgs84Lat: string;       // 병원위도
}

export class EmergencyRoomResponseDto {
  @ApiProperty({ description: '결과 코드' })
  resultCode: string;

  @ApiProperty({ description: '결과 메시지' })
  resultMsg: string;

  @ApiProperty({ description: '응답 데이터 목록', type: [EmergencyRoomItemDto] })
  items: EmergencyRoomItemDto[];

  @ApiProperty({ description: '페이지당 건수' })
  numOfRows: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  pageNo: number;

  @ApiProperty({ description: '전체 데이터 건수' })
  totalCount: number;
} 