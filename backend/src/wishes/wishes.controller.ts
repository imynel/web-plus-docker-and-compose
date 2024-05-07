import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.wishesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    return this.wishesService.update(id, updateWishDto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Req() req) {
    return this.wishesService.delete(id, req.user);
  }

  @Post(':id/copy')
  copy(@Param('id') id: number, @Req() req) {
    return this.wishesService.copy(id, req.user);
  }
}
