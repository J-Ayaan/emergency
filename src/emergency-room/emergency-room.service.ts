import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EmergencyRoom } from './entities/emergency-room.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { EmergencyRoomRequestDto, EmergencyRoomResponseDto } from './dto/emergency-room.dto';

@Injectable()
export class EmergencyRoomService {
  private readonly baseUrl = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire';
  private readonly serviceKey: string;

  constructor(
    @InjectRepository(EmergencyRoom)
    private emergencyRoomRepository: Repository<EmergencyRoom>,
    private configService: ConfigService,
  ) {
    const key = this.configService.get<string>('PUBLIC_DATA_API_KEY');
    if (!key) {
      throw new Error('서비스 키가 설정되지 않았습니다.');
    }
    this.serviceKey = key;
  }

  async getEmergencyRoom(requestDto: EmergencyRoomRequestDto): Promise<EmergencyRoomResponseDto> {
    const defaultPageNo = 1;
    const defaultNumOfRows = 600;

    try {
      console.log('\n=== 응급의료기관 목록정보 API 호출 ===');
      console.log('요청 파라미터:', requestDto);

      // 기본 파라미터 설정
      const params = new URLSearchParams();
      params.append('serviceKey', this.serviceKey);
      params.append('pageNo', (requestDto.pageNo || defaultPageNo).toString());
      params.append('numOfRows', (requestDto.numOfRows || defaultNumOfRows).toString());

      const url = `${this.baseUrl}?${params.toString()}`;
      console.log('요청 URL:', url);

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/xml'
        }
      });
      
      console.log('\n=== API 응답 정보 ===');
      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', JSON.stringify(response.headers, null, 2));
      console.log('응답 데이터:', response.data);

      if (response.status !== 200) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const result = await this.parseXmlToJson(response.data);
      console.log('\n=== XML 파싱 결과 ===');
      console.log(JSON.stringify(result, null, 2));

      // API 오류 응답 처리
      if (result.OpenAPI_ServiceResponse?.cmmMsgHeader) {
        const errorMsg = result.OpenAPI_ServiceResponse.cmmMsgHeader.errMsg;
        const returnAuthMsg = result.OpenAPI_ServiceResponse.cmmMsgHeader.returnAuthMsg;
        throw new Error(`API 오류: ${errorMsg} (${returnAuthMsg})`);
      }

      if (!result.response) {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
      }

      const transformedData = this.transformResponse(result);
      console.log('\n=== 변환된 데이터 ===');
      console.log(JSON.stringify(transformedData, null, 2));

      await this.saveEmergencyRoomData(transformedData.items);
      return transformedData;
    } catch (error) {
      console.error('응급의료기관 목록정보 조회 중 오류 발생:', error);
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
      xml2js.parseString(xmlData, { 
        explicitArray: false,
        ignoreAttrs: true,
        trim: true,
        explicitRoot: true
      }, (err, result) => {
        if (err) {
          console.error('XML 파싱 오류:', err);
          reject(err);
        } else {
          console.log('XML 파싱 결과:', JSON.stringify(result, null, 2));
          resolve(result);
        }
      });
    });
  }

  private transformResponse(response: any): EmergencyRoomResponseDto {
    console.log('변환 전 응답:', JSON.stringify(response, null, 2));
    
    if (!response?.response?.header || !response?.response?.body) {
      throw new Error('API 응답 형식이 올바르지 않습니다.');
    }

    const header = response.response.header;
    const body = response.response.body;
    const items = body.items?.item || [];

    console.log('변환 후 items:', JSON.stringify(items, null, 2));

    if (!Array.isArray(items)) {
      console.error('items가 배열이 아닙니다:', items);
      return {
        resultCode: header.resultCode,
        resultMsg: header.resultMsg,
        items: [items].filter(Boolean),
        numOfRows: parseInt(body.numOfRows) || 0,
        pageNo: parseInt(body.pageNo) || 1,
        totalCount: parseInt(body.totalCount) || 0
      };
    }

    return {
      resultCode: header.resultCode,
      resultMsg: header.resultMsg,
      items: items.map(item => ({
        rnum: item.rnum || '',
        hpid: item.hpid || '',
        phpid: item.phpid || '',
        dutyEmcls: item.dutyEmcls || '',
        dutyEmclsName: item.dutyEmclsName || '',
        dutyAddr: item.dutyAddr || '',
        dutyName: item.dutyName || '',
        dutyTel1: item.dutyTel1 || '',
        dutyTel3: item.dutyTel3 || '',
        wgs84Lon: item.wgs84Lon || '',
        wgs84Lat: item.wgs84Lat || ''
      })),
      numOfRows: parseInt(body.numOfRows) || 0,
      pageNo: parseInt(body.pageNo) || 1,
      totalCount: parseInt(body.totalCount) || 0
    };
  }

  private async saveEmergencyRoomData(items: any[]) {
    try {
      console.log('=== 데이터베이스 저장 시작 ===');
      console.log('저장할 데이터 수:', items.length);

      const newHospitalIds = items.map(item => item.hpid);
      const existingRecords = await this.emergencyRoomRepository.find({
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
          await this.emergencyRoomRepository.update(existingRecord.id, {
            ...item,
            updatedAt: new Date()
          });
        } else {
          console.log(`병원 ID ${hpid} 새로 추가`);
          await this.emergencyRoomRepository.save({
            ...item,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      await Promise.all(savePromises);
      console.log('=== 데이터베이스 저장 완료 ===');
    } catch (error) {
      console.error('데이터베이스 저장 중 오류 발생:', error);
      throw error;
    }
  }

  async getEmergencyRoomsFromDb(Q0?: string, Q1?: string, pageNo: number = 1, numOfRows: number = 600) {
    try {
      const skip = (pageNo - 1) * numOfRows;
      const take = numOfRows;

      const queryBuilder = this.emergencyRoomRepository.createQueryBuilder('room');

      if (Q0) {
        queryBuilder.andWhere('room.dutyAddr LIKE :Q0', { Q0: `%${Q0}%` });
      }

      if (Q1) {
        queryBuilder.andWhere('room.dutyAddr LIKE :Q1', { Q1: `%${Q1}%` });
      }

      const [items, totalCount] = await queryBuilder
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return {
        resultCode: '00',
        resultMsg: 'NORMAL SERVICE.',
        items,
        numOfRows,
        pageNo,
        totalCount
      };
    } catch (error) {
      console.error('데이터베이스 조회 중 오류 발생:', error);
      throw error;
    }
  }

  async resetDatabase() {
    try {
      console.log('=== 데이터베이스 초기화 시작 ===');
      await this.emergencyRoomRepository.query('TRUNCATE TABLE emergency_room');
      await this.emergencyRoomRepository.query('ALTER TABLE emergency_room AUTO_INCREMENT = 1');
      console.log('=== 데이터베이스 초기화 완료 ===');
      return { message: '데이터베이스가 성공적으로 초기화되었습니다.' };
    } catch (error) {
      console.error('데이터베이스 초기화 중 오류 발생:', error);
      throw error;
    }
  }
} 