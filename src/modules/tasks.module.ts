import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClubModule } from './club.module';
import { TasksService } from 'src/task-scheduling/tasks.service';
import { ClubMemberModule } from './club-member.module';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    ClubModule,
    ClubMemberModule,
    TaskModule
  ],
  providers: [TasksService],
  
})
export class TaskModule {}
