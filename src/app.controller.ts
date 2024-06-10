import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   getHello(): string {
      return this.appService.getHello()
   }

   @Get('/saludo')
   getSaludo(): string {
      return this.appService.getSaludo()
   }

   @Get('/tu-saludo/:nombre')
   getTuSaludo(@Param('nombre') nombre: string): string {
      return this.appService.getTuSaludo(nombre)
   }
}
