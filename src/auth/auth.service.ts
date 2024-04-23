/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/Login.Dto';
import * as bcrypt from 'bcryptjs';
import { LoginAdminDto } from './dto/Login.Admin.Dto';
import { AdminService } from 'src/admin/admin.service';

// 인증
@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  async sinIn(dto: LoginDto) {
    const { username, password } = dto;

    const user = await this.userService.getOneName(dto.username);
   
    if (!user || undefined) {
      throw new UnauthorizedException(
        `Invalid username ${username}`,
      );
    }

    const isPasswordValidated = await bcrypt.compare(password, user.password);

    if (!isPasswordValidated || undefined) {
      throw new UnauthorizedException(`Invalid password`);
    }

    const payload = { username: username };
    const token = this.jwt.sign(payload);

    return {
      token: token,
    };
  }

  async adminSinIn(dto: LoginAdminDto) {
    const { adminName, password } = dto; 

    const admin = await this.adminService.gatOneAdminName(dto.adminName);

    if(!admin || undefined) {
      throw new UnauthorizedException(
        `Invalid admin ${adminName}`,
      );
    }
    const isPasswordValidated = await bcrypt.compare(password, admin.password);

    if (!isPasswordValidated || undefined) {
      throw new UnauthorizedException(`Invalid password`);
    }

    const payload = { adminName: adminName};
    const token = this.jwt.sign(payload);

    return {
      token: token,
    };

  }
}
