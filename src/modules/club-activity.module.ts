import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClubActivityService } from 'src/services/club-activities.service';
import { ClubActivity } from 'src/database/entities/club-activity.entity';
import { AuthorizeModule } from './authorize.module';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([ClubActivity]),
        AuthorizeModule
  ],
  providers: [ClubActivityService],
  exports:[ClubActivityService]
  
})
export class ClubActivityModule {}
