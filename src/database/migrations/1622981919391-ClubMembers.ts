import { ForbiddenException } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";
import { ClubMember } from "../entities/club-member.entity";
const strava = require("strava-v3");

export class ClubMembers1622981919391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            // get club member count for pagination
            const club = await strava.clubs.get({ id: process.env.STRAVA_ASSIST_CLUB_ID,access_token: process.env.STRAVA_APP_TOKEN});
            const member_count = club.member_count;

            // calculate max page
            let promises = [], page_number = 1, per_page =30;
            let max_page = Math.ceil(member_count / per_page);
            console.log(max_page)
            
            // get all the club members
            while (true) {
                const promise = strava.clubs.listMembers(
                    {
                    id: process.env.STRAVA_ASSIST_CLUB_ID,
                    per_page: 30,
                    page: page_number,
                    access_token: process.env.STRAVA_APP_TOKEN
                    })
                promises.push(promise);
                page_number++;
                if(page_number > max_page)
                    break;
            }
            // await all promises
            const solved = await Promise.all(promises);
            var members = [].concat.apply([], solved)


            const clubMemberRepository = queryRunner.connection.getRepository(ClubMember);
            
            let insertPromises = [];

            members.forEach(member => {
                let memberInstance = clubMemberRepository.create(member as object)
                memberInstance.club = club;
                insertPromises.push(clubMemberRepository.insert(memberInstance))
            });
            //await insertion
            await Promise.all(insertPromises);

            console.log("Migration completed..")


            

        } catch (error) {
            throw new ForbiddenException(error);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const club = await strava.clubs.get({ id: process.env.STRAVA_ASSIST_CLUB_ID, access_token: process.env.STRAVA_APP_TOKEN });
        const clubMemberRepository = queryRunner.connection.getRepository(ClubMember);
        await clubMemberRepository.delete(club);
    }

}
