import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FieldsController } from './controllers/fields.controller'
import { FieldEntity } from './entities/fields.entity'
import { FieldsService } from './services/fields.service'


@Global()
@Module({
   imports: [TypeOrmModule.forFeature([FieldEntity])],
   providers: [FieldsService],
   controllers: [FieldsController],
   exports: [TypeOrmModule],
})
export class FieldsModule {}