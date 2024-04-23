/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

// 일반 유저계정
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(createUserDto.password, salt)

    await this.user.insert({ 
      username: createUserDto.username,
      email: createUserDto.email,
      password
    });
  }

  async hashPassword(password: string, salt: string){
    return await bcrypt.hash(password, salt);
  }

  async checkUserEmail(email: string): Promise<void> {
    const existingEmail = await this.user.findOneBy({ email });
    
    if (existingEmail) {
      throw new ConflictException({
          success: false,
          message: `${email}은 이미 사용중인 이메일 입니다`
        });
    }
  }

  async findAll(): Promise<User[]> {
    return await this.user.find();
  }

  async getOneUser(id: number): Promise<User> {
    return await this.user.findOneBy({ id });
  }

  async getOneName(username: string): Promise<User> {
    return await this.user.findOneBy({ username });
  }

  async deleteUser(id: number): Promise<{ success: boolean }> {
    const user = await this.user.delete({ id });

    if (!user) {
      throw new NotFoundException(`지우려는 유저${id}가 없습니다`);
    }
    return {
      success: true,
    };
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean }> {
    await this.getOneUser(id);

    const result = await this.user.update({ id }, updateUserDto);

    if (result.affected) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  public async updatePassword(id: number, updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt();
    const updatePassword = await this.hashPassword(updateUserDto.password, salt)

    await this.user.update(
      { id },
      { password: updatePassword }
    )
  }
}
