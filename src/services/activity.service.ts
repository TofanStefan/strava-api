import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Activity } from 'src/database/entities/activity.entity';
import { Athlete } from 'src/database/entities/athlete.entity';
import { AuthorizeService } from './authorize.service';
import { UserService } from './users.service';
import { CreateActivityDto } from 'src/dto/createActivity.dto';
const strava = require("strava-v3")

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(Activity) private readonly activityRepository: Repository<Activity>,
        private readonly authService: AuthorizeService,
    ) { }
    
    async findAll() : Promise<Activity[]> {
        try {
            return await this.activityRepository.find();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(activity_id: number): Promise<Activity>{
        try {
            return await this.activityRepository.findOneOrFail({id : activity_id})
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async delete(activity_id: number): Promise<DeleteResult>{
        try {
            return await this.activityRepository.delete({ id: activity_id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // creates new activity for athlete_id
    async create(user_id: string,createActivityDto : CreateActivityDto): Promise<Activity> {
        try {
            const token = {
                access_token : await this.authService.getAccess(user_id)
            }
            const data = { ...token, ...createActivityDto };

            const activity = await strava.activities.create(data)

            this.activityRepository.save(activity);
            return activity;
            
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    // takes all activities from strava for the given user_id and adds / updates them in the database
    async syncActivities(user_id: string): Promise<Activity[]>{

        try {
            let promises = new Array();
            const access_token = await this.authService.getAccess(user_id)
            const activities = await strava.athlete.listActivities({ access_token })

            activities.forEach( element=>  {
                let activityInstance = new Activity();
                // activity instance 
                activityInstance = this.activityRepository.create(element as object);
                promises.push(this.activityRepository.save(activityInstance));
                
            });
            await Promise.all(promises);

            return activities;

        } catch (error) {
            throw new NotFoundException(error)
        }
        
    }

  

}
