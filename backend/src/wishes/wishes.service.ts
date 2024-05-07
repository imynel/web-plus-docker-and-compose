import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, user) {
    const wish = await this.wishRepository.create({
      ...createWishDto,
      owner: user,
    });
    return await this.wishRepository.save(wish);
  }

  async findAll() {
    return await this.wishRepository.find({
      relations: ['owner', 'offers', 'wishlists'],
    });
  }

  async findLast() {
    return await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: {
        owner: true,
        offers: {
          user: {
            wishes: true,
            offers: true,
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
    });
  }
  async findTop() {
    return await this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
      relations: {
        owner: true,
        offers: {
          user: {
            wishes: true,
            offers: true,
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto, user) {
    const wish = await this.findById(id);
    console.log(wish);
    if (user.id === wish.owner.id) {
      throw new ForbiddenException(
        'Вы не можете изменять стоимость подарка, если уже есть желающие скинуться',
      );
    }

    if (updateWishDto.price && wish.raised > 0) {
      throw new ForbiddenException(
        'Вы не можете изменять стоимость подарка, если уже есть желающие скинуться',
      );
    }
    return await this.wishRepository.update(id, updateWishDto);
  }

  async findById(id: number) {
    return await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: {
          user: {
            wishes: true,
            offers: true,
            wishlists: { owner: true, items: true },
          },
        },
      },
    });
  }

  async delete(id: number, userId) {
    const wish = await this.findById(id);
    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Можно удалять только свои подарки');
    }
    await this.wishRepository.delete(id);
    return wish;
  }

  async copy(id: number, user) {
    const wish = await this.findById(id);
    if (user.id === wish.owner.id) {
      throw new ForbiddenException('Нельзя копировать свои желания');
    }
    wish.copied += 1;

    // создание новой wish на основе копируемой
    await this.create(
      {
        name: wish.name,
        link: wish.link,
        image: wish.image,
        price: wish.price,
        description: wish.description,
      },
      user,
    );

    return await this.wishRepository.save(wish);
  }

  async getWishesUser(id) {
    const wish = await this.wishRepository.find({
      where: { owner: { id } },
      relations: {
        owner: true,
        offers: {
          user: {
            wishes: true,
            offers: true,
            wishlists: { owner: true, items: true },
          },
        },
      },
    });

    return wish;
  }

  async updeteWishOffer(id: number) {
    const wish = this.wishRepository.findOne({ where: { id } });
    return wish;
  }
}
