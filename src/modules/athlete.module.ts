import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Athlete } from 'src/database/entities/athlete.entity';
import { AthleteController } from 'src/controllers/athlete.controller';
import { AthleteService } from 'src/services/athlete.service';


@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Athlete])
  ],
  controllers: [AthleteController],
  providers: [AthleteService],
  exports:[AthleteService]
  
})
export class AthleteModule {}
