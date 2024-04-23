/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminCommentDto } from './dto/create-admin-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminComment } from './entities/admin-comment.entity';
import { Repository } from 'typeorm';

// 선생님 상담 후기
@Injectable()
export class AdminCommentService {
  constructor(
    @InjectRepository(AdminComment)
    private readonly adminComment: Repository<AdminComment>,
  ) {}

  async createAdminComment(
    createAdminCommentDto: CreateAdminCommentDto,
  ): Promise<{ success: boolean }> {
    const { feedback } = createAdminCommentDto;
    const AdminComment = this.adminComment.create({ feedback });

    await this.adminComment.save(AdminComment);
    return {
      success: true,
    };
  }

  findAll(): Promise<AdminComment[]> {
    return this.adminComment.find();
  }

  async findOne(id: number): Promise<AdminComment> {
    const AdminComment = await this.adminComment.findOneBy({ id });

    if (!AdminComment) {
      throw new NotFoundException(`Can't find AdminComment with id ${id}`);
    }
    return AdminComment;
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const resuit = await this.adminComment.delete({ id });

    if (resuit.affected === 0) {
      throw new NotFoundException(`Can't find AdminComment with id ${id}`);
    }
    return {
      success: true,
    };
  }
}
