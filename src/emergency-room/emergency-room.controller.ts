import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyRoomService } from './emergency-room.service';
import { EmergencyRoomRequestDto } from './dto/emergency-room.dto';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmergencyRoomResponseDto } from './dto/emergency-room.dto';

@ApiTags('응급의료기관 목록정보')
@Controller('emergency-room')
export class EmergencyRoomController {
  constructor(private readonly emergencyRoomService: EmergencyRoomService) {}

  @Get()
  @ApiOperation({ summary: '응급의료기관 목록정보 조회', description: '지역별 응급의료기관 목록정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '응급의료기관 목록정보 조회 성공' })
  @ApiQuery({ name: 'Q0', required: false, description: '주소(시도)' })
  @ApiQuery({ name: 'Q1', required: false, description: '주소(시군구)' })
  @ApiQuery({ name: 'QT', required: false, description: '진료요일' })
  @ApiQuery({ name: 'QZ', required: false, description: '기관분류' })
  @ApiQuery({ name: 'QD', required: false, description: '진료과목' })
  @ApiQuery({ name: 'QN', required: false, description: '기관명' })
  @ApiQuery({ name: 'ORD', required: false, description: '순서' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: Number })
  @ApiQuery({ name: 'numOfRows', required: false, description: '목록 건수', type: Number })
  async getEmergencyRoom(
    @Query('Q0') Q0?: string,
    @Query('Q1') Q1?: string,
    @Query('pageNo') pageNo?: number,
    @Query('numOfRows') numOfRows?: number
  ): Promise<EmergencyRoomResponseDto> {
    const requestDto = new EmergencyRoomRequestDto();
    requestDto.Q0 = Q0;
    requestDto.Q1 = Q1;
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

  @Get('reset')
  @ApiOperation({ summary: '데이터베이스 초기화', description: '응급의료기관 목록정보 데이터베이스를 초기화합니다.' })
  @ApiResponse({ status: 200, description: '응급의료기관 목록정보 초기화 성공' })
  async resetDatabase() {
    return this.emergencyRoomService.resetDatabase();
  }
} 