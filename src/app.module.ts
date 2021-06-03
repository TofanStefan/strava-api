import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import {  } from './app.controller';
import { AppService } from './app.service';
import config from 'ormconfig';
import { AuthorizeModule } from './modules/authorize.module';
import { ClubModule } from './modules/club.module';
import { UserModule } from './modules/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(config),
    AuthorizeModule,
    UserModule,
    ClubModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
