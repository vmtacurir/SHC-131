import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReservationsController } from './controllers/reservations.controller'
import { ReservationsEntity } from './entities/reservations.entity'
import { ReservationService } from './services/reservations.service'

@Global()
@Module({
   imports: [TypeOrmModule.forFeature([ReservationsEntity])],
   providers: [ReservationService],
   controllers: [ReservationsController],
   exports: [TypeOrmModule],
})
export class ReservationsModule {}