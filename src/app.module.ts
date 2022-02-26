import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import {getConnectionToken, TypeOrmModule} from '@nestjs/typeorm';
import { ArticleService } from './services/article.service';
import { ArticleController } from './controllers/article.controller';
import { UserService } from './services/user.service';
import {AccessTokenEntity, ClientEntity, Oauth2Module} from "nestjs-oauth2-server";
import {UserLoader} from "./helpers/user.loader";
import {UserValidator} from "./helpers/user.validator";
import {Article} from "./domain/entities/article.entity";
import {User} from "./domain/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'nest_oauth',
      autoLoadEntities: true,
      synchronize: true,
    }),
    Oauth2Module.forRoot({
      userLoader: new UserLoader(),
      userValidator: new UserValidator(),
      connection: getConnectionToken('default') as string,
    }),
    TypeOrmModule.forFeature([Article, User, ClientEntity, AccessTokenEntity]),
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService, UserService],
})
export class AppModule {}
