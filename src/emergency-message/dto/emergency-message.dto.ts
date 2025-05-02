import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmergencyMessageRequestDto {
  @ApiPropertyOptional({ description: '기관ID' })
  @IsString()
  @IsOptional()
  HPID?: string;          // 기관ID

  @ApiPropertyOptional({ description: '기관명' })
  @IsString()
  @IsOptional()
  QN?: string;            // 기관명

  @ApiPropertyOptional({ description: '주소(시도)' })
  @IsString()
  @IsOptional()
  Q0?: string;            // 주소(시도)

  @ApiPropertyOptional({ description: '주소(시군구)' })
  @IsString()
  @IsOptional()
  Q1?: string;            // 주소(시군구)

  @ApiPropertyOptional({ description: '페이지 번호', default: 1 })
  @IsNumber()
  @IsOptional()
  pageNo?: number;        // 페이지 번호

  @ApiPropertyOptional({ description: '목록 건수', default: 10 })
  @IsNumber()
  @IsOptional()
  numOfRows?: number;     // 목록 건수
}

export class EmergencyMessageItemDto {
  @ApiProperty({ description: '일련번호' })
  rnum: string;           // 일련번호

  @ApiProperty({ description: '기관주소' })
  dutyAddr: string;       // 기관주소

  @ApiProperty({ description: '기관명' })
  dutyName: string;       // 기관명

  @ApiProperty({ description: '기관코드' })
  emcOrgCod: string;      // 기관코드

  @ApiProperty({ description: '기관코드' })
  hpid: string;           // 기관코드

  @ApiProperty({ description: '전달메시지' })
  symBlkMsg: string;      // 전달메시지

  @ApiProperty({ description: '메시지구분' })
  symBlkMsgTyp: string;   // 메시지구분

  @ApiProperty({ description: '중증질환구분' })
  symTypCod: string;      // 중증질환구분

  @ApiProperty({ description: '중증질환명' })
  symTypCodMag: string;   // 중증질환명

  @ApiProperty({ description: '중증질환 표출구분' })
  symOutDspYon: string;   // 중증질환 표출구분

  @ApiProperty({ description: '표출 차단구분' })
  symOutDspMth: string;   // 표출 차단구분

  @ApiProperty({ description: '차단시작일시' })
  symBlkSttDtm: string;   // 차단시작일시

  @ApiProperty({ description: '차단종료일시' })
  symBlkEndDtm: string;   // 차단종료일시
}

export class EmergencyMessageResponseDto {
  @ApiProperty({ description: '결과 코드' })
  resultCode: string;

  @ApiProperty({ description: '결과 메시지' })
  resultMsg: string;

  @ApiProperty({ description: '응답 데이터 목록', type: [EmergencyMessageItemDto] })
  items: EmergencyMessageItemDto[];

  @ApiProperty({ description: '페이지당 건수' })
  numOfRows: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  pageNo: number;

  @ApiProperty({ description: '전체 데이터 건수' })
  totalCount: number;
} 