import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../config/base.entity'
//import { GaleriasEntity } from './galerias.entity'
import { Ifield } from 'src/interfaces/ifield.interface'
import { ReservationsEntity } from '../../reservations/entities/reservations.entity'

@Entity({ name: 'fields' })
export class FieldEntity extends BaseEntity implements Ifield {
   @Column()
   nombre: string

   @Column()
   descripcion: string

   @Column()
   imagen: string

   @Column()
   estaDisponible: boolean

  // @OneToMany(() => GaleriasEntity, (galeria) => galeria.field, { cascade: true })
  // galeria?: GaleriasEntity

   @OneToMany(() => ReservationsEntity, (reserva) => reserva.usuario)
   reserva: ReservationsEntity
}