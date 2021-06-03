import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
import { AthleteService } from 'src/services/athlete.service';
@ApiTags('athlete')
@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}
  //find all users
  @Get()
  async findAll() : Promise<Athlete[]> {
        return await this.athleteService.findAll();
    }
 
  // find user by uuid
  @Get(':athlete_id')
  async findOne(@Param('athlete_id',ParseIntPipe) athlete_id : number) : Promise<Athlete> {
      return await this.athleteService.findOne(athlete_id);
    }

  @Delete(':athlete_id')
  async deleteOne(@Param('athlete_id',ParseIntPipe) athlete_id: number): Promise<DeleteResult> {
        return await this.athleteService.delete(athlete_id);
    }

    
  
    
}
