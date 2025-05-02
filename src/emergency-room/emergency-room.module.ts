import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyRoomController } from './emergency-room.controller';
import { EmergencyRoomService } from './emergency-room.service';
import { EmergencyRoom } from './entities/emergency-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyRoom])],
  controllers: [EmergencyRoomController],
  providers: [EmergencyRoomService],
})
export class EmergencyRoomModule {} 