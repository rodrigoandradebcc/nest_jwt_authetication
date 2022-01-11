import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeValidateService } from './code-validate.service';
import { AccountValidation } from './entities/account-validation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountValidation])],
  providers: [CodeValidateService],
  controllers: [],
})
export class CodeValidateModule {}
