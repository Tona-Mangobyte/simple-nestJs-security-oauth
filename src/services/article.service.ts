import { Article } from '../domain/entities/article.entity';
import { ArticleRepository } from '../repositories/article.repository';
import { CreateArticleDto } from '../domain/dto/create-article.dto';
import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async getAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async getById(id: string): Promise<Article> {
    return await this.articleRepository.findOne({ where: { id } });
  }

  async create(validator: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = validator.title;
    article.content = validator.content;
    return await this.articleRepository.save(article);
  }

  async deleteArticle(id: string): Promise<DeleteResult> {
    return await this.articleRepository.delete(id);
  }
}
