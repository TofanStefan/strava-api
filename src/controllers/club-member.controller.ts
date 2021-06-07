import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClubMember } from 'src/database/entities/club-member.entity';
import { ClubMemberService } from 'src/services/club-member.service';
import { DeleteResult } from 'typeorm';
@ApiTags('club-members')
@Controller('club-members')
export class ClubMemberController {
  constructor(private readonly clubMemberService: ClubMemberService) {}
  //find all activities
      
      @Get()
      async findAll() : Promise <ClubMember[]> {
            return await this.clubMemberService.findAll(Number(process.env.STRAVA_ASSIST_CLUB_ID))
      }

      // member uuid
      @Get(':member_id') 
      async findOne(@Param('member_id') member_id : string) : Promise<ClubMember> {
            return await this.clubMemberService.findOne(member_id);
      }


      @Get(':member_id') 
      async delete(@Param('member_id') member_id : string) : Promise<DeleteResult> {
            return await this.clubMemberService.delete(member_id);
      }




    
}
