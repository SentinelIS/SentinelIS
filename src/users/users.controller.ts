import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SetupDto } from './dto/setup.dto';

@Controller('api') // Setting a base path for all routes in this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('setup')
  async setup(@Body() setupDto: SetupDto) {
    return this.usersService.setup(setupDto);
  }
}