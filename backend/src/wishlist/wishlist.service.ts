import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatewishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly WishesService: WishesService,
  ) {}

  async getAllWishlists() {
    return this.wishlistRepository.find({
      relations: { owner: true, items: true },
    });
  }

  async create(createwishlistDto: CreatewishlistDto, user) {
    const wishes = createwishlistDto.itemsId.map((id) => {
      return this.WishesService.findById(id);
    });
    return Promise.all(wishes).then(async (items) => {
      const wishlist = this.wishlistRepository.create({
        ...createwishlistDto,
        owner: user,
        items: items,
      });

      return await this.wishlistRepository.save(wishlist);
    });
  }

  async getWishlishById(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });

    return wishlist;
  }

  async updateWishlish(id, updateWishlish, userId) {
    const wishlist = await this.getWishlishById(id);

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете редактировать чужие списки подарков',
      );
    }
    return await this.wishlistRepository.update(id, updateWishlish);
  }

  async deleteWishlist(id: number, userId) {
    const wishlist = await this.getWishlishById(id);

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете удалять чужие списки подарков',
      );
    }
    await this.wishlistRepository.delete(id);
    return wishlist;
  }
}
