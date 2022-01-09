import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import * as ormOptions from './config/orm';

@Module({
  imports: [CoursesModule, TypeOrmModule.forRoot(ormOptions), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
