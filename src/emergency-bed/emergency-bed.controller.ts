import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { EmergencyBedService } from './emergency-bed.service';
import { EmergencyBedRequestDto, EmergencyBedResponseDto } from './dto/emergency-bed.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('응급실 실시간 가용병상정보')
@Controller('emergency-bed')
export class EmergencyBedController {
  constructor(private readonly emergencyBedService: EmergencyBedService) {}

  @Get()
  @ApiOperation({ 
    summary: '응급실 실시간 가용병상정보 조회',
    description: '지역별 응급실의 실시간 가용병상 정보를 조회합니다.'
  })
  @ApiQuery({ name: 'STAGE1', description: '시/도', example: '충청남도' })
  @ApiQuery({ name: 'STAGE2', description: '시/군/구', example: '천안시' })
  @ApiQuery({ name: 'pageNo', description: '페이지 번호', required: false, example: '1' })
  @ApiQuery({ name: 'numOfRows', description: '페이지당 결과 수', required: false, example: '10' })
  @ApiResponse({ 
    status: 200, 
    description: '응급실 실시간 가용병상정보 조회 성공',
    schema: {
      example: {
        result: {
          response: {
            header: {
              resultCode: "00",
              resultMsg: "NORMAL SERVICE."
            },
            body: {
              items: {
                item: [
                  {
                    hpid: "A0000001",
                    dutyName: "서울대학교병원",
                    dutyAddr: "서울특별시 종로구 대학로 101",
                    dutyTel1: "02-2072-0000",
                    hvec: 10,
                    hvoc: 5,
                    hvcc: 2,
                    hvncc: 1,
                    hvccc: 0,
                    hvicc: 0,
                    hvgc: 0,
                    dutyEmcls: "1",
                    dutyEmclsName: "응급실",
                    dutyEct: "1",
                    dutyEctName: "응급실",
                    MKioskTy25: "Y",
                    MKioskTy1: "Y",
                    MKioskTy2: "Y",
                    MKioskTy3: "Y",
                    MKioskTy4: "Y",
                    MKioskTy5: "Y",
                    MKioskTy6: "Y",
                    MKioskTy7: "Y",
                    MKioskTy8: "Y",
                    MKioskTy9: "Y",
                    MKioskTy10: "Y",
                    MKioskTy11: "Y"
                  }
                ]
              },
              numOfRows: 10,
              pageNo: 1,
              totalCount: 1
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: '잘못된 요청',
    schema: {
      example: {
        statusCode: 400,
        message: ['STAGE1 must be a string'],
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({ 
    status: 500, 
    description: '서버 오류',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error'
      }
    }
  })
  async getEmergencyBedInfo(
    @Query(new ValidationPipe()) query: EmergencyBedRequestDto,
  ) {
    return this.emergencyBedService.getEmergencyBedInfo(query);
  }

  @Get('db')
  @ApiOperation({ summary: '데이터베이스에서 응급실 실시간 가용병상정보 조회' })
  @ApiResponse({ status: 200, description: '성공적으로 데이터를 조회했습니다.' })
  async getEmergencyBedsFromDb() {
    return await this.emergencyBedService.getEmergencyBedsFromDb();
  }

  @Get('reset')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: '데이터베이스 초기화' })
  @ApiResponse({ status: 200, description: '데이터베이스가 성공적으로 초기화되었습니다.' })
  async resetDatabase() {
    return await this.emergencyBedService.resetDatabase();
  }
} 