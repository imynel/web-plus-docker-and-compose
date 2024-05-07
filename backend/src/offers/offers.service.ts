import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    private readonly userService: UsersService,
    private readonly dataSource: DataSource,
    private readonly wishService: WishesService,
  ) {}

  async create(userId, offerDto: CreateOfferDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await this.userService.findOne(userId);
    const wish = await this.wishService.findById(offerDto.itemId);

    if (user.id === wish.owner.id) {
      throw new ForbiddenException('Нельзя донатить на свои подарки');
    }
    const newPrice = wish.raised + offerDto.amount;
    if (newPrice > wish.price) {
      throw new ForbiddenException('Слишком большая сумма');
    }
    try {
      const offer = await this.offerRepository.create({
        ...offerDto,
        user: user,
        item: wish,
      });

      await this.offerRepository.save(offer);
      await this.wishRepository.update(offerDto.itemId, { raised: newPrice });

      await queryRunner.commitTransaction();
      return offer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getOffers() {
    return this.offerRepository.find({
      relations: {
        user: {
          wishes: true,
          offers: true,
          wishlists: { owner: true, items: true },
        },
      },
    });
  }

  async getOffersById(id: number) {
    return this.offerRepository.findOneBy({ id });
  }
}
