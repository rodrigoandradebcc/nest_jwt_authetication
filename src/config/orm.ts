import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'docker',
  password: 'docker',
  database: 'izi_fit',
  autoLoadEntities: true,
  // entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
  logNotifications: true,
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

module.exports = options;
