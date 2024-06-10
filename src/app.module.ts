import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DataSourceConfig } from './config/data.source'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { SchedulesModule } from './schedules/schedules.module'
import { FieldsModule } from './fields/fields.module'
import { ReservationsModule } from './reservations/reservations.module'
import { AuthModule } from './auth/auth.module'

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: `.env`,
         isGlobal: true,
      }),
      TypeOrmModule.forRoot({ ...DataSourceConfig }),
      UsersModule,
      FieldsModule,
      SchedulesModule,
      ReservationsModule,
      AuthModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}