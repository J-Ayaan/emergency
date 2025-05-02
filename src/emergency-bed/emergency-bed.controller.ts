import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyBedService } from './emergency-bed.service';
import { EmergencyBedRequestDto, EmergencyBedResponseDto } from './dto/emergency-bed.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('응급실 실시간 가용병상정보')
@Controller('emergency-bed')
export class EmergencyBedController {
  constructor(private readonly emergencyBedService: EmergencyBedService) {}

  @Get()
  @ApiOperation({
    summary: '응급실 병상 정보 조회',
    description: '지역별 응급실의 병상 정보와 장비 가용 여부를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '응급실 병상 정보 조회 성공',
    type: EmergencyBedResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 파라미터',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류',
  })
  async getEmergencyBed(@Query() query: EmergencyBedRequestDto): Promise<EmergencyBedResponseDto> {
    return this.emergencyBedService.getEmergencyBedInfo(query);
  }

  @Get('db')
  @ApiOperation({ summary: '데이터베이스에서 응급실 실시간 가용병상정보 조회' })
  @ApiResponse({ status: 200, description: '성공적으로 데이터를 조회했습니다.' })
  async getEmergencyBedsFromDb() {
    return await this.emergencyBedService.getEmergencyBedsFromDb();
  }

  @Get('reset')
  @ApiOperation({ summary: '데이터베이스 초기화' })
  @ApiResponse({ status: 200, description: '데이터베이스가 성공적으로 초기화되었습니다.' })
  async resetDatabase() {
    return await this.emergencyBedService.resetDatabase();
  }
} 