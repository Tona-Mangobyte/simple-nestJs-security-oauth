import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './repositories/ArticleRepository';
import { ArticleService } from './services/ArticleService';
import { ArticleController } from './controllers/ArticleController';
import { Article } from './domain/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'nest_oauth',
      entities: [Article],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([ArticleRepository]),
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
