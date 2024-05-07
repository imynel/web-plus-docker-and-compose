import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updateAt?: Date;
}
