import { ForbiddenException } from "@nestjs/common";
import { Club } from "../entities/club.entity";
const strava = require("strava-v3");
import { MigrationInterface, QueryRunner } from "typeorm";

export class AssistClub1622026178707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     

        try {
            const club = await strava.clubs.get({id:process.env.STRAVA_ASSIST_CLUB_ID,access_token:process.env.STRAVA_APP_TOKEN})
            const clubRepository = queryRunner.connection.getRepository(Club);
            await clubRepository.insert(club);

        } catch (error) {
            throw new ForbiddenException(error);
        }
    }


    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
