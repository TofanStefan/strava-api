import { ForbiddenException } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";
import { ClubActivity } from "../entities/club-activity.entity";
const strava = require("strava-v3");

export class ClubActivities1623147122415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

            try {
                // get club member count for pagination
                const club = await strava.clubs.get({ id: process.env.STRAVA_ASSIST_CLUB_ID, access_token: process.env.STRAVA_APP_TOKEN });
                const member_count = club.member_count;

                // calculate max page
                let promises =[], page_number = 1, per_page =30;
                let max_page = Math.ceil(member_count / per_page);
            
            // get all the club activities
                while (page_number <= max_page) {
                    const promise = strava.clubs.listActivities(
                        {
                            id: process.env.STRAVA_ASSIST_CLUB_ID,
                            per_page: 30,
                            page: page_number,
                            access_token: process.env.STRAVA_APP_TOKEN
                        })
                    promises.push(promise);
                    page_number++;
                }
            // await all promises
                const solved = await Promise.all(promises);
                //  get activitieas asa an array
                let activities = [].concat.apply([], solved)
                let insertPromises = [];
                const clubActivities = queryRunner.connection.getRepository(ClubActivity);
                activities.forEach(element => {

                    const activity = clubActivities.create(element as object);
                    activity.athlete_lastname = element.athlete.lastname;
                    activity.athlete_firstname = element.athlete.firstname;
                    activity.club = club;
                    insertPromises.push(clubActivities.insert(activity));
                    
                });

                await Promise.all(insertPromises);
                console.log("Club Activities Migrated Successfuly")

            }catch(error) {
                throw new ForbiddenException(error)
            }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const club = await strava.clubs.get({ id: process.env.STRAVA_ASSIST_CLUB_ID, access_token: process.env.STRAVA_APP_TOKEN });
        const clubActivityRepository = queryRunner.connection.getRepository(ClubActivity);
        await clubActivityRepository.delete({club : club});
    }

}
