import { Module } from '@nestjs/common';
import { AuthorizeService } from '../services/authorize.service';
import { AuthorizeController } from '../controllers/authorize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Athlete } from 'src/database/entities/athlete.entity';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([User,Athlete])
  ],
  controllers: [AuthorizeController],
  providers: [AuthorizeService],
  exports:[AuthorizeService]
  
})
export class AuthorizeModule {}
