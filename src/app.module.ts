import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import {  } from './app.controller';
import { AppService } from './app.service';
import config from 'ormconfig';
import { AuthorizeModule } from './modules/authorize.module';
import { UserModule } from './modules/users.module';
import { AthleteModule } from './modules/athlete.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(config),
    AuthorizeModule,
    UserModule,
    AthleteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
