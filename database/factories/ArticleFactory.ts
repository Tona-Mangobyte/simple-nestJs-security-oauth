import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Article } from '../../src/domain/entities/article.entity';

define(Article, (faker: typeof Faker) => {
  const article = new Article();
  article.title = faker.lorem.sentences();
  article.content = faker.lorem.paragraph();
  return article;
});
