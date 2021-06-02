import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query } from '@nestjs/common';
import { AuthorizeService } from '../services/authorize.service';
import { ApiTags } from '@nestjs/swagger';
import { ClubService } from 'src/services/club.service';
@ApiTags('clubs')
@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async findOne() {
    return "one"
  }

    
}
