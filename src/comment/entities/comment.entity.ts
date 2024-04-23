/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'The value must be at least 1.' })
  @Max(5, { message: 'The value must not exceed 5.' })
  scope: number; // 별점

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(1000)
  feedback: string; // 상담 후기 & 피드백
}
