import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
import { ClubActivity } from 'src/database/entities/club-activity.entity';
const strava = require("strava-v3")

@Injectable()
export class ClubActivityService {
    constructor(@InjectRepository(ClubActivity) private readonly clubActivityRepository: Repository<ClubActivity>) { }

    // get all activities for a club id
    async findAll(club_id: number): Promise<ClubActivity[]> {

        try {
            const activities = await this.clubActivityRepository.find({
                where: {
                    club: { id: club_id }
                }
            })
            return activities;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    

  
    async findOne(id: number): Promise<ClubActivity>{
        try {
            return await this.clubActivityRepository.findOneOrFail(id);
            
        } catch (error) {
            throw new NotFoundException(error)
        }
    }


    async delete(id: number): Promise<DeleteResult>{
        
        try {
            return await this.clubActivityRepository.delete(id)
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        
    }

    async update(id:number,activity: Partial<ClubActivity>): Promise<UpdateResult> {
        try {
            return this.clubActivityRepository.update(id, activity);
        } catch (error)
        {
            throw new InternalServerErrorException(error);
        }
        
    }


    async create(activity: ClubActivity): Promise<ClubActivity> {
        
        try {
            return await this.clubActivityRepository.save(activity);
        } catch (error) {
            throw new BadRequestException(error);
        }
   
    }

}
