import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SevereIllnessService } from './severe-illness.service';
import { SevereIllnessRequestDto, SevereIllnessResponseDto } from './dto/severe-illness.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('중증질환 수용 가능 병원 정보')
@Controller('severe-illness')
export class SevereIllnessController {
  constructor(private readonly severeIllnessService: SevereIllnessService) {}

  @Get()
  @ApiOperation({
    summary: '중증질환자 수용 가능 병원 정보 조회',
    description: '지역별 중증질환자 수용 가능 병원의 정보와 치료 가능 질환을 조회합니다.',
  })
  @ApiQuery({ name: 'STAGE1', description: '시/도', example: '충청남도' })
  @ApiQuery({ name: 'STAGE2', description: '시/군/구', example: '천안시' })
  @ApiQuery({ name: 'SM_TYPE', description: '중증질환 유형', required: false, example: '1' })
  @ApiQuery({ name: 'pageNo', description: '페이지 번호', required: false, example: '1' })
  @ApiQuery({ name: 'numOfRows', description: '페이지당 결과 수', required: false, example: '10' })
  @ApiResponse({
    status: 200,
    description: '중증질환자 수용 가능 병원 정보 조회 성공',
    type: SevereIllnessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 파라미터',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류',
  })
  async getSevereIllnessInfo(
    @Query(new ValidationPipe()) query: SevereIllnessRequestDto,
  ): Promise<SevereIllnessResponseDto> {
    return await this.severeIllnessService.getSevereIllnessInfo(query);
  }

  // @Get('test')
  // @ApiExcludeEndpoint()
  // async testSevereIllnessApi() {
  //   const result = await this.severeIllnessService.testSevereIllnessApi();
  //   return this.convertToKoreanTime(result);
  // }

  // @Get('list')
  // @ApiExcludeEndpoint()
  // async getSevereIllnesses() {
  //   const result = await this.severeIllnessService.getSevereIllnesses();
  //   return this.convertToKoreanTime(result);
  // }

  @Get('db')
  @ApiOperation({ summary: '데이터베이스에 저장된 중증질환 수용 가능 병원 정보 조회' })
  @ApiResponse({ status: 200, description: '성공적으로 데이터를 조회했습니다.' })
  async getSevereIllnessesFromDb() {
    const records = await this.severeIllnessService.getSevereIllnessesFromDb();
    return this.convertToKoreanTime(records);
  }

  @Get('reset')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: '데이터베이스 초기화' })
  @ApiResponse({ status: 200, description: '데이터베이스가 성공적으로 초기화되었습니다.' })
  async resetDatabase() {
    return await this.severeIllnessService.resetDatabase();
  }

  private convertToKoreanTime(data: any): any {
    if (!data) return data;

    const convertDate = (date: Date) => {
      if (!date) return date;
      return new Date(date.getTime() + (9 * 60 * 60 * 1000));
    };

    const processObject = (obj: any) => {
      if (!obj) return obj;
      
      const newObj = { ...obj };
      if (newObj.createdAt) {
        newObj.createdAt = convertDate(new Date(newObj.createdAt));
      }
      if (newObj.updatedAt) {
        newObj.updatedAt = convertDate(new Date(newObj.updatedAt));
      }
      return newObj;
    };

    if (Array.isArray(data)) {
      return data.map(item => processObject(item));
    }
    
    if (data.items) {
      return {
        ...data,
        items: data.items.map((item: any) => processObject(item))
      };
    }

    return processObject(data);
  }
} 