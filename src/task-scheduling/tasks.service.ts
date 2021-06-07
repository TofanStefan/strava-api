import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClubMemberService } from 'src/services/club-member.service';
import { ClubService } from 'src/services/club.service';

@Injectable()
export class TasksService {
    constructor(private readonly clubService: ClubService,
                private readonly clubMemberService : ClubMemberService) { }
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_2_HOURS)
  async synchronizeClubMembers() {
      try {

          console.log("Syncing club members....")

          const club = await this.clubService.findOne(Number(process.env.STRAVA_ASSIST_CLUB_ID))
          await this.clubMemberService.deleteAll(club);
          await this.clubMemberService.syncAll(club);

          console.log("Sync completed successfuly....")


          
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
    
  }
}