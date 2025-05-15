import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { HospitalInfo } from '../../hospital-info/entities/hospital-info.entity';

@Entity()
export class EmergencyMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  rnum: string;           // 일련번호

  @Column({ length: 20 })
  hpid: string;           // 기관코드

  @Column({ length: 20 })
  emcOrgCod: string;      // 응급의료기관코드

  @Column({ length: 100 })
  dutyName: string;       // 기관명

  @Column({ length: 200 })
  dutyAddr: string;       // 기관주소

  @Column({ length: 200 })
  symBlkMsg: string;      // 전달메시지

  @Column({ length: 10 })
  symBlkMsgTyp: string;   // 메시지구분 (응급, 중증)

  @Column({ length: 20 })
  symTypCod: string;      // 중증질환구분

  @Column({ length: 100 })
  symTypCodMag: string;   // 중증질환명

  @Column({ length: 10 })
  symOutDspYon: string;   // 중증질환 표출구분 (차단, 해제)

  @Column({ length: 10 })
  symOutDspMth: string;   // 표출 차단구분 (자동, 수동)

  @Column({ length: 14 })
  symBlkSttDtm: string;   // 차단시작일시

  @Column({ length: 14 })
  symBlkEndDtm: string;   // 차단종료일시

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => HospitalInfo, hospitalInfo => hospitalInfo.messages)
  @JoinColumn({ name: 'hpid', referencedColumnName: 'hpid' })
  hospitalInfo: HospitalInfo;
} 