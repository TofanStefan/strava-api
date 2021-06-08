import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClubMember } from 'src/database/entities/club-member.entity';
import { AuthorizeService } from './authorize.service';
import { Club } from 'src/database/entities/club.entity';
const strava = require("strava-v3")

@Injectable()
export class ClubMemberService {
    constructor(@InjectRepository(ClubMember) private readonly clubMemberRepository: Repository<ClubMember>,
                private readonly authorizeService: AuthorizeService
    ) { }

    // gets all members for a club
    async findAll(club_id:number) : Promise<ClubMember[]> {
        
        try {
            const members = await this.clubMemberRepository.find({
                where: { club: { id: club_id } }
            })
            return members;
        } catch (error) {
            throw new InternalServerErrorException(error) 
        }
    }

    // gets member by id

    async findOne(member_id: string): Promise<ClubMember> {
        
        try {

            return await this.clubMemberRepository.findOneOrFail({ id: member_id });
            
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async create(member: ClubMember): Promise<ClubMember>{
        try {
              
            return await this.clubMemberRepository.save(member);

        } catch (error) {
            throw new InternalServerErrorException(error) 
        }
        
    }

   async update(member_id:string,member: Partial <ClubMember>): Promise<UpdateResult>{
        try {
              
            return await this.clubMemberRepository.update({id : member_id},member);

        } catch (error) {
            throw new InternalServerErrorException(error) 
        }
        
    }

    async delete(member_id: string): Promise<DeleteResult> {
        try {
            
            return await this.clubMemberRepository.delete({ id: member_id });

        } catch (error) {
            throw new InternalServerErrorException(error) 
        }
    }


    async syncAll(club: Club): Promise<void> {
        try {
            // get club member count for pagination
            const access_token = await this.authorizeService.getAccess(process.env.ASSIST_USER_UUID);
            const member_count = club.member_count;

            // calculate max page
            let promises = [], page_number = 1, per_page = 30;
            let max_page = Math.ceil(member_count / per_page);
            
            // get all the club members
            while (page_number <= max_page) {
                const promise = strava.clubs.listMembers(
                    {
                        id: club.id,
                        per_page: 30,
                        page: page_number,
                        access_token
                    })
                promises.push(promise);
                page_number++;

            }
            // await all promises
            const solved = await Promise.all(promises);
            var members = [].concat.apply([], solved)


            
            let createBulk =[];


            members.forEach(member => {
                let memberInstance = this.clubMemberRepository.create(member as object)
                memberInstance.club = club;
                createBulk.push(memberInstance)
            });
            //await insertion
            await this.clubMemberRepository.save(createBulk);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    
    }

    //deletes all memberof a club
    async deleteAll(club: Club): Promise<DeleteResult> {
        
        try {

            return await this.clubMemberRepository.delete({club});
            
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
            
    }


 





  

}
