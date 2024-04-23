/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAdminCommentDto {
   @IsString()
   @IsNotEmpty()
   @MinLength(3)
   @MaxLength(1000)
   feedback: string;
}
