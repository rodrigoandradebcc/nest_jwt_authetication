import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRoles1641763691719 implements MigrationInterface {
  private table = new Table({
    name: 'roles',
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
        length: '30',
        isNullable: false,
      },
      {
        name: 'slug',
        type: 'varchar',
        length: '30',
        isNullable: false,
        isUnique: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
