import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { ReservationDTO } from '../dto/reservation.dto'
import { ReservationService } from '../services/reservations.service'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('reservations')
//@UseGuards(AuthGuard)
export class ReservationsController {
   constructor(private readonly ReservationService: ReservationService) {}

   @Post()
   public async register(@Body() body: ReservationDTO) {
      return await this.ReservationService.create(body)
   }

   @Get()
   public async findAll() {
      return await this.ReservationService.findAll()
   }

   @Get(':id')
   public async findOne(@Param('id') id: string) {
      return await this.ReservationService.findOne(id)
   }

   @Delete(':id')
   public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.ReservationService.remove(id)
   }
}
