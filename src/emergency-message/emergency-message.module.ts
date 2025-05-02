import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyMessage } from './entities/emergency-message.entity';
import { EmergencyMessageService } from './emergency-message.service';
import { EmergencyMessageController } from './emergency-message.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyMessage]),
    ConfigModule,
  ],
  controllers: [EmergencyMessageController],
  providers: [EmergencyMessageService],
})
export class EmergencyMessageModule {} 