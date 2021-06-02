import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from 'src/database/entities/club.entity';
const strava = require("strava-v3")

@Injectable()
export class ClubService {
    constructor(@InjectRepository(Club) private readonly userRepository: Repository<Club>) { }


  

}
