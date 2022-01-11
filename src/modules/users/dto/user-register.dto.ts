import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  readonly full_name: string;

  @IsEmail()
  readonly email: string;
}
