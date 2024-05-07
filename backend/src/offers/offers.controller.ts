import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user.id, createOfferDto);
  }

  @Get()
  getOffers() {
    return this.offersService.getOffers();
  }

  @Get('id')
  getOffersById(@Param('id') id: number) {
    return this.offersService.getOffersById(id);
  }
}
