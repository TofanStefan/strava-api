import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Club } from 'src/database/entities/club.entity';
const strava = require("strava-v3")

@Injectable()
export class ClubService {
    constructor(@InjectRepository(Club) private readonly clubRepository: Repository<Club>) { }

    // get all clubs
    async findAll(): Promise<Club[]> {
        try {
            return await this.clubRepository.find();
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    // get club by id
    
    async findOne(club_id: number): Promise<Club> {
        try {
            const club = await this.clubRepository.findOneOrFail({id:club_id})
            return club;
        }
        catch (error) {
            throw new NotFoundException(error)
        }
    }

    async delete(club_id: number): Promise<DeleteResult>{
        return await this.clubRepository.delete({ id: club_id });

    }


    // this was done in a migration for assist club 
    async create(clubInstance: Club) : Promise <Club> {
        try {
            const club = this.clubRepository.create({ clubInstance } as object)
            return await this.clubRepository.save(club);
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        
    }

    async update(club_id: number, clubInstance: Club) {
        try {
            const club = this.clubRepository.create({ ...clubInstance, ...{ updated_at: Date.now() } } as object);
            return await this.clubRepository.update({ id: club_id }, club);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }





  

}
