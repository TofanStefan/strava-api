import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { AuthorizeService } from '../services/authorize.service';
import { ApiTags } from '@nestjs/swagger';
import { ClubService } from 'src/services/club.service';
@ApiTags('clubs')
@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async findAll() {
    return await this.clubService.findAll()
  }

  @Get(':club_id')
  async findOne(@Param('club_id',ParseIntPipe) club_id : number) {
    return await this.clubService.findOne(club_id)
  }

  @Delete(':club_id')
  async delete(@Param('club_id',ParseIntPipe) club_id : number) {
    return await this.clubService.delete(club_id)
  }
    
}
