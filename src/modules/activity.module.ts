import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/database/entities/activity.entity';
import { ActivityController } from 'src/controllers/activity.controller';
import { ActivityService } from 'src/services/activity.service';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeModule } from './authorize.module';
import { UserService } from 'src/services/users.service';
import { UserModule } from './users.module';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Activity]),
    AuthorizeModule,
    UserModule
    
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports:[ActivityService]
  
})
export class ActivityModule {}
