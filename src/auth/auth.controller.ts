/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  singIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.sinIn(createUserDto);
  }

  @Post('/AdminIn')
  AdminsingIn(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.adminSinIn(createAdminDto);
  }
}
