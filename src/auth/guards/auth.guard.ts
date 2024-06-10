import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UsersService } from '../../users/services/users.service'
import { useToken } from '../../utils/use.token'
import { IUseToken } from '../../interfaces/iauth.interface'

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private readonly userService: UsersService,
      private readonly reflector: Reflector
   ) {}

   async canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest<Request>()

      // const token = req.headers['bearer_token']
      const token = req.headers['authorization'].replace('Bearer ', '')
      if (!token || Array.isArray(token)) {
         throw new UnauthorizedException('Invalid token')
      }

      const manageToken: IUseToken | string = useToken(token)

      if (typeof manageToken === 'string') {
         throw new UnauthorizedException(manageToken)
      }

      if (manageToken.isExpired) {
         throw new UnauthorizedException('Token expired')
      }

      const { sub } = manageToken
      const user = await this.userService.findOne(sub)
      if (!user) {
         throw new UnauthorizedException('Invalid user')
      }

      return true
   }
}
