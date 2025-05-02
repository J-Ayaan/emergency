import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EmergencyRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  rnum: string;           // 일련번호

  @Column({ length: 20 })
  hpid: string;           // 기관ID

  @Column({ length: 20 })
  phpid: string;          // 기관ID(OLD)

  @Column({ length: 10 })
  dutyEmcls: string;      // 응급의료기관분류

  @Column({ length: 50 })
  dutyEmclsName: string;  // 응급의료기관분류명

  @Column({ length: 200 })
  dutyAddr: string;       // 주소

  @Column({ length: 100 })
  dutyName: string;       // 기관명

  @Column({ length: 20 })
  dutyTel1: string;       // 대표전화1

  @Column({ length: 20 })
  dutyTel3: string;       // 응급실전화

  @Column({ length: 30 })
  wgs84Lon: string;       // 병원경도

  @Column({ length: 20 })
  wgs84Lat: string;       // 병원위도

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 