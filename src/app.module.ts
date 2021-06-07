import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import {  } from './app.controller';
import { AppService } from './app.service';
import config from 'ormconfig';
import { AuthorizeModule } from './modules/authorize.module';
import { UserModule } from './modules/users.module';
import { AthleteModule } from './modules/athlete.module';
import { ClubModule } from './modules/club.module';
import { ActivityModule } from './modules/activity.module';
import { ClubMemberModule } from './modules/club-member.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task-scheduling/tasks.service';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(config),
    AuthorizeModule,
    UserModule,
    AthleteModule,
    ClubModule,
    ActivityModule,
    ClubMemberModule

  ],
  controllers: [AppController],
  providers: [AppService,TasksService]
})
export class AppModule {}
