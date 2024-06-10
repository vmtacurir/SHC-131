import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class FieldDTO {
   @IsNotEmpty()
   @IsString()
   nombre: string

   @IsString()
   descripcion: string

   @IsString()
   imagen: string

   @IsNotEmpty()
   @IsBoolean()
   estaDisponible: boolean
}
