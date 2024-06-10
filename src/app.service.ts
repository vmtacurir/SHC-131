import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
   getHello(): string {
      return 'Hello World!'
   }

   getSaludo(): string {
      return 'Hola, Soy Javier de la carrera de Ingeniería en Sistemas'
   }

   getTuSaludo(nombre: string): string {
      return `Hola, ${nombre} como estas?`
   }
}

