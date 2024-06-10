import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as morgan from 'morgan'
import { CORS } from './constants/cors'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)
   app.use(morgan('dev'))
   app.useGlobalPipes(
      new ValidationPipe({
         transformOptions: {
            enableImplicitConversion: true,
         },
      })
   )

   const reflector = app.get(Reflector) //Me permite quitar los campos que excluya en DTO
   app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
   const configService = app.get(ConfigService)
   app.enableCors(CORS)
   app.setGlobalPrefix('api')
   await app.listen(configService.get('PORT'))
   console.log(`Application Project ON running on: ${await app.getUrl()}`)
}
bootstrap()
