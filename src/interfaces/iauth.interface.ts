import { ROLES } from 'src/constants/roles'
import { UsersEntity } from 'src/users/entities/users.entity'

export interface IAuthBody {
   username: string
   password: string
}

export interface IPayloadToken {
   sub: string
   role: ROLES
}

// export interface IAuthResponse {
//    accessToken: string
//    user: UsersEntity
// }

// export interface IAuthResponse {
//    accessToken: string
//    user: UsersEntity
// }
export interface IAuthResponse {
   token: string
}

export interface IAuthTokenResult {
   //---> esto se genero con https://app.quicktype.io
   role: string
   sub: string
   iat: number
   exp: number
}

export interface IUseToken {
   //---> para verificar si expiro el token
   role: string
   sub: string
   isExpired: boolean
}
