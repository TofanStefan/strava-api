import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClubModule } from './club.module';
import { TasksService } from 'src/task-scheduling/tasks.service';
import { ClubMemberModule } from './club-member.module';
import { ClubActivityService } from 'src/services/club-activities.service';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    ClubModule,
    ClubMemberModule,

    
    
  ],
  providers: [TasksService,ClubActivityService],
  
})
export class TaskModule {}
