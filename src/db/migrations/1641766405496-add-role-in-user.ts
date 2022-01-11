import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addRoleInUser1641766405496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role_id',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        name: 'users_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table: Table | undefined = await queryRunner.getTable('users');

    if (table) {
      const foreignKeyRoleId: any = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('role_id') !== -1,
      );
      await queryRunner.dropForeignKeys('users', [foreignKeyRoleId]);
    }
    await queryRunner.dropColumn('users', 'role_id');
  }
}
