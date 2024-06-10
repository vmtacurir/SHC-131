import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { ROLES } from 'src/constants/roles'

export class UserDTO {
   @IsNotEmpty()
   @IsString()
   firstName: string

   @IsString()
   lastName: string

   @IsNotEmpty()
   @IsString()
   cellPhone: string

   @IsNotEmpty()
   @IsEmail()
   @IsString()
   email: string

   @IsNotEmpty()
   @IsString()
   username: string

   @IsNotEmpty()
   @IsString()
   password: string

   @IsNotEmpty()
   @IsEnum(ROLES)
   role: ROLES

   @IsNotEmpty()
   @IsBoolean()
   isActive: boolean
}

export class UserUpdateDTO {
   @IsNotEmpty()
   @IsString()
   firstName: string

   @IsString()
   lastName: string

   @IsNotEmpty()
   @IsString()
   cellPhone: string

   @IsNotEmpty()
   @IsEmail()
   @IsString()
   email: string

   @IsNotEmpty()
   @IsString()
   username: string

   @IsNotEmpty()
   @IsString()
   password: string

   @IsNotEmpty()
   @IsEnum(ROLES)
   role: ROLES

   @IsNotEmpty()
   @IsBoolean()
   isActive: boolean
}
