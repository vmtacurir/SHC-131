import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UsersEntity } from '../../users/entities/users.entity'
import { UsersService } from '../../users/services/users.service'
import { IAuthResponse, IPayloadToken } from '../../interfaces/IAuth.interface'

@Injectable()
export class AuthService {
   constructor(private readonly userService: UsersService) {}

   public async validateUser(username: string, password: string): Promise<UsersEntity | null> {
      const userByUsername = await this.userService.findBy({
         key: 'username',
         value: username,
      })
      const userByEmail = await this.userService.findBy({
         key: 'email',
         value: username,
      })

      if (userByUsername) {
         const match = await bcrypt.compare(password, userByUsername.password)
         if (match) return userByUsername
      }

      if (userByEmail) {
         const match = await bcrypt.compare(password, userByEmail.password)
         if (match) return userByEmail
      }

      return null
   }

   public signJWT({
      payload,
      secret,
      expires,
   }: {
      payload: jwt.JwtPayload
      algorithm: 'RS256'
      secret: string
      expires: number | string
   }): string {
      return jwt.sign(payload, secret, { expiresIn: expires })
   }

   // public async generateJWT(user: UsersEntity): Promise<IAuthResponse> {
   //    const getUser = await this.userService.findOne(user.id)
   //    const payload: IPayloadToken = {
   //       role: getUser.role,
   //       sub: getUser.id,
   //    }

   //    return {
   //       accessToken: this.signJWT({
   //          payload,
   //          algorithm: 'RS256',
   //          secret: process.env.JWT_SECRET,
   //          expires: +process.env.JWT_EXPIRATION_TIME,
   //       }),
   //       user,
   //    }
   // }

   public async generateJWT(user: UsersEntity): Promise<IAuthResponse> {
      const getUser = await this.userService.findOne(user.id)
      const payload: IPayloadToken = {
         role: getUser.role,
         sub: getUser.id.toString(),
      }
      return {
         token: this.signJWT({
            payload,
            algorithm: 'RS256',
            secret: process.env.JWT_SECRET,
            expires: +process.env.JWT_EXPIRATION_TIME,
         }),
      }
   }
   
   //get user by token
   public async getUserByToken(token: string): Promise<UsersEntity> {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as IPayloadToken
      return await this.userService.findOne(payload.sub)
   }
}
