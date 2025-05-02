import { Controller, Get, Query } from '@nestjs/common';
import { EmergencyBedService } from './emergency-bed.service';
import { EmergencyBedRequestDto } from './dto/emergency-bed.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('응급실 실시간 가용병상정보')
@Controller('emergency-bed')
export class EmergencyBedController {
  constructor(private readonly emergencyBedService: EmergencyBedService) {}

  @Get()
  @ApiOperation({ summary: '응급실 실시간 가용병상정보 조회' })
  @ApiQuery({ name: 'STAGE1', required: true, description: '주소 시도' })
  @ApiQuery({ name: 'STAGE2', required: true, description: '주소 시군구' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: 'number' })
  @ApiQuery({ name: 'numOfRows', required: false, description: '페이지당 건수', type: 'number' })
  @ApiResponse({ status: 200, description: '성공적으로 데이터를 조회했습니다.' })
  async getEmergencyBedInfo(
    @Query('STAGE1') STAGE1: string,
    @Query('STAGE2') STAGE2: string,
    @Query('pageNo') pageNo?: string,
    @Query('numOfRows') numOfRows?: string,
  ) {
    const params: EmergencyBedRequestDto = {
      STAGE1,
      STAGE2,
      pageNo: pageNo ? parseInt(pageNo) : undefined,
      numOfRows: numOfRows ? parseInt(numOfRows) : undefined,
    };
    return await this.emergencyBedService.getEmergencyBedInfo(params);
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