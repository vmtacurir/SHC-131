import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { IUser } from 'src/interfaces/Iuser.interface'
import { BaseEntity } from '../../config/base.entity'
import { ROLES } from '../../constants/roles'
import { ReservationsEntity } from '../../reservations/entities/reservations.entity'

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
   @Column()
   firstName: string

   @Column()
   lastName: string

   @Column()
   cellPhone: string

   @Column({ unique: true })
   email: string

   @Column({ unique: true })
   username: string

   @Exclude()
   @Column()
   password: string

   @Column({ type: 'enum', enum: ROLES })
   role: ROLES

   @Exclude()
   @Column()
   isActive: boolean

   @OneToMany(() => ReservationsEntity, (reservation) => reservation.usuario)
   reservation: ReservationsEntity
}
