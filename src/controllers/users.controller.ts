import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';
import { DeleteResult } from 'typeorm';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //find all users
  @Get()
  async findAll() : Promise<User[]|any> {
        return await this.userService.findAll();
    }
 
  // find user by uuid
  @Get(':user_id')
  async findOne(@Param('user_id') user_id : string) : Promise<User|any> {
      return await this.userService.findOne(user_id);
    }

  @Delete(':user_id')
  async deleteOne(@Param('user_id') user_id: string): Promise<DeleteResult | any> {
        return await this.userService.delete(user_id);
    }

    // creation and update of user is made  on the atuhorize module based on the existence of that user in the db
    
  
    
}
