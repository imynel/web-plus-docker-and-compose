import { IsArray, IsString } from 'class-validator';

export class CreatewishlistDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsArray()
  itemsId: number[];
}
