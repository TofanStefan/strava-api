import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';
import { ActivityService } from 'src/services/activity.service';
import { Athlete } from 'src/database/entities/athlete.entity';
import { Activity } from 'src/database/entities/activity.entity';
import { DeleteResult } from 'typeorm';
@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  //find all activities
  @Get()
  async findAll() : Promise<Activity[]> {
        return await this.activityService.findAll()
  }
  
  @Get(':activity_id')
  async findOne(@Param('activity_id',ParseIntPipe) activity_id : number) : Promise<Activity> {
        return await this.activityService.findOne(activity_id)
  }
  
  @Put(':user_id')
  async sync(@Param('user_id') user_id: string): Promise<Activity[]>{
        return await this.activityService.syncActivities(user_id);

  }   

  @Delete(':activity_id')
  async delete(@Param('activity_id',ParseIntPipe) activity_id : number) : Promise<DeleteResult> {
        return await this.activityService.delete(activity_id)
    }
 
    
}
