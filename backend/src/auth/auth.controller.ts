import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from './local/local.guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() request) {
    return this.authService.auth(request.user);
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
