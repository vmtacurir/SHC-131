import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { RESERVATIONS_STATES } from 'src/constants/state-reservations'

export class ReservationDTO {
   @IsNotEmpty()
   @IsDateString()
   dateHour: string

   @IsNotEmpty()
   @IsEnum(RESERVATIONS_STATES)
   state: string

   @IsString()
   message: string
}