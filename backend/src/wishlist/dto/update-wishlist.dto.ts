import { PartialType } from '@nestjs/swagger';
import { CreatewishlistDto } from './create-wishlist.dto';

export class UpdatewishlistDto extends PartialType(CreatewishlistDto) {}
