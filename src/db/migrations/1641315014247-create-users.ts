import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1641315014247 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'full_name',
        type: 'varchar',
      },
      {
        name: 'date_of_birth',
        type: 'timestamp with time zone',
        isNullable: true,
      },
      {
        name: 'active',
        type: 'boolean',
        isNullable: true,
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
      },
      {
        name: 'last_access',
        type: 'timestamp with time zone',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
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
