import { IsEmail, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 30)
  @IsString()
  username: string;

  @Length(2, 200)
  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
