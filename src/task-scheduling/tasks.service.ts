import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClubActivityService } from 'src/services/club-activities.service';
import { ClubMemberService } from 'src/services/club-member.service';
import { ClubService } from 'src/services/club.service';

@Injectable()
export class TasksService {
    constructor(
        private readonly clubService: ClubService,
        private readonly clubMemberService: ClubMemberService,
        private readonly clubActivityService: ClubActivityService
                
                
    ) { }
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async synchronizeClubMembers() {
      try {

          this.logger.debug('Syncing club members....');

          // gets assist club 
          const club = await this.clubService.findOne(Number(process.env.STRAVA_ASSIST_CLUB_ID))

          // deletes all member (cannot update because member is not linked to athlete)
          await this.clubMemberService.deleteAll(club);

          // sync all strava club members with bd 
          await this.clubMemberService.syncAll(club);

          this.logger.debug('Sync completed successfuly....');


          
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
    
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    async syncronizeClubActivities() {

        this.logger.debug('Syncing club activities....');

        // gets assist club 
        const club = await this.clubService.findOne(Number(process.env.STRAVA_ASSIST_CLUB_ID))


        // deletes all club activities (cannot update because club activities  is not linked to athlete / activity)
        await this.clubActivityService.deleteAll(club);


        // sync all strava club activities with bd 
        await this.clubActivityService.syncAll(club);


        this.logger.debug('Sync completed successfuly....');

      
  }  
}