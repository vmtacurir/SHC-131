import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FieldsModule } from './fields/fields.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SchedulesModule } from './schedules/schedules.module';
import { SchedulesController } from './schedule/controllers/schedules.controller';

@Module({
  imports: [AuthModule, UsersModule, FieldsModule, ReservationsModule, SchedulesModule],
  controllers: [AppController, SchedulesController],
  providers: [AppService],
})
export class AppModule {}
