import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { wishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Wish])],
  controllers: [wishlistController],
  providers: [WishlistService, WishesService],
})
export class wishlistModule {}
