/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AdminCommentService } from './admin-comment.service';
import { CreateAdminCommentDto } from './dto/create-admin-comment.dto';

@Controller('admin-comment')
export class AdminCommentController {
  constructor(private readonly adminCommentService: AdminCommentService) {}

  @Post()
  create(@Body(ValidationPipe) createAdminCommentDto: CreateAdminCommentDto) {
    return this.adminCommentService.createAdminComment(createAdminCommentDto);
  }

  @Get()
  findAll() {
    return this.adminCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminCommentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminCommentService.remove(id);
  }
}
