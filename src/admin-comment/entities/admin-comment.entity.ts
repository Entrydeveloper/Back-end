/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminComment {
   @PrimaryGeneratedColumn()
   id: number;
   
   @Column()
   @IsString()
   @IsNotEmpty()
   @MinLength(3)
   @MaxLength(1000)
   feedback: string; // 상담 후기 & 피드백
}
