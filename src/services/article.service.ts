import { Article } from '../domain/entities/article.entity';
import { CreateArticleDto } from '../domain/dto/create-article.dto';
import { Injectable } from '@nestjs/common';
import {DeleteResult, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private repository: Repository<Article>;

  async getAll(): Promise<Article[]> {
    return await this.repository.find();
  }

  async getById(id: string): Promise<Article> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(validator: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = validator.title;
    article.content = validator.content;
    return await this.repository.save(article);
  }

  async deleteArticle(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
