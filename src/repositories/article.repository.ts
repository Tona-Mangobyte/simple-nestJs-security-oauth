import { EntityRepository, Repository } from 'typeorm';
import { Article } from '../domain/entities/article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}