import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
    private readonly wishService: WishesService,
  ) {}
  // функция создания и сохрание пользователя в бд
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (user) {
      throw new ForbiddenException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }

    const hashedPassword = await this.bcryptService.hashPassword(
      createUserDto.password,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  // поиск всех юзеров
  async findAll() {
    return await this.userRepository.find({});
  }

  // поиск пользователя по id
  async findOne(id) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Такого пользователя нет');
    }
    return user;
  }

  // поиск пользователя по username
  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: [
        { username: updateUserDto?.username },
        { email: updateUserDto?.email },
      ],
    });

    if (user) {
      throw new ForbiddenException(
        'Пользователь с таким email или username уже зарегистрирован',
      );
    }

    if (updateUserDto.password) {
      const hashedPassword = await this.bcryptService.hashPassword(
        updateUserDto.password,
      );
      updateUserDto.password = hashedPassword;
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async getYourWishes(id: number) {
    const wish = this.wishService.getWishesUser(id);
    return wish;
  }

  async getUserWishes(username: string) {
    const user = await this.findByUsername(username);
    const wishes = await this.getYourWishes(user.id);

    return wishes;
  }

  async findQueryUser(query) {
    const user = await this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });

    return user;
  }
}
