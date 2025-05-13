import { Controller, Get } from '@nestjs/common';
import { HospitalStatusService } from '../services/hospital-status.service';
import { ApiTags, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { HospitalStatusResponseDto } from '../dto/hospital-status.dto';

@ApiTags('병원 현황')
@Controller('hospital-status')
export class HospitalStatusController {
  constructor(private readonly hospitalStatusService: HospitalStatusService) {}

  @Get()
  @ApiOperation({ 
    summary: '최신 병원 현황 조회',
    description: '가장 최근에 업데이트된 병원 현황 정보를 조회합니다. 병원 수, 활성 병원 수, 병상 현황, 중증질환 수용 현황, 구급차 현황 등의 정보를 포함합니다.'
  })
  @ApiResponse({ 
    status: 200, 
    description: '병원 현황 조회 성공',
    type: HospitalStatusResponseDto 
  })
  async getLatestStatus() {
    return await this.hospitalStatusService.getLatestStatus();
  }

  @Get('update')
  @ApiExcludeEndpoint()
  @ApiOperation({ 
    summary: '병원 현황 수동 업데이트',
    description: '병원 현황 정보를 수동으로 업데이트합니다. 현재 데이터를 기반으로 병원 현황을 새로 계산하고 저장합니다.'
  })
  @ApiResponse({ 
    status: 200, 
    description: '병원 현황 업데이트 성공',
    type: HospitalStatusResponseDto 
  })
  async updateStatus() {
    return await this.hospitalStatusService.updateHospitalStatus();
  }
} 