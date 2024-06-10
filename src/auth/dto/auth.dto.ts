import { IsNotEmpty, IsString } from 'class-validator'
import { IAuthBody } from 'src/interfaces/iauth.interface'

export class AuthDTO implements IAuthBody {
   @IsNotEmpty()
   @IsString()
   username: string

   @IsNotEmpty()
   @IsString()
   password: string
}
