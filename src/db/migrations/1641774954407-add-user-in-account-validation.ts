import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addUserInAccountValidation1641774954407
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account_validation',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKeys('account_validation', [
      new TableForeignKey({
        name: 'account_validation_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'account_validation',
      'account_validation_user_id',
    );

    await queryRunner.dropForeignKey('account_validation', 'user_id');
  }
}
