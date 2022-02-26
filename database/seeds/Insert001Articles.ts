import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Article } from '../../src/domain/entities/article.entity';

export class Insert001Articles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Article)().createMany(500);
  }
}
