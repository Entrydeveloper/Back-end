/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginAdminDto {
   @IsString()
   @MinLength(4)
   @MaxLength(15)
   @IsNotEmpty()
   adminName: string;
 
   @IsString()
   @MinLength(8)
   @MaxLength(20)
   @IsNotEmpty()
   @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
     message: 'password only accepts english and number and !? and @',
   })
   password: string;
}