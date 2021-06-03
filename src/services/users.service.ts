import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
const strava = require("strava-v3")

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Athlete) private readonly athleteRepository: Repository<Athlete>) { }

    async findOne(user_id: string) : Promise <User> {
        try {
            const user = await this.userRepository.findOneOrFail({ id: user_id })
            return user;
        } catch (error) {
            throw new NotFoundException(error);
        }
        
    }

    async findAll() : Promise <User[]> {
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        
    }

    async delete(user_id: string) : Promise <DeleteResult> {
        try {
            const user = await this.userRepository.delete({ id: user_id })
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        
    }

    // gets token information , ahtlete and if user is member of assist 
    // called from authorization module
    async create(token_exchange: object, athlete: Athlete ,belongs_assist_club : boolean) : Promise<User> {
        let user = this.userRepository.create({ ...token_exchange } as Object )
        user.athlete = athlete;
        user.belongs_assist_club = belongs_assist_club;
        return await this.userRepository.save(user);
    }

    async update(user: User, token_exchange: any, belongs_assist_club: boolean) :Promise<void> {
        user.updated_at = new Date()
        user.access_token = token_exchange.access_token;
        user.refresh_token = token_exchange.refresh_token;
        user.expires_at = token_exchange.expires_at;
        user.expires_in = token_exchange.expires_in;
        user.belongs_assist_club = belongs_assist_club;
        // update user 
        await this.userRepository.update({ id: user.id }, user);
        
    }

}
