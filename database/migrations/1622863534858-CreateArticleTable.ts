import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export class CreateArticleTable1622863534858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns: TableColumnOptions[] = [
      {
        name: 'id',
        type: 'varchar',
        length: '64',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'title',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'content',
        type: 'text',
        isNullable: false,
      },
    ];
    const table = new Table({ name: 'articles', columns });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }
}
