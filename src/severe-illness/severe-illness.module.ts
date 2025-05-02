import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SevereIllnessController } from './severe-illness.controller';
import { SevereIllnessService } from './severe-illness.service';
import { SevereIllness } from './entities/severe-illness.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SevereIllness]),
    HttpModule,
  ],
  controllers: [SevereIllnessController],
  providers: [SevereIllnessService],
  exports: [SevereIllnessService],
})
export class SevereIllnessModule {} 