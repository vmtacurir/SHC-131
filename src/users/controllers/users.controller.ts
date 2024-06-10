import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards
 } from '@nestjs/common'
 import { UserDTO } from '../dto/user.dto'
 import { UsersService } from '../services/users.service'
 import { AuthGuard } from 'src/auth/guards/auth.guard'
 // import { AuthGuard } from '../../auth/guards/auth.guard'
 
 @Controller('users')
 // @UseGuards(AuthGuard)
 export class UsersController {
    constructor(private readonly usersService: UsersService) {}
 
    @Post()
    public async register(@Body() body: UserDTO) {
       return await this.usersService.create(body)
    }
 
    @Get()
    public async findAll() {
       return await this.usersService.findAll()
    }
 
    @Get(':id')
    public async findOne(@Param('id') id: string) {
       return await this.usersService.findOne(id)
    }
 
    // @Put(':id')
    // public async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UserUpdateDTO) {
    //    return await this.usersService.update(body, id)
    // }
 
    @Delete(':id')
    public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
       return await this.usersService.remove(id)
    }
 }