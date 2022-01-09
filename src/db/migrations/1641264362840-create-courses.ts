import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCourses1641264362840 implements MigrationInterface {
  private table = new Table({
    name: 'courses',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
      {
        name: 'description',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
