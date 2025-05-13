import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyRoomService } from './emergency-room.service';
import { EmergencyRoomRequestDto, EmergencyRoomResponseDto } from './dto/emergency-room.dto';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('응급실 정보')
@Controller('emergency-room')
export class EmergencyRoomController {
  constructor(private readonly emergencyRoomService: EmergencyRoomService) {}

  @Get()
  @ApiOperation({
    summary: '응급실 정보 조회',
    description: '지역별 응급실의 기본 정보와 위치 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '응급실 정보 조회 성공',
    type: EmergencyRoomResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 파라미터',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류',
  })
  @ApiQuery({ name: 'Q0', required: false, description: '주소(시도)' })
  @ApiQuery({ name: 'Q1', required: false, description: '주소(시군구)' })
  @ApiQuery({ name: 'QT', required: false, description: '진료요일' })
  @ApiQuery({ name: 'QZ', required: false, description: '기관분류' })
  @ApiQuery({ name: 'QD', required: false, description: '진료과목' })
  @ApiQuery({ name: 'QN', required: false, description: '기관명' })
  @ApiQuery({ name: 'ORD', required: false, description: '순서' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: 'number' })
  @ApiQuery({ name: 'numOfRows', required: false, description: '목록 건수', type: 'number' })
  async getEmergencyRoom(
    @Query('Q0') Q0?: string,
    @Query('Q1') Q1?: string,
    @Query('QT') QT?: string,
    @Query('QZ') QZ?: string,
    @Query('QD') QD?: string,
    @Query('QN') QN?: string,
    @Query('ORD') ORD?: string,
    @Query('pageNo') pageNo?: number,
    @Query('numOfRows') numOfRows?: number,
  ): Promise<EmergencyRoomResponseDto> {
    const requestDto = new EmergencyRoomRequestDto();
    requestDto.Q0 = Q0;
    requestDto.Q1 = Q1;
    requestDto.QT = QT;
    requestDto.QZ = QZ;
    requestDto.QD = QD;
    requestDto.QN = QN;
    requestDto.ORD = ORD;
    requestDto.pageNo = pageNo;
    requestDto.numOfRows = numOfRows;

    return this.emergencyRoomService.getEmergencyRoom(requestDto);
  }

  @Get('db')
  @ApiOperation({ summary: '데이터베이스에서 응급의료기관 목록정보 조회', description: '데이터베이스에 저장된 응급의료기관 목록정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '응급의료기관 목록정보 조회 성공' })
  @ApiQuery({ name: 'Q0', required: false, description: '주소(시도)' })
  @ApiQuery({ name: 'Q1', required: false, description: '주소(시군구)' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: Number })
  @ApiQuery({ name: 'numOfRows', required: false, description: '목록 건수', type: Number })
  async getEmergencyRoomsFromDb(
    @Query('Q0') Q0?: string,
    @Query('Q1') Q1?: string,
    @Query('pageNo') pageNo?: number,
    @Query('numOfRows') numOfRows?: number,
  ) {
    return this.emergencyRoomService.getEmergencyRoomsFromDb(Q0, Q1, pageNo, numOfRows);
  }

  @Get('hpid-list')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'HPID 목록 조회', description: '데이터베이스에 저장된 응급의료기관의 HPID 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: 'HPID 목록 조회 성공' })
  async getHpidList() {
    return this.emergencyRoomService.getHpidList();
  }

  @Get('reset')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: '데이터베이스 초기화', description: '응급의료기관 목록정보 데이터베이스를 초기화합니다.' })
  @ApiResponse({ status: 200, description: '응급의료기관 목록정보 초기화 성공' })
  async resetDatabase() {
    return this.emergencyRoomService.resetDatabase();
  }
} 