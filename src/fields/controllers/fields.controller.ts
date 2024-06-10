import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { FieldsService } from '../services/fields.service'
import { FieldDTO } from '../dto/fields.dto'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('fields')
@UseGuards(AuthGuard)
export class FieldsController {
   constructor(private readonly fieldsService: FieldsService) {}

   @Post()
   public async register(@Body() body: FieldDTO) {
      return await this.fieldsService.create(body)
   }

   @Get()
   public async findAll() {
      return await this.fieldsService.findAll()
   }

   @Get(':id')
   public async findOne(@Param('id') id: string) {
      return await this.fieldsService.findOne(id)
   }

   @Delete(':id')
   public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.fieldsService.remove(id)
   }
}
