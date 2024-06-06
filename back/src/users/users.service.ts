import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor (private readonly userRpository: UsersRepository) {}

    async getAllUsers() {
        return  await this.userRpository.getAllUsers();
    }
    async getUserById(id: string) {
        return await this.userRpository.getUserById(id);
    }
}
