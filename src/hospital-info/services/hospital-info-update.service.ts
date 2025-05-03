import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalInfo } from '../entities/hospital-info.entity';
import axios from 'axios';

@Injectable()
export class HospitalInfoUpdateService {
    constructor(
        @InjectRepository(HospitalInfo)
        private readonly hospitalInfoRepository: Repository<HospitalInfo>,
    ) {}

    async updateHospitalBasicInfo(): Promise<void> {
        const hospitals = await this.hospitalInfoRepository.find({
            where: [
                { dutyName: null },
                { dutyTel3: null }
            ]
        });

        for (const hospital of hospitals) {
            if (!hospital.hpid) continue;

            try {
                const response = await axios.get(
                    `http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey=${process.env.PUBLIC_DATA_API_KEY}&HPID=${hospital.hpid}`
                );

                const hospitalData = response.data.response.body.items.item[0];
                
                await this.hospitalInfoRepository.update(
                    { id: hospital.id },
                    {
                        dutyName: hospitalData.dutyName,
                        dutyTel3: hospitalData.dutyTel3,
                        hvidate: hospitalData.hvidate
                    }
                );
            } catch (error) {
                console.error(`병원 정보 업데이트 실패 (hpid: ${hospital.hpid}):`, error);
            }
        }
    }
} 