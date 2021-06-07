import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClubMember } from 'src/database/entities/club-member.entity';
const strava = require("strava-v3")

@Injectable()
export class ClubMemberService {
    constructor(@InjectRepository(ClubMember) private readonly clubMemberRepository: Repository<ClubMember>) { }

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

 





  

}
