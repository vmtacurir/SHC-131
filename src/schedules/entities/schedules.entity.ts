import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
import { ISchedule } from 'src/interfaces/ischedule.interface'
import { ReservationsEntity } from '../../reservations/entities/reservations.entity'

@Entity({ name: 'schedules' })
export class ScheduleEntity extends BaseEntity implements ISchedule {
   @Column()
   time: string

   @Column()
   isAvailable: boolean

   @Column()
   hora: string

   @Column()
   estaDisponible: boolean

   @OneToMany(() => ReservationsEntity, (reservation) => reservation.usuario)
   reserva: ReservationsEntity
}