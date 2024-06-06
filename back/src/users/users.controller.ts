import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}


    @Get()
    async getAllUsers(){
        return this.usersService.getAllUsers();
    }
    @Get(":id")
    async getUserById(@Param(ParseUUIDPipe)id: string){
        return this.usersService.getUserById(id);
    }

}
