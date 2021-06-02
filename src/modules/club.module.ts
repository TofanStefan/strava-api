import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Club } from 'src/database/entities/club.entity';
import { ClubController } from 'src/controllers/club.controller';
import { ClubService } from 'src/services/club.service';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Club])
  ],
  controllers: [ClubController],
  providers: [ClubService],
  exports:[ClubService]
  
})
export class ClubModule {}
