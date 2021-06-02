import { Module } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { AuthorizeController } from '../controllers/authorize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Athlete } from 'src/database/entities/athlete.entity';
import { UserController } from 'src/controllers/users.controller';

@Module({
  imports : [
    TypeOrmModule.forFeature([User,Athlete])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]

})
export class UserModule{ }
