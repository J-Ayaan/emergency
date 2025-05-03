import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HospitalInfoService } from './hospital-info.service';
import { HospitalInfoUpdateService } from './services/hospital-info-update.service';

@ApiTags('통합 병원 정보')
@Controller('hospital-info')
export class HospitalInfoController {
  constructor(
    private readonly hospitalInfoService: HospitalInfoService,
    private readonly hospitalInfoUpdateService: HospitalInfoUpdateService,
  ) {}

  @Get('update')
  @ApiOperation({ summary: '통합 데이터 업데이트', description: '모든 병원의 통합 정보를 업데이트합니다.' })
  @ApiResponse({ status: 200, description: '통합 데이터가 성공적으로 업데이트되었습니다.' })
  async updateIntegratedData() {
    return await this.hospitalInfoService.updateIntegratedData();
  }

  // @Get(':hpid')
  // @ApiOperation({ summary: '특정 병원 정보 조회', description: 'hpid를 기준으로 특정 병원의 통합 정보를 조회합니다.' })
  // @ApiResponse({ status: 200, description: '병원 정보 조회 성공' })
  // async getHospitalInfo(@Param('hpid') hpid: string) {
  //   return await this.hospitalInfoService.getHospitalInfo(hpid);
  // }

  @Get()
  @ApiOperation({ summary: '모든 병원 정보 조회', description: '모든 병원의 통합 정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '모든 병원 정보 조회 성공' })
  async getAllHospitalInfo() {
    return await this.hospitalInfoService.getAllHospitalInfo();
  }

  // @Get('reset')
  // @ApiOperation({ summary: '통합 데이터베이스 초기화', description: '통합 데이터베이스를 초기화합니다.' })
  // @ApiResponse({ status: 200, description: '통합 데이터베이스가 성공적으로 초기화되었습니다.' })
  // async resetDatabase() {
  //   return await this.hospitalInfoService.resetDatabase();
  // }
} 