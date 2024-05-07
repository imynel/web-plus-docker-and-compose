import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';
import { UsersController } from './users.controller';
import { Offer } from 'src/offers/entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish, Offer])],
  controllers: [UsersController],
  providers: [UsersService, BcryptService, WishesService],
  exports: [UsersService],
})
export class UsersModule {}
