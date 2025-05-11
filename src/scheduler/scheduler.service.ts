import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HospitalInfoService } from '../hospital-info/hospital-info.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly hospitalInfoService: HospitalInfoService,
  ) {}

  @Cron('*/30 * * * *')
  async handleCron() {
    this.logger.debug('스케줄링된 작업이 실행되었습니다.');
    
    try {
      const baseUrl = 'http://localhost:3000';
      const region = {
        STAGE1: '충청남도',
        STAGE2: '천안시'
      };

      // 응급실 병상 정보 조회
      const emergencyBedResponse = await firstValueFrom(
        this.httpService.get(`${baseUrl}/emergency-bed`, {
          params: {
            ...region,
            pageNo: 1,
            numOfRows: 10
          }
        })
      );
      this.logger.debug('응급실 병상 정보 조회 성공');

      // 중증질환 정보 조회
      const severeIllnessResponse = await firstValueFrom(
        this.httpService.get(`${baseUrl}/severe-illness`, {
          params: {
            ...region,
            SM_TYPE: 1,
            pageNo: 1,
            numOfRows: 10
          }
        })
      );
      this.logger.debug('중증질환 정보 조회 성공');

      // 응급실 메시지 조회
      const emergencyMessageResponse = await firstValueFrom(
        this.httpService.get(`${baseUrl}/emergency-message`, {
          params: {
            Q0: region.STAGE1,
            Q1: region.STAGE2
          }
        })
      );
      this.logger.debug('응급실 메시지 조회 성공');

      // 데이터 수집이 완료된 후 통합 데이터 업데이트
      this.logger.debug('통합 데이터 업데이트 시작');
      await this.hospitalInfoService.updateIntegratedData();
      this.logger.debug('통합 데이터 업데이트 완료');

      return { message: '데이터 수집 및 통합이 성공적으로 완료되었습니다.' };
    } catch (error) {
      this.logger.error('작업 실행 중 오류 발생:', error.message);
      throw error;
    }
  }
} 