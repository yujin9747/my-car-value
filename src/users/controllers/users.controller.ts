import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService, UsersIservice } from '../services/users.iservice';
import { UserDto } from '../dtos/user.dto';
import { Serialize } from './decorators/interceptor.decorator';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(@Inject(UserService) private userService: UsersIservice) {}
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  // @Serialize(UserDto)
  @Get(':id')
  findUser(@Param('id') id: string) {
    console.log('handler is running');
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
