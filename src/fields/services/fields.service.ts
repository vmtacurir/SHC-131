import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { ErrorManager } from '../../utils/error.manager'
import { FieldEntity } from '../entities/fields.entity'
import { FieldDTO } from '../dto/fields.dto'

@Injectable()
export class FieldsService {
   constructor(
      @InjectRepository(FieldEntity)
      private readonly fieldRepository: Repository<FieldEntity>
   ) {}

   public async create(body: FieldDTO): Promise<FieldEntity> {
      try {
         return await this.fieldRepository.save(body)
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }

   public async findAll(): Promise<FieldEntity[]> {
      try {
         const fields: FieldEntity[] = await this.fieldRepository.find()
         if (fields.length === 0) {
            throw new ErrorManager({
               type: 'BAD_REQUEST',
               message: 'No se encontro resultado',
            })
         }
         return fields
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }

   public async findOne(id: string): Promise<FieldEntity> {
      try {
         const field: FieldEntity = await this.fieldRepository
            .createQueryBuilder('field')
            .where({ id })
            .getOne()
         if (!field) {
            throw new ErrorManager({
               type: 'BAD_REQUEST',
               message: 'No se encontro resultado',
            })
         }
         return field
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }

   public async remove(id: string): Promise<DeleteResult | undefined> {
      try {
         const field: DeleteResult = await this.fieldRepository.delete(id)
         if (field.affected === 0) {
            throw new ErrorManager({
               type: 'BAD_REQUEST',
               message: 'No se pudo borrar',
            })
         }
         return field
      } catch (error) {
         throw ErrorManager.createSignatureError(error.message)
      }
   }
}
