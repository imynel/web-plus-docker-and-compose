import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish, User])],
  controllers: [OffersController],
  providers: [OffersService, UsersService, BcryptService, WishesService],
  exports: [OffersService],
})
export class OffersModule {}
