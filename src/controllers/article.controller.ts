import { ArticleService } from '../services/article.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from '../domain/dto/create-article.dto';
import { Article } from '../domain/entities/article.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('Article')
@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.articleService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Article> {
    return await this.articleService.getById(id);
  }

  @Post()
  async create(@Body() validator: CreateArticleDto): Promise<Article> {
    return this.articleService.create(validator);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<DeleteResult> {
    return await this.articleService.deleteArticle(id);
  }
}
