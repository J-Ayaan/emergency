import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyMessageService } from './emergency-message.service';
import { EmergencyMessageRequestDto, EmergencyMessageResponseDto } from './dto/emergency-message.dto';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('응급실 및 중증질환 메시지')
@Controller('emergency-message')
export class EmergencyMessageController {
  constructor(private readonly emergencyMessageService: EmergencyMessageService) {}

  @Get()
  @ApiOperation({
    summary: '응급실 메시지 조회',
    description: '응급실의 현재 상태와 관련된 메시지를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '응급실 메시지 조회 성공',
    type: EmergencyMessageResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 파라미터',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류',
  })
  @ApiQuery({ name: 'HPID', required: false, description: '기관ID' })
  @ApiQuery({ name: 'QN', required: false, description: '기관명' })
  @ApiQuery({ name: 'Q0', required: false, description: '주소(시도)', example: '충청남도' })
  @ApiQuery({ name: 'Q1', required: false, description: '주소(시군구)', example: '천안시' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: 'number' })
  @ApiQuery({ name: 'numOfRows', required: false, description: '목록 건수', type: 'number' })
  async getEmergencyMessage(
    @Query('HPID') HPID?: string,
    @Query('QN') QN?: string,
    @Query('Q0') Q0?: string,
    @Query('Q1') Q1?: string,
    @Query('pageNo') pageNo?: number,
    @Query('numOfRows') numOfRows?: number,
  ): Promise<EmergencyMessageResponseDto> {
    const requestDto = new EmergencyMessageRequestDto();
    requestDto.HPID = HPID;
    requestDto.QN = QN;
    requestDto.Q0 = Q0;
    requestDto.Q1 = Q1;
    requestDto.pageNo = pageNo;
    requestDto.numOfRows = numOfRows;

    return this.emergencyMessageService.getEmergencyMessage(requestDto);
  }

  @Get('db')
  @ApiOperation({ summary: '데이터베이스에서 응급실 및 중증질환 메시지 조회', description: '데이터베이스에 저장된 응급실 및 중증질환 메시지를 조회합니다.' })
  @ApiQuery({ name: 'Q0', required: false, description: '주소(시도)' })
  @ApiQuery({ name: 'Q1', required: false, description: '주소(시군구)' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: Number })
  @ApiQuery({ name: 'numOfRows', required: false, description: '목록 건수', type: Number })
  async getEmergencyMessagesFromDb(
    @Query('Q0') Q0?: string,
    @Query('Q1') Q1?: string,
    @Query('pageNo') pageNo?: number,
    @Query('numOfRows') numOfRows?: number,
  ) {
    return this.emergencyMessageService.getEmergencyMessagesFromDb(Q0, Q1, pageNo, numOfRows);
  }

  @Get('reset')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: '데이터베이스 초기화', description: '응급실 및 중증질환 메시지 데이터베이스를 초기화합니다.' })
  async resetDatabase() {
    return this.emergencyMessageService.resetDatabase();
  }
} 