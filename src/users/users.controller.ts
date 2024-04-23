/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Put,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  public async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ success: boolean }> {
    const username = await this.usersService.getOneName(createUserDto.username)
    
    await this.usersService.checkUserEmail(createUserDto.email)

    if(username) {
      throw new ConflictException({
        success: false,
        message:`${createUserDto.username}은 이미 사용중인 이름입니다 `
      });
    }
    await this.usersService.createUser(createUserDto);

    return {
      success: true
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number) {
    const user = await this.usersService.getOneUser(id)

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`
      });
    }

    return {
      success: true,
      body: user
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Put(':id/update')
  @UseGuards(AuthGuard())
  public async updatePassword(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ): Promise<{ success: boolean }> {
    const user = await this.usersService.getOneUser(id)

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`
      });
    }
    await this.usersService.updatePassword(id, updateUserDto);

    return {
      success: true
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
