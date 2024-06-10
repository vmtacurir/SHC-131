import { Body, Controller, Get, Post, Req, Request, UnauthorizedException } from '@nestjs/common'
import { AuthDTO } from '../dto/auth.dto'
import { AuthService } from '../services/auth.service'
import { IAuthResponse } from '../../interfaces/iauth.interface'

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   public async login(@Body() { username, password }: AuthDTO): Promise<IAuthResponse> {
      const userValidate = await this.authService.validateUser(username, password)

      if (!userValidate) {
         throw new UnauthorizedException('Credenciales incorrectos, intente de nuevo')
      }

      const jwt = await this.authService.generateJWT(userValidate)

      return jwt
   }
   @Get('/perfil')
   public async profile(@Req() req: Request): Promise<any> {
      const token = req.headers['authorization'].split(' ')[1]
      if (!token) {
         throw new UnauthorizedException('No autorizado')
      }
      return await this.authService.getUserByToken(token)
   }
}
