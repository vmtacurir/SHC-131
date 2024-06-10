import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { ErrorManager } from '../../utils/error.manager'
import { ReservationsEntity } from '../entities/reservations.entity'
import { ReservationDTO } from '../dto/reservation.dto'

@Injectable()
export class ReservationService {
   constructor(
      @InjectRepository(ReservationsEntity)
      private readonly reservationRepository: Repository<ReservationsEntity>
   ) {}

   /*public async create(body: ReservationDTO): Promise<ReservationsEntity> {
      try {
         return await this.reservationRepository.save(body)
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }*/
      public async create(body: ReservationDTO): Promise<ReservationsEntity> {
         try {
            const reservationEntity = new ReservationsEntity();
            // Aquí debes asignar todos los campos necesarios de body a reservationEntity
            // Por ejemplo:
            // reservationEntity.campo1 = body.campo1;
            // reservationEntity.campo2 = body.campo2;
            // ...
      
            return await this.reservationRepository.save(reservationEntity);
         } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
         }
      }

   public async findAll(): Promise<ReservationsEntity[]> {
      try {
         const reservations: ReservationsEntity[] = await this.reservationRepository.find()
         if (reservations.length === 0) {
            throw new ErrorManager({
               type: 'BAD_REQUEST',
               message: 'No se encontro resultado',
            })
         }
         return reservations
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }

   public async findOne(id: string): Promise<ReservationsEntity> {
      try {
         const reservation: ReservationsEntity = await this.reservationRepository.createQueryBuilder('reservation')
            .where({ id })
            .getOne()
         if (!reservation) {
            throw new ErrorManager({
               type: 'BAD_REQUEST',
               message: 'No se encontro resultado',
            })
         }
         return reservation
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }

   public async remove(id: string): Promise<DeleteResult | undefined> {
      try {
         const reservation: DeleteResult = await this.reservationRepository.delete(id)
         if (reservation.affected === 0) {
            throw new ErrorManager({
               type: 'BAD_REQUEST',
               message: 'No se pudo borrar',
            })
         }
         return reservation
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }
}