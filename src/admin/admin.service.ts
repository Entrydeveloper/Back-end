/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

// 살담사 계정
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminDB: Repository<Admin>,
  ) {}

  async createAdmin(
    createAdminDto: CreateAdminDto,
  ): Promise<{ success: boolean }> {
    const salt = await bcrypt.genSalt(); 
    const password = await this.hashPassword(createAdminDto.password, salt)

    await this.adminDB.insert({
      adminName: createAdminDto.adminName,
      email: createAdminDto.email,
      password
    })

    return {
      success: true,
    };
  }

  async hashPassword(password: string, salt: string){
    return await bcrypt.hash(password, salt);
  }

  async checkAdminEmail(email: string): Promise<void> {
    const existingEmail = await this.adminDB.findOneBy({ email });

    if (existingEmail) {
      throw new ConflictException({
        success: false,
        message: `${email}은 이미 사용중인 이메일 입니다`
      });
    }
  }

  async gatOneAdminName(adminName: string): Promise<Admin> {
    return await this.adminDB.findOneBy({ adminName });
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminDB.find();
  }

  async getOneAdmin(id: number): Promise<Admin> {
    const adimn = await this.adminDB.findOneBy({ id });

    if (!adimn) {
      throw new NotFoundException(`${id}를 가진 관리자를 찾지 못했습니다`);
    }

    return adimn;
  }

  async deleteAdmin(id: number): Promise<{ success: boolean }> {
    const admin = await this.adminDB.delete({ id });

    if (admin.affected === 0) {
      throw new NotFoundException(`지우려는 관리자${id}가 없습니다`);
    }
    return {
      success: true,
    };
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<{ success: boolean }> {
    await this.getOneAdmin(id);

    const result = await this.adminDB.update({ id }, updateAdminDto);

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
}
