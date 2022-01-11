import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountValidation } from '../code-validate/entities/account-validation.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AccountValidation])],
  controllers: [UsersController],
  providers: [UsersService, RoleService],
  exports: [UsersService],
})
export class UsersModule {}
