import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchedulerService } from './scheduler.service';

@ApiTags('스케줄러')
@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get('run')
  @ApiOperation({ summary: '스케줄링 작업 수동 실행', description: '스케줄링된 작업을 수동으로 실행합니다.' })
  @ApiResponse({ status: 200, description: '작업이 성공적으로 실행되었습니다.' })
  async runScheduledTask() {
    return await this.schedulerService.handleCron();
  }
} 