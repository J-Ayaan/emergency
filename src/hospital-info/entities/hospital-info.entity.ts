import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { EmergencyMessage } from '../../emergency-message/entities/emergency-message.entity';

@Entity()
export class HospitalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  hpid: string;  // 병원 ID

  // EmergencyBed 정보
  @Column({ nullable: true })
  dutyName: string;  // 병원명

  @Column({ nullable: true })
  dutyTel3: string;  // 응급실 전화번호

  @Column({ nullable: true })
  hvidate: string;  // 데이터 갱신 일시

  // 병상 관련 필드
  @Column({ length: 3 })
  hvec: string;  // 일반병상

  @Column({ length: 4 })
  hvoc: string;  // 수술실 병상

  @Column({ length: 4 })
  hvcc: string;  // 중환자실 - 신경과

  @Column({ length: 4 })
  hvncc: string;  // 중환자실 - 신생아

  @Column({ length: 4 })
  hvccc: string;  // 중환자실 - 흉부외과

  @Column({ length: 4 })
  hvicc: string;  // 중환자실 - 일반

  @Column({ length: 4 })
  hvgc: string;  // 입원실 - 일반

  // 응급 장비 및 특수 시설 가용 여부
  @Column()
  hvctayn: boolean;  // CT 사용 가능 여부

  @Column()
  hvmriayn: boolean;  // MRI 사용 가능 여부

  @Column()
  hvangioayn: boolean;  // 혈관촬영기 가능 여부

  @Column()
  hvventiayn: boolean;  // 인공호흡기 가능 여부

  @Column()
  hvventisoayn: boolean;  // 인공호흡기 (조산아용) 가능 여부

  @Column()
  hvincuayn: boolean;  // 인큐베이터 가능 여부

  @Column()
  hvcrrtayn: boolean;  // CRRT 가능 여부

  @Column()
  hvecmoayn: boolean;  // ECMO 사용 가능 여부

  @Column()
  hvoxyayn: boolean;  // 고압산소치료기 가능 여부

  @Column()
  hvhypoayn: boolean;  // 중심체온조절유도기 가능 여부

  @Column()
  hvamyn: boolean;  // 구급차 보유 여부

  // SevereIllness 정보
  @Column({ default: 0 })
  MKioskTy1: boolean;  // 재관류중재술 – 심근경색

  @Column({ default: 0 })
  MKioskTy2: boolean;  // 재관류중재술 – 뇌경색

  @Column({ default: 0 })
  MKioskTy3: boolean;  // 뇌출혈수술 – 거미막하출혈

  @Column({ default: 0 })
  MKioskTy4: boolean;  // 뇌출혈수술 – 거미막하출혈 외

  @Column({ default: 0 })
  MKioskTy5: boolean;  // 대동맥응급 – 흉부

  @Column({ default: 0 })
  MKioskTy6: boolean;  // 대동맥응급 – 복부

  @Column({ default: 0 })
  MKioskTy7: boolean;  // 담낭담관질환 – 담낭질환

  @Column({ default: 0 })
  MKioskTy8: boolean;  // 담낭담관질환 – 담도 포함 질환

  @Column({ default: 0 })
  MKioskTy9: boolean;  // 복부응급수술 – 비외상

  @Column({ default: 0 })
  MKioskTy10: boolean;  // 장중첩 폐색 – 영유아

  @Column({ default: 0 })
  MKioskTy11: boolean;  // 응급내시경 – 성인 위장관

  @Column({ default: 0 })
  MKioskTy12: boolean;  // 응급내시경 – 영유아 위장관

  @Column({ default: 0 })
  MKioskTy13: boolean;  // 응급내시경 – 성인 기관지

  @Column({ default: 0 })
  MKioskTy14: boolean;  // 응급내시경 – 영유아 기관지

  @Column({ default: 0 })
  MKioskTy15: boolean;  // 저체중출생아 – 집중치료

  @Column({ default: 0 })
  MKioskTy16: boolean;  // 산부인과응급 – 분만

  @Column({ default: 0 })
  MKioskTy17: boolean;  // 산부인과응급 – 산과수술

  @Column({ default: 0 })
  MKioskTy18: boolean;  // 산부인과응급 – 부인과수술

  @Column({ default: 0 })
  MKioskTy19: boolean;  // 중증화상 – 전문치료

  @Column({ default: 0 })
  MKioskTy20: boolean;  // 사지접합 – 수족지접합

  @Column({ default: 0 })
  MKioskTy21: boolean;

  @Column({ default: 0 })
  MKioskTy22: boolean;  // 응급투석 – HD

  @Column({ default: 0 })
  MKioskTy23: boolean;  // 응급투석 – CRRT

  @Column({ default: 0 })
  MKioskTy24: boolean;  // 정신과적응급 – 폐쇄병동 입원

  @Column({ default: 0 })
  MKioskTy25: boolean;  // 안과적 수술 – 응급

  @Column({ default: 0 })
  MKioskTy26: boolean;  // 영상의학 혈관중재술 – 성인

  @Column({ default: 0 })
  MKioskTy27: boolean;  // 영상의학 혈관중재술 – 영유아

  @Column({ default: 0 })
  MKioskTy28: boolean;  // 응급실(Emergency gate keeper)

  // SevereIllness 메시지 정보
  @Column({ length: 100, nullable: true })
  MKioskTy10Msg: string;  // 장중첩 폐색 영유아 가능연령

  @Column({ length: 100, nullable: true })
  MKioskTy12Msg: string;  // 위장관 응급내시경 영유아 가능연령

  @Column({ length: 100, nullable: true })
  MKioskTy14Msg: string;  // 기관지 응급내시경 영유아 가능연령

  @Column({ length: 100, nullable: true })
  MKioskTy15Msg: string;  // 저체중 출생아 가능연령

  @Column({ length: 100, nullable: true })
  MKioskTy27Msg: string;  // 영상의학 혈관 중재적 시술 영유아 가능연령

  // EmergencyMessage 정보 (단일 필드)
  @Column({ length: 20, nullable: true })
  emcOrgCod: string;

  // 메시지 배열을 JSON 형태로 저장
  @OneToMany(() => EmergencyMessage, message => message.hospitalInfo)
  messages: EmergencyMessage[];

  @Column({ length: 30, nullable: true })
  wgs84Lon: string;       // 병원경도

  @Column({ length: 20, nullable: true })
  wgs84Lat: string;       // 병원위도

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 