import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { Athlete } from 'src/database/entities/athlete.entity';
const strava = require("strava-v3")

@Injectable()
export class AuthorizeService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Athlete) private readonly athleteRepository: Repository<Athlete>) { }
  
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
                
                user = this.userRepository.create({ ...token_exchange } as Object )
                user.athlete = athleteInstance
                user.belongs_assist_club = belongs_assist_club;

                await this.userRepository.save(user);
            }
            // if user exists update user 
            else {
                //update athlete
                this.refreshToken(user)
                await this.athleteRepository.update({id : athleteInstance.id},athleteInstance)
                //user.updated_at = new Date()
                user.access_token = token_exchange.access_token
                user.refresh_token = token_exchange.refresh_token
                user.expires_at = token_exchange.expires_at
                user.expires_in = token_exchange.expires_in
                user.belongs_assist_club = belongs_assist_club
                // update user 
                await this.userRepository.update({id : user.id}, user);
                

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
}
