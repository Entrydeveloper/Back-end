/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/signup')
  async create(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    const adminName = await this.adminService.gatOneAdminName(createAdminDto.adminName)

    await this.adminService.checkAdminEmail(createAdminDto.email)

    if(adminName) {
      throw new ConflictException({
        success: false,
        message:`${createAdminDto.adminName}은 이미 사용중인 이름입니다 `
      });
    }
    await this.adminService.createAdmin(createAdminDto);

    return {
      success: true
    }
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.getOneAdmin(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body(ValidationPipe) updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminService.deleteAdmin(id);
  }
}
