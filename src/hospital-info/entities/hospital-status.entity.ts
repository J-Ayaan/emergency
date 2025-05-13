import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class HospitalStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  // 응급실 현황
  @Column()
  totalHospitals: number;

  @Column()
  activeHospitals: number;

  @Column({ type: 'json' })
  totalBeds: {
    current: number;
    previous: number;
    change: number;
    changeType: string;
  };

  @Column({ type: 'json' })
  availableBeds: {
    current: number;
    previous: number;
    change: number;
    changeType: string;
  };

  @Column({ type: 'json' })
  bedTypes: {
    general: { current: number; previous: number; change: number };
    surgery: { current: number; previous: number; change: number };
    icu: { current: number; previous: number; change: number };
    ward: { current: number; previous: number; change: number };
  };

  // 중증질환 수용 현황
  @Column({ type: 'json' })
  severeIllness: {
    totalHospitals: number;
    availableHospitals: number;
    types: {
      cardiac: { available: number; change: number };
      neurology: { available: number; change: number };
      pediatric: { available: number; change: number };
      trauma: { available: number; change: number };
    };
  };

  // 구급차 현황
  @Column({ type: 'json' })
  ambulance: {
    totalHospitals: number;
    totalAmbulances: number;
    availableAmbulances: number;
    inUseAmbulances: number;
    dailyStats: {
      date: string;
      totalDispatches: number;
      change: number;
    };
  };

  // 요약 정보
  @Column({ type: 'json' })
  summary: {
    emergencyRoomStatus: string;
    severeIllnessStatus: string;
    ambulanceStatus: string;
    overallStatus: string;
    criticalAreas: Array<{
      region: string;
      reason: string;
      level: string;
    }>;
    trends: {
      emergencyRoom: string;
      severeIllness: string;
      ambulance: string;
    };
  };

  @CreateDateColumn()
  createdAt: Date;
} 