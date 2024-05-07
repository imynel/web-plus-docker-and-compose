import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  itemId: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
