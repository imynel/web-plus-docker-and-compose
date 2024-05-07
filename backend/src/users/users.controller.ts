import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { FindUsersDto } from './dto/find-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  async findMe(@Req() req) {
    const user = req.user;
    return await this.usersService.findOne(user.id);
  }

  @Patch('me')
  updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getYourWishes(@Req() req) {
    return this.usersService.getYourWishes(req.user.id);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  getUserWish(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }

  @Post('find')
  findUser(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findQueryUser(findUsersDto.query);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.usersService.findOne(+id);
  }
}
