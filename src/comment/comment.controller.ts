/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body(ValidationPipe) createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
