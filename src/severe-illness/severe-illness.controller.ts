import { Controller, Get, Query } from '@nestjs/common';
import { SevereIllnessService } from './severe-illness.service';
import { SevereIllnessRequestDto } from './dto/severe-illness.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('중증질환 수용 가능 병원 정보')
@Controller('severe-illness')
export class SevereIllnessController {
  constructor(private readonly severeIllnessService: SevereIllnessService) {}

  @Get()
  @ApiOperation({ summary: '중증질환 수용 가능 병원 정보 조회' })
  @ApiQuery({ name: 'STAGE1', required: true, description: '주소 시도' })
  @ApiQuery({ name: 'STAGE2', required: true, description: '주소 시군구' })
  @ApiQuery({ name: 'SM_TYPE', required: false, description: '질환 코드 (1~28)' })
  @ApiQuery({ name: 'pageNo', required: false, description: '페이지 번호', type: 'number' })
  @ApiQuery({ name: 'numOfRows', required: false, description: '페이지당 건수', type: 'number' })
  @ApiResponse({ status: 200, description: '성공적으로 데이터를 조회했습니다.' })
  async getSevereIllnessInfo(
    @Query('STAGE1') STAGE1: string,
    @Query('STAGE2') STAGE2: string,
    @Query('SM_TYPE') SM_TYPE?: string,
    @Query('pageNo') pageNo?: string,
    @Query('numOfRows') numOfRows?: string,
  ) {
    const params: SevereIllnessRequestDto = {
      STAGE1,
      STAGE2,
      SM_TYPE,
      pageNo: pageNo ? Number(pageNo) : undefined,
      numOfRows: numOfRows ? Number(numOfRows) : undefined,
    };
    const result = await this.severeIllnessService.getSevereIllnessInfo(params);
    return this.convertToKoreanTime(result);
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