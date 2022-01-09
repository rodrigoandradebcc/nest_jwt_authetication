import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly full_name: string;

  @IsDate()
  readonly date_of_birth: Date;

  @IsBoolean()
  readonly active: boolean;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsDate()
  readonly last_access: Date;
}
