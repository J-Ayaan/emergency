import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EmergencyMessage } from './entities/emergency-message.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { EmergencyMessageRequestDto, EmergencyMessageResponseDto } from './dto/emergency-message.dto';

@Injectable()
export class EmergencyMessageService {
  private readonly baseUrl = 'http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmSrsillDissMsgInqire';
  private readonly serviceKey: string;

  constructor(
    @InjectRepository(EmergencyMessage)
    private emergencyMessageRepository: Repository<EmergencyMessage>,
    private configService: ConfigService,
  ) {
    const key = this.configService.get<string>('PUBLIC_DATA_API_KEY');
    if (!key) {
      throw new Error('서비스 키가 설정되지 않았습니다.');
    }
    this.serviceKey = encodeURIComponent(key);
  }

  async getEmergencyMessage(requestDto: EmergencyMessageRequestDto) {
    const defaultPageNo = 1;
    const defaultNumOfRows = 100;

    const url = `${this.baseUrl}?serviceKey=${this.serviceKey}&HPID=${encodeURIComponent(requestDto.HPID || '')}&QN=${encodeURIComponent(requestDto.QN || '')}&Q0=${encodeURIComponent(requestDto.Q0 || '')}&Q1=${encodeURIComponent(requestDto.Q1 || '')}&pageNo=${requestDto.pageNo || defaultPageNo}&numOfRows=${requestDto.numOfRows || defaultNumOfRows}`;

    try {
      console.log('\n=== 응급실 및 중증질환 메시지 API 호출 ===');
      console.log('요청 URL:', url);
      console.log('요청 파라미터:', {
        HPID: requestDto.HPID || '',
        QN: requestDto.QN || '',
        Q0: requestDto.Q0 || '',
        Q1: requestDto.Q1 || '',
        pageNo: requestDto.pageNo || defaultPageNo,
        numOfRows: requestDto.numOfRows || defaultNumOfRows
      });

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
        const errorMsg = result.OpenAPI_ServiceResponse.cmmMsgHeader[0].errMsg?.[0];
        const returnAuthMsg = result.OpenAPI_ServiceResponse.cmmMsgHeader[0].returnAuthMsg?.[0];
        throw new Error(`API 오류: ${errorMsg} (${returnAuthMsg})`);
      }

      if (!result.response) {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
      }

      const transformedData = this.transformResponse(result.response);
      console.log('\n=== 변환된 데이터 ===');
      console.log(JSON.stringify(transformedData, null, 2));

      await this.saveEmergencyMessageData(transformedData.items);
      return transformedData;
    } catch (error) {
      console.error('응급실 및 중증질환 메시지 조회 중 오류 발생:', error);
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

  private transformResponse(response: any): EmergencyMessageResponseDto {
    const header = response.header[0];
    const body = response.body[0];
    const items = body.items[0]?.item || [];

    return {
      resultCode: header.resultCode[0],
      resultMsg: header.resultMsg[0],
      items: items.map(item => ({
        rnum: item.rnum?.[0] || '',
        dutyAddr: item.dutyAddr?.[0] || '',
        dutyName: item.dutyName?.[0] || '',
        emcOrgCod: item.emcOrgCod?.[0] || '',
        hpid: item.hpid?.[0] || '',
        symBlkMsg: item.symBlkMsg?.[0] || '',
        symBlkMsgTyp: item.symBlkMsgTyp?.[0] || '',
        symTypCod: item.symTypCod?.[0] || '',
        symTypCodMag: item.symTypCodMag?.[0] || '',
        symOutDspYon: item.symOutDspYon?.[0] || '',
        symOutDspMth: item.symOutDspMth?.[0] || '',
        symBlkSttDtm: item.symBlkSttDtm?.[0] || '',
        symBlkEndDtm: item.symBlkEndDtm?.[0] || ''
      })),
      numOfRows: parseInt(body.numOfRows[0]),
      pageNo: parseInt(body.pageNo[0]),
      totalCount: parseInt(body.totalCount[0])
    };
  }

  private async saveEmergencyMessageData(items: any[]) {
    try {
      console.log('=== 데이터베이스 저장 시작 ===');
      console.log('저장할 데이터 수:', items.length);

      const newHospitalIds = items.map(item => item.hpid);
      const existingRecords = await this.emergencyMessageRepository.find({
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
          await this.emergencyMessageRepository.update(existingRecord.id, {
            ...item,
            updatedAt: new Date()
          });
        } else {
          console.log(`병원 ID ${hpid} 새로 추가`);
          await this.emergencyMessageRepository.save({
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

  async getEmergencyMessagesFromDb(Q0?: string, Q1?: string, pageNo: number = 1, numOfRows: number = 100) {
    try {
      const skip = (pageNo - 1) * numOfRows;
      const take = numOfRows;

      const queryBuilder = this.emergencyMessageRepository.createQueryBuilder('message');

      if (Q0) {
        queryBuilder.andWhere('message.dutyAddr LIKE :Q0', { Q0: `%${Q0}%` });
      }

      if (Q1) {
        queryBuilder.andWhere('message.dutyAddr LIKE :Q1', { Q1: `%${Q1}%` });
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
      await this.emergencyMessageRepository.query('TRUNCATE TABLE emergency_message');
      await this.emergencyMessageRepository.query('ALTER TABLE emergency_message AUTO_INCREMENT = 1');
      console.log('=== 데이터베이스 초기화 완료 ===');
      return { message: '데이터베이스가 성공적으로 초기화되었습니다.' };
    } catch (error) {
      console.error('데이터베이스 초기화 중 오류 발생:', error);
      throw error;
    }
  }
} 