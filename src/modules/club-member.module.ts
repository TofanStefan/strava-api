import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClubMember } from 'src/database/entities/club-member.entity';
import { ClubMemberController } from 'src/controllers/club-member.controller';
import { ClubMemberService } from 'src/services/club-member.service';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([ClubMember])
  ],
  controllers: [ClubMemberController],
  providers: [ClubMemberService],
  exports:[ClubMemberService]
  
})
export class ClubMemberModule {}
