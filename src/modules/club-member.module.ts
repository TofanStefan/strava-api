import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClubMember } from 'src/database/entities/club-member.entity';
import { ClubMemberController } from 'src/controllers/club-member.controller';
import { ClubMemberService } from 'src/services/club-member.service';
import { AuthorizeModule } from './authorize.module';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([ClubMember]),
    AuthorizeModule
  ],
  controllers: [ClubMemberController],
  providers: [ClubMemberService],
  exports:[ClubMemberService]
  
})
export class ClubMemberModule {}
