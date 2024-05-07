import { IsInt, IsString } from 'class-validator';

export class CreateWishDto {
  @IsString()
  name: string;

  @IsString()
  link: string;

  @IsString()
  image: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;
}
