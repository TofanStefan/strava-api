import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
import { ClubActivity } from 'src/database/entities/club-activity.entity';
import { Club } from 'src/database/entities/club.entity';
import { AuthorizeService } from './authorize.service';
const strava = require("strava-v3")

@Injectable()
export class ClubActivityService {
    constructor(
        @InjectRepository(ClubActivity) private readonly clubActivityRepository: Repository<ClubActivity>,
        private readonly authorizeService: AuthorizeService
    ) { }

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

    async syncAll(club: Club): Promise<void> {
        try {
            // get club member count for pagination
            
            const access_token = await this.authorizeService.getAccess(process.env.ASSIST_USER_UUID);

            let pages = [], page_number = 1, per_page = 30;
            
            // get all the club activities
            while (true) {

                // cannot await all promises at once because club activities count is unknown (strava does not return it )
                const page = await strava.clubs.listActivities(
                    {
                        id: club.id,
                        per_page,
                        page: page_number,
                        access_token
                    })
                pages.push(page);
                page_number++;
                if (page.length === 0)
                    break;

            }

            var activities = [].concat.apply([], pages)


            let createBulk = [];
            //Create club instance bulk array
            activities.forEach(activity => {
                let activityInstance = this.clubActivityRepository.create(activity as object)
                activityInstance.club = club;
                activityInstance.athlete_firstname = activity.athlete.firstname;
                activityInstance.athlete_lastname = activity.athlete.lastname;

                createBulk.push(activityInstance)
            });
            //await bulk insertion
            await this.clubActivityRepository.save(createBulk)
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    
    }


     //deletes all activities of a club
    async deleteAll(club: Club): Promise<DeleteResult> {
        
        try {

            return await this.clubActivityRepository.delete({club});
            
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
            
    }



}
