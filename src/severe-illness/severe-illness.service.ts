import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SevereIllness } from './entities/severe-illness.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { SevereIllnessRequestDto, SevereIllnessResponseDto } from './dto/severe-illness.dto';
import { In } from 'typeorm';

@Injectable()
export class SevereIllnessService {
  private readonly baseUrl = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService';
  
  constructor(
    @InjectRepository(SevereIllness)
    private readonly severeIllnessRepository: Repository<SevereIllness>,
    private configService: ConfigService
  ) {}

  async getSevereIllnessInfo(query: SevereIllnessRequestDto): Promise<SevereIllnessResponseDto> {
    try {
      const { STAGE1, STAGE2, SM_TYPE, pageNo = '1', numOfRows = '10' } = query;
      const serviceKey = this.configService.get<string>('PUBLIC_DATA_API_KEY');
      
      if (!serviceKey) {
        throw new Error('PUBLIC_DATA_API_KEY가 설정되지 않았습니다.');
      }

      console.log('=== API 요청 정보 ===');
      console.log('서비스 키:', serviceKey);
      console.log('요청 파라미터:', { STAGE1, STAGE2, SM_TYPE, pageNo, numOfRows });

      const url = `${this.baseUrl}/getSrsillDissAceptncPosblInfoInqire`;
      const params = new URLSearchParams();
      params.append('serviceKey', serviceKey);
      params.append('STAGE1', STAGE1);
      params.append('STAGE2', STAGE2);
      if (SM_TYPE) params.append('SM_TYPE', SM_TYPE);
      params.append('pageNo', pageNo);
      params.append('numOfRows', numOfRows);

      const fullUrl = `${url}?${params.toString()}`;
      console.log('요청 URL:', fullUrl);

      const response = await axios.get(fullUrl, {
        headers: {
          'Accept': 'application/xml'
        }
      });

      console.log('=== API 응답 정보 ===');
      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', JSON.stringify(response.headers, null, 2));
      console.log('응답 데이터:', response.data);

      const result = await xml2js.parseStringPromise(response.data);
      console.log('=== XML 파싱 결과 ===');
      console.log(JSON.stringify(result, null, 2));

      // 데이터베이스에 저장
      if (result.response?.body?.[0]?.items?.[0]?.item) {
        await this.saveSevereIllnessData(result.response.body[0].items[0].item);
      }
      
      return this.transformResponse(result);
    } catch (error) {
      console.error('Error fetching severe illness info:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      throw error;
    }
  }

  private async parseXmlToJson(xmlData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private transformResponse(data: any): SevereIllnessResponseDto {
    try {
      const response = data.response;
      const header = response.header[0];
      const body = response.body[0];
      
      // items가 없거나 비어있는 경우 처리
      if (!body.items?.[0]?.item) {
        return {
          resultCode: header.resultCode[0],
          resultMsg: header.resultMsg[0],
          items: [],
          numOfRows: parseInt(body.numOfRows[0]),
          pageNo: parseInt(body.pageNo[0]),
          totalCount: parseInt(body.totalCount[0]),
        };
      }

      const items = body.items[0].item;
      
      return {
        resultCode: header.resultCode[0],
        resultMsg: header.resultMsg[0],
        items: items.map(item => ({
          rnum: parseInt(item.rnum?.[0] || '0'),
          hpid: item.hpid?.[0] || '',
          phpid: item.phpid?.[0] || '',
          dutyName: item.dutyName?.[0] || '',
          dutyTel3: item.dutyTel3?.[0] || '',
          dutyAddr: item.dutyAddr?.[0] || '',
          wgs84Lat: item.wgs84Lat?.[0] || '',
          wgs84Lon: item.wgs84Lon?.[0] || '',
          MKioskTy1: item.MKioskTy1?.[0] || '',
          MKioskTy2: item.MKioskTy2?.[0] || '',
          MKioskTy3: item.MKioskTy3?.[0] || '',
          MKioskTy4: item.MKioskTy4?.[0] || '',
          MKioskTy5: item.MKioskTy5?.[0] || '',
          MKioskTy6: item.MKioskTy6?.[0] || '',
          MKioskTy7: item.MKioskTy7?.[0] || '',
          MKioskTy8: item.MKioskTy8?.[0] || '',
          MKioskTy9: item.MKioskTy9?.[0] || '',
          MKioskTy10: item.MKioskTy10?.[0] || '',
          MKioskTy11: item.MKioskTy11?.[0] || '',
          MKioskTy12: item.MKioskTy12?.[0] || '',
          MKioskTy13: item.MKioskTy13?.[0] || '',
          MKioskTy14: item.MKioskTy14?.[0] || '',
          MKioskTy15: item.MKioskTy15?.[0] || '',
          MKioskTy16: item.MKioskTy16?.[0] || '',
          MKioskTy17: item.MKioskTy17?.[0] || '',
          MKioskTy18: item.MKioskTy18?.[0] || '',
          MKioskTy19: item.MKioskTy19?.[0] || '',
          MKioskTy20: item.MKioskTy20?.[0] || '',
          MKioskTy21: item.MKioskTy21?.[0] || '',
          MKioskTy22: item.MKioskTy22?.[0] || '',
          MKioskTy23: item.MKioskTy23?.[0] || '',
          MKioskTy24: item.MKioskTy24?.[0] || '',
          MKioskTy25: item.MKioskTy25?.[0] || '',
          MKioskTy26: item.MKioskTy26?.[0] || '',
          MKioskTy27: item.MKioskTy27?.[0] || '',
          MKioskTy28: item.MKioskTy28?.[0] || '',
          MKioskTy10Msg: item.MKioskTy10Msg?.[0] || '',
          MKioskTy12Msg: item.MKioskTy12Msg?.[0] || '',
          MKioskTy14Msg: item.MKioskTy14Msg?.[0] || '',
          MKioskTy15Msg: item.MKioskTy15Msg?.[0] || '',
          MKioskTy27Msg: item.MKioskTy27Msg?.[0] || ''
        })),
        numOfRows: parseInt(body.numOfRows[0]),
        pageNo: parseInt(body.pageNo[0]),
        totalCount: parseInt(body.totalCount[0]),
      };
    } catch (error) {
      console.error('Error transforming response:', error);
      throw error;
    }
  }

  private async saveSevereIllnessData(items: any[]) {
    try {
      console.log('=== 데이터베이스 저장 시작 ===');
      console.log('저장할 데이터 수:', items.length);

      if (!Array.isArray(items) || items.length === 0) {
        console.log('저장할 데이터가 없습니다.');
        return;
      }

      // 새로운 데이터의 병원 ID 목록
      const newHospitalIds = items.map(item => item.hpid?.[0]).filter(id => id);
      console.log(`새로운 데이터의 병원 수: ${newHospitalIds.length}개`);

      if (newHospitalIds.length === 0) {
        console.log('유효한 병원 ID가 없습니다.');
        return;
      }

      // 기존 데이터 조회
      const existingRecords = await this.severeIllnessRepository.find({
        where: {
          hpid: In(newHospitalIds)
        }
      });
      console.log(`기존 데이터 수: ${existingRecords.length}개`);

      const severeIllnesses = items.map(item => {
        const severeIllness = new SevereIllness();
        
        // 필수 필드 검증
        const hpid = item.hpid?.[0];
        if (!hpid) {
          console.log('경고: 병원 ID가 없는 데이터가 발견되었습니다:', item);
          return null;
        }

        // 기존 데이터에서 해당 hpid의 레코드 찾기
        const existingRecord = existingRecords.find(record => record.hpid === hpid);
        if (existingRecord) {
          severeIllness.id = existingRecord.id; // 기존 ID 유지
          severeIllness.createdAt = existingRecord.createdAt; // 생성 시간 유지
          severeIllness.updatedAt = new Date(); // 업데이트 시간 갱신
        }

        severeIllness.hpid = hpid;
        severeIllness.phpid = item.phpid?.[0] || '';
        severeIllness.dutyName = item.dutyName?.[0] || '';
        severeIllness.dutyTel3 = item.dutyTel3?.[0] || '';
        severeIllness.dutyAddr = item.dutyAddr?.[0] || '';
        
        // 중증질환 수용 가능 여부 (Y만 true, 나머지는 모두 false)
        const convertToBoolean = (value: string) => {
          if (!value) return false;
          return value.trim().toUpperCase() === 'Y';
        };

        // MKioskTy1 ~ MKioskTy28까지 모두 처리
        for (let i = 1; i <= 28; i++) {
          const key = `MKioskTy${i}`;
          severeIllness[key] = convertToBoolean(item[key]?.[0]);
        }

        // 추가 메시지 정보 저장
        severeIllness.MKioskTy10Msg = item.MKioskTy10Msg?.[0] || '';
        severeIllness.MKioskTy12Msg = item.MKioskTy12Msg?.[0] || '';
        severeIllness.MKioskTy14Msg = item.MKioskTy14Msg?.[0] || '';
        severeIllness.MKioskTy15Msg = item.MKioskTy15Msg?.[0] || '';
        severeIllness.MKioskTy27Msg = item.MKioskTy27Msg?.[0] || '';

        // 위도, 경도 정보
        severeIllness.latitude = item.wgs84Lat?.[0] || '';
        severeIllness.longitude = item.wgs84Lon?.[0] || '';

        return severeIllness;
      }).filter(item => item !== null);

      // 유효한 데이터만 저장
      if (severeIllnesses.length > 0) {
        const savedData = await this.severeIllnessRepository.save(severeIllnesses);
        console.log(`데이터베이스 저장 완료: ${savedData.length}개 레코드 (${existingRecords.length}개 업데이트, ${savedData.length - existingRecords.length}개 신규)`);
      } else {
        console.log('저장할 유효한 데이터가 없습니다.');
      }

      console.log('=== 데이터베이스 저장 완료 ===');
    } catch (error) {
      console.error('데이터베이스 저장 오류:', error);
      throw error;
    }
  }

  // async getSevereIllnesses() {
  //   return await this.severeIllnessRepository.find({
  //     order: {
  //       dutyName: 'ASC',
  //     },
  //   });
  // }

  async getSevereIllnessesFromDb() {
    const records = await this.severeIllnessRepository.find();
    
    // 시간을 한국 시간으로 변환
    const koreaRecords = records.map(record => ({
      ...record,
      createdAt: new Date(record.createdAt.getTime() + (9 * 60 * 60 * 1000)),
      updatedAt: new Date(record.updatedAt.getTime() + (9 * 60 * 60 * 1000))
    }));
    
    console.log(`데이터베이스에서 ${koreaRecords.length}개 레코드 조회됨 (${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })})`);
    return koreaRecords;
  }

  // async testSevereIllnessApi() {
  //   try {
  //     const serviceKey = this.configService.get<string>('PUBLIC_DATA_API_KEY');
  //     const url = `${this.baseUrl}/getSrsillDissAceptncPosblInfoInqire`;
      
  //     console.log('Service Key:', serviceKey);
  //     console.log('URL:', url);
  //     console.log('Request time:', new Date().toISOString());

  //     const response = await axios.get(url, {
  //       params: {
  //         serviceKey,
  //         STAGE1: '충청남도',
  //         STAGE2: '천안시',
  //         pageNo: 1,
  //         numOfRows: 10,
  //       },
  //       headers: {
  //         Accept: 'application/xml',
  //       },
  //     });

  //     console.log('Raw Response:', response.data);
  //     console.log('Response time:', new Date().toISOString());
      
  //     // XML을 JSON으로 변환
  //     const jsonData = await this.parseXmlToJson(response.data);
  //     console.log('Parsed JSON:', JSON.stringify(jsonData, null, 2));

  //     if (!jsonData.response || !jsonData.response.body || !jsonData.response.body[0].items) {
  //       throw new Error('Invalid response format');
  //     }

  //     const items = jsonData.response.body[0].items[0].item;
  //     console.log('Items:', JSON.stringify(items, null, 2));
      
  //     // 데이터베이스에 저장
  //     await this.saveSevereIllnessData(items);
      
  //     return jsonData;
  //   } catch (error) {
  //     console.error('API Error:', error.message);
  //     if (error.response) {
  //       console.error('Error Response:', error.response.data);
  //     }
  //     throw error;
  //   }
  // }

  async resetDatabase() {
    try {
      console.log('=== 데이터베이스 초기화 시작 ===');
      console.log('초기화 시작 시각:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));

      // 모든 데이터 삭제
      const deleteResult = await this.severeIllnessRepository.clear();
      console.log('데이터베이스 초기화 완료');

      console.log('초기화 완료 시각:', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      console.log('=== 데이터베이스 초기화 완료 ===');

      return { message: '데이터베이스가 성공적으로 초기화되었습니다.' };
    } catch (error) {
      console.error('데이터베이스 초기화 오류:', error);
      throw error;
    }
  }
} 