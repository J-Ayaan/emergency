import { IsString, IsOptional, IsNumber } from 'class-validator';

export class EmergencyMessageRequestDto {
  @IsString()
  @IsOptional()
  HPID?: string;          // 기관ID

  @IsString()
  @IsOptional()
  QN?: string;            // 기관명

  @IsString()
  @IsOptional()
  Q0?: string;            // 주소(시도)

  @IsString()
  @IsOptional()
  Q1?: string;            // 주소(시군구)

  @IsNumber()
  @IsOptional()
  pageNo?: number;        // 페이지 번호

  @IsNumber()
  @IsOptional()
  numOfRows?: number;     // 목록 건수
}

export class EmergencyMessageResponseDto {
  resultCode: string;
  resultMsg: string;
  items: EmergencyMessageItemDto[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export class EmergencyMessageItemDto {
  rnum: string;           // 일련번호
  dutyAddr: string;       // 기관주소
  dutyName: string;       // 기관명
  emcOrgCod: string;      // 기관코드
  hpid: string;           // 기관코드
  symBlkMsg: string;      // 전달메시지
  symBlkMsgTyp: string;   // 메시지구분
  symTypCod: string;      // 중증질환구분
  symTypCodMag: string;   // 중증질환명
  symOutDspYon: string;   // 중증질환 표출구분
  symOutDspMth: string;   // 표출 차단구분
  symBlkSttDtm: string;   // 차단시작일시
  symBlkEndDtm: string;   // 차단종료일시
} 