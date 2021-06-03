import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
const strava = require("strava-v3")

@Injectable()
export class AthleteService {
    constructor(@InjectRepository(Athlete) private readonly athleteRepository: Repository<Athlete>) { }

    // get all athletes
    async findAll() : Promise <Athlete[]> {
        return await this.athleteRepository.find();
    }
    

    //get athlete by id
    async findOne(athlete_id: number): Promise<Athlete>{
        try {
            return this.athleteRepository.findOneOrFail({id : athlete_id})
        } catch (error) {
            throw new NotFoundException(error)
        }
    }


    // this violates user pk constraint (cascade)
    async delete(athlete_id: number): Promise<DeleteResult>{
        return await this.athleteRepository.delete({id : athlete_id})
    }

    async update(athlete: any): Promise<UpdateResult> {
        try {
            return await this.athleteRepository.update({ id: athlete.id }, athlete);
        } catch (error)
        {
            throw new InternalServerErrorException(error);
        }
        
    }

   // not really useful , since athlete creation is made on cascade (on create user)
    async create(athlete: object): Promise<Athlete> {
        let athleteInstance = this.athleteRepository.create(athlete)
        return await this.athleteRepository.save(athleteInstance);
    }

}
