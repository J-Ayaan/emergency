import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyBed } from './entities/emergency-bed.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { EmergencyBedRequestDto, EmergencyBedResponseDto } from './dto/emergency-bed.dto';
import { In } from 'typeorm';

@Injectable()
export class EmergencyBedService {
  private readonly baseUrl = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire';
  private readonly serviceKey: string;

  constructor(
    @InjectRepository(EmergencyBed)
    private emergencyBedRepository: Repository<EmergencyBed>,
    private configService: ConfigService,
  ) {
    const key = this.configService.get<string>('PUBLIC_DATA_API_KEY');
    if (!key) {
      throw new Error('서비스 키가 설정되지 않았습니다.');
    }
    this.serviceKey = encodeURIComponent(key);
  }

  async getEmergencyBedInfo(requestDto: EmergencyBedRequestDto) {
    try {
      const defaultPageNo = 1;
      const defaultNumOfRows = 10;
      
      const url = `${this.baseUrl}?serviceKey=${this.serviceKey}&STAGE1=${encodeURIComponent(requestDto.STAGE1)}&STAGE2=${encodeURIComponent(requestDto.STAGE2)}&pageNo=${requestDto.pageNo || defaultPageNo}&numOfRows=${requestDto.numOfRows || defaultNumOfRows}`;
      
      console.log('=== 응급실 실시간 병상 정보 API 호출 ===');
      console.log('요청 URL:', url);
      console.log('요청 파라미터:', {
        ...requestDto,
        pageNo: requestDto.pageNo || defaultPageNo,
        numOfRows: requestDto.numOfRows || defaultNumOfRows
      });

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/xml'
        }
      });
      
      console.log('API 응답 상태:', response.status);
      console.log('API 응답 헤더:', response.headers);
      console.log('API 응답 데이터:', response.data);

      if (response.status !== 200) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const result = await this.parseXmlToJson(response.data);
      console.log('XML 파싱 결과:', result);

      // API 오류 응답 처리
      if (result.OpenAPI_ServiceResponse?.cmmMsgHeader) {
        const errorMsg = result.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg?.[0];
        const returnAuthMsg = result.OpenAPI_ServiceResponse.cmmMsgHeader[0].returnAuthMsg?.[0];
        throw new Error(`API 오류: ${errorMsg} (${returnAuthMsg})`);
      }

      if (!result.response) {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
      }

      const transformedData = this.transformResponse(result.response);
      console.log('변환된 데이터:', transformedData);

      await this.saveEmergencyBedData(transformedData.items);
      return transformedData;
    } catch (error) {
      console.error('응급실 실시간 병상 정보 조회 중 오류 발생:', error);
      if (error.response) {
        console.error('API 응답 오류:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
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

  private transformResponse(response: any): EmergencyBedResponseDto {
    const header = response.header[0];
    const body = response.body[0];
    const items = body.items[0]?.item || [];

    return {
      resultCode: header.resultCode[0],
      resultMsg: header.resultMsg[0],
      items: items.map(item => ({
        dutyName: item.dutyName?.[0] || '',
        hpid: item.hpid?.[0] || '',
        dutyTel3: item.dutyTel3?.[0] || '',
        hvidate: item.hvidate?.[0] || '',
        hvec: item.hvec?.[0] || '0',
        hvoc: item.hvoc?.[0] || '0',
        hvcc: item.hvcc?.[0] || '0',
        hvncc: item.hvncc?.[0] || '0',
        hvccc: item.hvccc?.[0] || '0',
        hvicc: item.hvicc?.[0] || '0',
        hvgc: item.hvgc?.[0] || '0',
        hvctayn: item.hvctayn?.[0] === 'Y',
        hvmriayn: item.hvmriayn?.[0] === 'Y',
        hvangioayn: item.hvangioayn?.[0] === 'Y',
        hvventiayn: item.hvventiayn?.[0] === 'Y',
        hvventisoayn: item.hvventisoayn?.[0] === 'Y',
        hvincuayn: item.hvincuayn?.[0] === 'Y',
        hvcrrtayn: item.hvcrrtayn?.[0] === 'Y',
        hvecmoayn: item.hvecmoayn?.[0] === 'Y',
        hvoxyayn: item.hvoxyayn?.[0] === 'Y',
        hvhypoayn: item.hvhypoayn?.[0] === 'Y',
        hvamyn: item.hvamyn?.[0] === 'Y',
        hvdnm: item.hvdnm?.[0] || 'none',
        hv1: item.hv1?.[0] || 'none',
        hv12: item.hv12?.[0] || 'none',
        hv2: item.hv2?.[0] || '0',
        hv3: item.hv3?.[0] || '0',
        hv4: item.hv4?.[0] || '0',
        hv5: item.hv5?.[0] === 'Y',
        hv6: item.hv6?.[0] || '0',
        hv7: item.hv7?.[0] === 'Y',
        hv8: item.hv8?.[0] || '0',
        hv9: item.hv9?.[0] || '0',
        hv10: item.hv10?.[0] === 'Y',
        hv11: item.hv11?.[0] === 'Y',
        hv13: item.hv13?.[0] || '0',
        hv14: item.hv14?.[0] || '0',
        hv15: item.hv15?.[0] || '0',
        hv16: item.hv16?.[0] || '0',
        hv17: item.hv17?.[0] || '0',
        hv18: item.hv18?.[0] || '0',
        hv19: item.hv19?.[0] || '0',
        hv21: item.hv21?.[0] || '0',
        hv22: item.hv22?.[0] || '0',
        hv23: item.hv23?.[0] || '0',
        hv24: item.hv24?.[0] || '0',
        hv25: item.hv25?.[0] || '0',
        hv26: item.hv26?.[0] || '0',
        hv27: item.hv27?.[0] || '0',
        hv28: item.hv28?.[0] || '0',
        hv29: item.hv29?.[0] || '0',
        hv30: item.hv30?.[0] || '0',
        hv31: item.hv31?.[0] || '0',
        hv32: item.hv32?.[0] || '0',
        hv33: item.hv33?.[0] || '0',
        hv34: item.hv34?.[0] || '0',
        hv35: item.hv35?.[0] || '0',
        hv36: item.hv36?.[0] || '0',
        hv37: item.hv37?.[0] || '0',
        hv38: item.hv38?.[0] || '0',
        hv39: item.hv39?.[0] || '0',
        hv40: item.hv40?.[0] || '0',
        hv41: item.hv41?.[0] || '0',
        hv42: item.hv42?.[0] === 'Y',
        hv43: item.hv43?.[0] || '0',
        hv60: item.hv60?.[0] || '0',
        hv61: item.hv61?.[0] || '0',
        hvs01: item.hvs01?.[0] || '0',
        hvs02: item.hvs02?.[0] || '0',
        hvs03: item.hvs03?.[0] || '0',
        hvs04: item.hvs04?.[0] || '0',
        hvs05: item.hvs05?.[0] || '0',
        hvs06: item.hvs06?.[0] || '0',
        hvs07: item.hvs07?.[0] || '0',
        hvs08: item.hvs08?.[0] || '0',
        hvs09: item.hvs09?.[0] || '0',
        hvs10: item.hvs10?.[0] || '0',
        hvs11: item.hvs11?.[0] || '0',
        hvs12: item.hvs12?.[0] || '0',
        hvs13: item.hvs13?.[0] || '0',
        hvs14: item.hvs14?.[0] || '0',
        hvs15: item.hvs15?.[0] || '0',
        hvs16: item.hvs16?.[0] || '0',
        hvs17: item.hvs17?.[0] || '0',
        hvs18: item.hvs18?.[0] || '0',
        hvs19: item.hvs19?.[0] || '0',
        hvs20: item.hvs20?.[0] || '0',
        hvs21: item.hvs21?.[0] || '0',
        hvs22: item.hvs22?.[0] || '0',
        hvs23: item.hvs23?.[0] || '0',
        hvs24: item.hvs24?.[0] || '0',
        hvs25: item.hvs25?.[0] || '0',
        hvs26: item.hvs26?.[0] || '0',
        hvs27: item.hvs27?.[0] || '0',
        hvs28: item.hvs28?.[0] || '0',
        hvs29: item.hvs29?.[0] || '0',
        hvs30: item.hvs30?.[0] || '0',
        hvs31: item.hvs31?.[0] || '0',
        hvs32: item.hvs32?.[0] || '0',
        hvs33: item.hvs33?.[0] || '0',
        hvs34: item.hvs34?.[0] || '0',
        hvs35: item.hvs35?.[0] || '0',
        hvs36: item.hvs36?.[0] || '0',
        hvs37: item.hvs37?.[0] || '0',
        hvs38: item.hvs38?.[0] || '0',
        hvs46: item.hvs46?.[0] || '0',
        hvs47: item.hvs47?.[0] || '0',
        hvs48: item.hvs48?.[0] || '0',
        hvs49: item.hvs49?.[0] || '0',
        hvs50: item.hvs50?.[0] || '0',
        hvs51: item.hvs51?.[0] || '0',
        hvs52: item.hvs52?.[0] || '0',
        hvs53: item.hvs53?.[0] || '0',
        hvs54: item.hvs54?.[0] || '0',
        hvs55: item.hvs55?.[0] || '0',
        hvs56: item.hvs56?.[0] || '0',
        hvs57: item.hvs57?.[0] || '0',
        hvs58: item.hvs58?.[0] || '0',
        hvs59: item.hvs59?.[0] || '0',
        hvs60: item.hvs60?.[0] || '0',
        hvs61: item.hvs61?.[0] || '0'
      })),
      numOfRows: parseInt(body.numOfRows[0]),
      pageNo: parseInt(body.pageNo[0]),
      totalCount: parseInt(body.totalCount[0])
    };
  }

  private async saveEmergencyBedData(items: any[]) {
    try {
      console.log('=== 데이터베이스 저장 시작 ===');
      console.log('저장할 데이터 수:', items.length);

      const newHospitalIds = items.map(item => item.hpid);
      const existingRecords = await this.emergencyBedRepository.find({
        where: {
          hpid: In(newHospitalIds)
        }
      });

      console.log('기존 레코드 수:', existingRecords.length);

      const savePromises = items.map(async (item) => {
        const hpid = item.hpid;
        const existingRecord = existingRecords.find(record => record.hpid === hpid);
        
        if (existingRecord) {
          console.log(`병원 ID ${hpid} 업데이트`);
          await this.emergencyBedRepository.update(existingRecord.id, item);
        } else {
          console.log(`병원 ID ${hpid} 새로 추가`);
          await this.emergencyBedRepository.save(item);
        }
      });

      await Promise.all(savePromises);
      console.log('=== 데이터베이스 저장 완료 ===');
    } catch (error) {
      console.error('데이터베이스 저장 중 오류 발생:', error);
      throw error;
    }
  }

  async getEmergencyBedsFromDb() {
    try {
      const records = await this.emergencyBedRepository.find();
      console.log('데이터베이스에서 조회된 레코드 수:', records.length);
      return records;
    } catch (error) {
      console.error('데이터베이스 조회 중 오류 발생:', error);
      throw error;
    }
  }

  async resetDatabase() {
    try {
      console.log('=== 데이터베이스 초기화 시작 ===');
      // 테이블을 TRUNCATE하여 모든 데이터를 삭제하고 ID를 1부터 다시 시작
      await this.emergencyBedRepository.query('TRUNCATE TABLE emergency_bed');
      console.log('=== 데이터베이스 초기화 완료 ===');
      return { message: '데이터베이스가 성공적으로 초기화되었습니다.' };
    } catch (error) {
      console.error('데이터베이스 초기화 중 오류 발생:', error);
      throw error;
    }
  }
} 