import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
import { UserService } from './users.service';
import { AthleteService } from './athlete.service';
const strava = require("strava-v3")

@Injectable()
export class AuthorizeService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Athlete) private readonly athleteRepository: Repository<Athlete>,
        private readonly userService: UserService,
        private readonly athleteService: AthleteService,
        ) { }
  
    // creates and return an access request uri = > redirect to strava outh
    async requestAccess(): Promise<string> {
        strava.config({
            client_id: process.env.STRAVA_CLIENT_ID,
            redirect_uri: process.env.STRAVA_CLIENT_URI,
            client_secret: process.env.STRAVA_CLIENT_SECRET
        })

        try {
            // grant types 
            const scopes = "profile:write,profile:read_all,read_all,activity:read_all,activity:write"
            const url = await strava.oauth.getRequestAccessURL({ scope: scopes })
            return url
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // handles strava auth response = > if user exists update refresh token else 
    //create new user 

    async saveAccess(code: string, scopes: string) : Promise<void> {
        try {

            
            const token_exchange = await strava.oauth.getToken(code);
            // get athlete info 
            const athleteInfo = await strava.athlete.get({ access_token: token_exchange.access_token })
            // get athlete stats    
            const athleteStats = await strava.athletes.stats({
                id: athleteInfo.id,
                access_token: token_exchange.access_token
            })
            // merge athlete info and stats
            let athlete = { ...athleteInfo, ...athleteStats }
             // check if athlete belongs to assist club
             const clubs = athleteInfo.clubs;
             let belongs_assist_club = false;

            if (clubs.find(x => x.id === Number(process.env.STRAVA_ASSIST_CLUB_ID)))
                belongs_assist_club = true;
            
            let athleteInstance = this.athleteRepository.create({ ...athlete } as Object)
            let user = await this.userRepository.findOne({ athlete: athleteInstance })
            
            // if user doesn't exist create user 
            if (!user ) {
                await this.userService.create(token_exchange, athleteInstance, belongs_assist_club);
            }
            // if user exists update user 
            else {
                //update athlete
                await this.athleteService.update(athleteInstance);
                // update user 
                await this.userService.update(user,token_exchange,belongs_assist_club);
                

            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async refreshToken (user : User) : Promise<string>{
        try{
        
            const refreshed =  await strava.oauth.refreshToken(user.refresh_token);
        //  updates user with refresh , date and access token 
            const auth = this.userRepository.create(refreshed);
            const update = { ...auth, ...{ updated_at: new Date() } }
            await this.userRepository.update({id:user.id},update)


            return refreshed.access_token;

        }catch(error){
        throw new ForbiddenException(error)
        }
    }
    
    async getAccess(user_id: string) {
        try {

            const user = await this.userService.findOne(user_id);
            const currentDate = Math.round(Date.now() / 1000);
            // if token is expired , generate new token
            if (user.expires_at > currentDate)
                return await this.refreshToken(user)
            return user.access_token;
            
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
