/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

// 상담 후기 & 별점
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private comment: Repository<Comment>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<{ success: boolean }> {
    const { scope, feedback } = createCommentDto;

    const comment = this.comment.create({
      scope,
      feedback,
    });

    await this.comment.save(comment);
    return {
      success: true,
    };
  }

  findAll(): Promise<Comment[]> {
    return this.comment.find();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.comment.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException(`Can't find Comment with id ${id}`);
    }
    return comment;
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const resuit = await this.comment.delete({ id });

    if (resuit.affected === 0) {
      throw new NotFoundException(`Can't find Comment with id ${id}`);
    }
    return {
      success: true,
    };
  }
}
