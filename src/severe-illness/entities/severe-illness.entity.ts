import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SevereIllness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hpid: string;  // 병원 ID

  @Column()
  phpid: string;  // 병원 고유 ID

  @Column()
  dutyName: string;  // 병원명

  @Column()
  dutyTel3: string;  // 응급실 전화번호

  @Column()
  dutyAddr: string;  // 병원 주소

  @Column()
  MKioskTy1: boolean;  // 재관류중재술 – 심근경색

  @Column()
  MKioskTy2: boolean;  // 재관류중재술 – 뇌경색

  @Column()
  MKioskTy3: boolean;  // 뇌출혈수술 – 거미막하출혈

  @Column()
  MKioskTy4: boolean;  // 뇌출혈수술 – 거미막하출혈 외

  @Column()
  MKioskTy5: boolean;  // 대동맥응급 – 흉부

  @Column()
  MKioskTy6: boolean;  // 대동맥응급 – 복부

  @Column()
  MKioskTy7: boolean;  // 담낭담관질환 – 담낭질환

  @Column()
  MKioskTy8: boolean;  // 담낭담관질환 – 담도 포함 질환

  @Column()
  MKioskTy9: boolean;  // 복부응급수술 – 비외상

  @Column()
  MKioskTy10: boolean;  // 장중첩 폐색 – 영유아

  @Column()
  MKioskTy11: boolean;  // 응급내시경 – 성인 위장관

  @Column()
  MKioskTy12: boolean;  // 응급내시경 – 영유아 위장관

  @Column()
  MKioskTy13: boolean;  // 응급내시경 – 성인 기관지

  @Column()
  MKioskTy14: boolean;  // 응급내시경 – 영유아 기관지

  @Column()
  MKioskTy15: boolean;  // 저체중출생아 – 집중치료

  @Column()
  MKioskTy16: boolean;  // 산부인과응급 – 분만

  @Column()
  MKioskTy17: boolean;  // 산부인과응급 – 산과수술

  @Column()
  MKioskTy18: boolean;  // 산부인과응급 – 부인과수술

  @Column()
  MKioskTy19: boolean;  // 중증화상 – 전문치료

  @Column()
  MKioskTy20: boolean;  // 사지접합 – 수족지접합

  @Column()
  MKioskTy21: boolean;  // 사지접합 – 수족지접합 외

  @Column()
  MKioskTy22: boolean;  // 응급투석 – HD

  @Column()
  MKioskTy23: boolean;  // 응급투석 – CRRT

  @Column()
  MKioskTy24: boolean;  // 정신과적응급 – 폐쇄병동 입원

  @Column()
  MKioskTy25: boolean;  // 안과적 수술 – 응급

  @Column()
  MKioskTy26: boolean;  // 영상의학 혈관중재술 – 성인

  @Column()
  MKioskTy27: boolean;  // 영상의학 혈관중재술 – 영유아

  @Column()
  MKioskTy28: boolean;  // 응급실(Emergency gate keeper)

  @Column()
  MKioskTy10Msg: string;  // 장중첩 폐색 영유아 가능연령

  @Column()
  MKioskTy12Msg: string;  // 위장관 응급내시경 영유아 가능연령

  @Column()
  MKioskTy14Msg: string;  // 기관지 응급내시경 영유아 가능연령

  @Column()
  MKioskTy15Msg: string;  // 저체중 출생아 가능연령

  @Column()
  MKioskTy27Msg: string;  // 영상의학 혈관 중재적 시술 영유아 가능연령

  @Column()
  latitude: string;  // 위도

  @Column()
  longitude: string;  // 경도

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;
} 