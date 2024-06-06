import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from './users.entity';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}//cada vez que se necesita una entidad, se usa @InjectRepository

    async getAllUsers() {
        return await this.userRepository.find();
    }
    async getUserById(id: string) {
        return await this.userRepository.findOneBy({ id } );
    }


}