import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/user.dto";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./loginUser.dto";

@Injectable()
export class AuthRepository {
    constructor(@InjectRepository(User) private readonly userRepository: Repository <User>) {}
    async registerUser(user: CreateUserDto) {
        return await this.userRepository.save(user);
    }
    
    loginUser(user: LoginUserDto) {
        return this.userRepository.findOne({where:{email: user.email, password: user.password}});
    }
}