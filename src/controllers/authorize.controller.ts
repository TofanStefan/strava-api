import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query } from '@nestjs/common';
import { AuthorizeService } from '../services/authorize.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('authorize')
@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly authorizeService: AuthorizeService) {}

 
  // builds uri and redirects to strava oauth
  @Get()
  async getAccess(@Res() res : any) {
    return res.redirect(await this.authorizeService.requestAccess());
  }

  // redirect from strava , gets code and builds refresh and access token => saves to db 
  // all done = > redirects to "is logged in page "
  @Get('/save')
  async saveAccess(@Res() res : any,@Query() query : any) {

    // if user does not authorize 
    if(query.error)
      return res.redirect("http://localhost:3000/?error=access_denied");

    // if user authorizes
    await this.authorizeService.saveAccess(query.code,query.scope)
    return res.redirect("http://localhost:3000/");
   
    }
    
}
