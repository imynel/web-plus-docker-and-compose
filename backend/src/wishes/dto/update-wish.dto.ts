import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateWishDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  description: string;
}
