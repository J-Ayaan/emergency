import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EmergencyBed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  dutyName: string;        // 병원명

  @Column({ length: 10 })
  hpid: string;           // 병원 ID

  @Column({ length: 14 })
  dutyTel3: string;       // 응급실 전화번호

  @Column({ type: 'varchar', length: 20, nullable: true })
  hvidate: string;        // 데이터 갱신 일시

  // 병상 관련 필드
  @Column({ length: 3 })
  hvec: string;           // 일반병상

  @Column({ length: 4 })
  hvoc: string;           // 수술실 병상

  @Column({ length: 4 })
  hvcc: string;           // 중환자실 - 신경과

  @Column({ length: 4 })
  hvncc: string;          // 중환자실 - 신생아

  @Column({ length: 4 })
  hvccc: string;          // 중환자실 - 흉부외과

  @Column({ length: 4 })
  hvicc: string;          // 중환자실 - 일반

  @Column({ length: 4 })
  hvgc: string;           // 입원실 - 일반

  // 응급 장비 및 특수 시설 가용 여부
  @Column()
  hvctayn: boolean;        // CT 사용 가능 여부

  @Column()
  hvmriayn: boolean;       // MRI 사용 가능 여부

  @Column()
  hvangioayn: boolean;     // 혈관촬영기 가능 여부

  @Column()
  hvventiayn: boolean;     // 인공호흡기 가능 여부

  @Column()
  hvventisoayn: boolean;   // 인공호흡기 (조산아용) 가능 여부

  @Column()
  hvincuayn: boolean;      // 인큐베이터 가능 여부

  @Column()
  hvcrrtayn: boolean;      // CRRT 가능 여부

  @Column()
  hvecmoayn: boolean;      // ECMO 사용 가능 여부

  @Column()
  hvoxyayn: boolean;       // 고압산소치료기 가능 여부

  @Column()
  hvhypoayn: boolean;      // 중심체온조절유도기 가능 여부

  @Column()
  hvamyn: boolean;         // 구급차 보유 여부

  // 당직의 및 연락처
  @Column({ length: 20 })
  hvdnm: string;          // 당직의 이름

  @Column({ length: 20 })
  hv1: string;            // 응급실 당직의 직통 연락처

  @Column({ length: 20 })
  hv12: string;           // 소아 당직의 직통 연락처

  // 추가 필드들
  @Column({ length: 20 })
  hv2: string;            // [중환자실] 내과

  @Column({ length: 20 })
  hv3: string;            // [중환자실] 외과

  @Column({ length: 20 })
  hv4: string;            // 외과입원실(정형외과)

  @Column()
  hv5: boolean;           // 신경과입원실

  @Column({ length: 20 })
  hv6: string;            // [중환자실] 신경외과

  @Column()
  hv7: boolean;           // 약물중환자

  @Column({ length: 20 })
  hv8: string;            // [중환자실] 화상

  @Column({ length: 20 })
  hv9: string;            // [중환자실] 외상

  @Column()
  hv10: boolean;          // VENTI(소아)

  @Column()
  hv11: boolean;          // 인큐베이터(보육기)

  @Column({ length: 20 })
  hv13: string;           // 격리진료구역 음압격리병상

  @Column({ length: 20 })
  hv14: string;           // 격리진료구역 일반격리병상

  @Column({ length: 20 })
  hv15: string;           // 소아음압격리

  @Column({ length: 20 })
  hv16: string;           // 소아일반격리

  @Column({ length: 20 })
  hv17: string;           // [응급전용] 중환자실 음압격리

  @Column({ length: 20 })
  hv18: string;           // [응급전용] 중환자실 일반격리

  @Column({ length: 20 })
  hv19: string;           // [응급전용] 입원실 음압격리

  @Column({ length: 20 })
  hv21: string;           // [응급전용] 입원실 일반격리

  @Column({ length: 20 })
  hv22: string;           // 감염병 전담병상 중환자실

  @Column({ length: 20 })
  hv23: string;           // 감염병 전담병상 중환자실 내 음압격리병상

  @Column({ length: 20 })
  hv24: string;           // [감염] 중증 병상

  @Column({ length: 20 })
  hv25: string;           // [감염] 준-중증 병상

  @Column({ length: 20 })
  hv26: string;           // [감염] 중등증 병상

  @Column({ length: 20 })
  hv27: string;           // 코호트 격리

  @Column({ length: 20 })
  hv28: string;           // 소아

  @Column({ length: 20 })
  hv29: string;           // 응급실 음압 격리 병상

  @Column({ length: 20 })
  hv30: string;           // 응급실 일반 격리 병상

  @Column({ length: 20 })
  hv31: string;           // [응급전용] 중환자실

  @Column({ length: 20 })
  hv32: string;           // [중환자실] 소아

  @Column({ length: 20 })
  hv33: string;           // [응급전용] 소아중환자실

  @Column({ length: 20 })
  hv34: string;           // [중환자실] 심장내과

  @Column({ length: 20 })
  hv35: string;           // [중환자실] 음압격리

  @Column({ length: 20 })
  hv36: string;           // [응급전용] 입원실

  @Column({ length: 20 })
  hv37: string;           // [응급전용] 소아입원실

  @Column({ length: 20 })
  hv38: string;           // [입원실] 외상전용

  @Column({ length: 20 })
  hv39: string;           // [기타] 외상전용 수술실

  @Column({ length: 20 })
  hv40: string;           // [입원실] 정신과 폐쇄병동

  @Column({ length: 20 })
  hv41: string;           // [입원실] 음압격리

  @Column()
  hv42: boolean;          // [기타] 분만실

  @Column({ length: 20 })
  hv43: string;           // [기타] 화상전용처치실

  @Column({ length: 20 })
  hv60: string;           // 외상소생실

  @Column({ length: 20 })
  hv61: string;           // 외상환자진료구역

  // 기준 필드들
  @Column({ length: 20 })
  hvs01: string;          // 일반_기준

  @Column({ length: 20 })
  hvs02: string;          // 소아_기준

  @Column({ length: 20 })
  hvs03: string;          // 응급실 음압 격리 병상_기준

  @Column({ length: 20 })
  hvs04: string;          // 응급실 일반 격리 병상_기준

  @Column({ length: 20 })
  hvs05: string;          // [응급전용] 중환자실_기준

  @Column({ length: 20 })
  hvs06: string;          // [중환자실] 내과_기준

  @Column({ length: 20 })
  hvs07: string;          // [중환자실] 외과_기준

  @Column({ length: 20 })
  hvs08: string;          // [중환자실] 신생아_기준

  @Column({ length: 20 })
  hvs09: string;          // [중환자실] 소아_기준

  @Column({ length: 20 })
  hvs10: string;          // [응급전용] 소아중환자실_기준

  @Column({ length: 20 })
  hvs11: string;          // [중환자실] 신경과_기준

  @Column({ length: 20 })
  hvs12: string;          // [중환자실] 신경외과_기준

  @Column({ length: 20 })
  hvs13: string;          // [중환자실] 화상_기준

  @Column({ length: 20 })
  hvs14: string;          // [중환자실] 외상_기준

  @Column({ length: 20 })
  hvs15: string;          // [중환자실] 심장내과_기준

  @Column({ length: 20 })
  hvs16: string;          // [중환자실] 흉부외과_기준

  @Column({ length: 20 })
  hvs17: string;          // [중환자실] 일반_기준

  @Column({ length: 20 })
  hvs18: string;          // [중환자실] 음압격리_기준

  @Column({ length: 20 })
  hvs19: string;          // [응급전용] 입원실_기준

  @Column({ length: 20 })
  hvs20: string;          // [응급전용] 소아입원실_기준

  @Column({ length: 20 })
  hvs21: string;          // [입원실] 외상전용_기준

  @Column({ length: 20 })
  hvs22: string;          // [기타] 수술실_기준

  @Column({ length: 20 })
  hvs23: string;          // [기타] 외상전용 수술실_기준

  @Column({ length: 20 })
  hvs24: string;          // [입원실] 정신과 폐쇄병동_기준

  @Column({ length: 20 })
  hvs25: string;          // [입원실] 음압격리_기준

  @Column({ length: 20 })
  hvs26: string;          // [기타] 분만실_기준

  @Column({ length: 20 })
  hvs27: string;          // CT_기준

  @Column({ length: 20 })
  hvs28: string;          // MRI_기준

  @Column({ length: 20 })
  hvs29: string;          // 혈관촬영기_기준

  @Column({ length: 20 })
  hvs30: string;          // 인공호흡기 일반_기준

  @Column({ length: 20 })
  hvs31: string;          // 인공호흡기 조산아_기준

  @Column({ length: 20 })
  hvs32: string;          // 인큐베이터_기준

  @Column({ length: 20 })
  hvs33: string;          // CRRT_기준

  @Column({ length: 20 })
  hvs34: string;          // ECMO_기준

  @Column({ length: 20 })
  hvs35: string;          // 중심체온조절유도기_기준

  @Column({ length: 20 })
  hvs36: string;          // [기타] 화상전용처치실_기준

  @Column({ length: 20 })
  hvs37: string;          // 고압산소치료기_기준

  @Column({ length: 20 })
  hvs38: string;          // [입원실] 일반_기준

  @Column({ length: 20 })
  hvs46: string;          // 격리진료구역 음압격리_기준

  @Column({ length: 20 })
  hvs47: string;          // 격리진료구역 일반격리_기준

  @Column({ length: 20 })
  hvs48: string;          // 소아음압격리_기준

  @Column({ length: 20 })
  hvs49: string;          // 소아일반격리_기준

  @Column({ length: 20 })
  hvs50: string;          // [응급전용] 중환자실 음압격리_기준

  @Column({ length: 20 })
  hvs51: string;          // [응급전용] 중환자실 일반격리_기준

  @Column({ length: 20 })
  hvs52: string;          // [응급전용] 입원실 음압격리_기준

  @Column({ length: 20 })
  hvs53: string;          // [응급전용] 입원실 일반격리_기준

  @Column({ length: 20 })
  hvs54: string;          // 감염병 전담병상 중환자실_기준

  @Column({ length: 20 })
  hvs55: string;          // 감염병 전담병상 중환자실 내 음압격리병상_기준

  @Column({ length: 20 })
  hvs56: string;          // [감염] 중증 병상_기준

  @Column({ length: 20 })
  hvs57: string;          // [감염] 준-중증 병상_기준

  @Column({ length: 20 })
  hvs58: string;          // [감염] 중등증 병상_기준

  @Column({ length: 20 })
  hvs59: string;          // 코호트 격리_기준

  @Column({ length: 20 })
  hvs60: string;          // 외상소생실_기준

  @Column({ length: 20 })
  hvs61: string;          // 외상환자진료구역_기준

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 