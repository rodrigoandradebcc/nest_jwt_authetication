import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly full_name: string;

  @Type(() => Date)
  @IsDate()
  readonly date_of_birth: Date;

  @IsBoolean()
  readonly active: boolean;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @Type(() => Date)
  @IsDate()
  readonly last_access: Date;
}
