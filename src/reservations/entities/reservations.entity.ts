import { IReservation } from 'src/interfaces/ireservation.interface'
import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { UsersEntity } from '../../users/entities/users.entity'
import { FieldEntity } from '../../fields/entities/fields.entity'
import { ScheduleEntity } from '../../schedules/entities/schedules.entity'

@Entity({ name: 'reservations' })
export class ReservationsEntity extends BaseEntity implements IReservation {
   @Column()
   fechaHora: string

   @Column()
   estado: string

   @Column()
   mensaje: string

   @ManyToOne(() => UsersEntity, (user) => user.reservation)
   usuario: UsersEntity

   @ManyToOne(() => FieldEntity, (servicio) => servicio.reserva)
   servicio: FieldEntity

   @ManyToOne(() => ScheduleEntity, (hora) => hora.reserva)
   horario: ScheduleEntity
}