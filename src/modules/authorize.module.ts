import { Module } from '@nestjs/common';
import { AuthorizeService } from '../services/authorize.service';
import { AuthorizeController } from '../controllers/authorize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Athlete } from 'src/database/entities/athlete.entity';
import { UserService } from 'src/services/users.service';
import { AthleteService } from 'src/services/athlete.service';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([User,Athlete])
  ],
  controllers: [AuthorizeController],
  providers: [AuthorizeService,UserService,AthleteService],
  exports:[AuthorizeService]
  
})
export class AuthorizeModule {}
