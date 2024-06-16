import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/user.dto';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './loginUser.dto';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
    constructor (private readonly authRepository: AuthRepository) {}

    async registerUser(user: CreateUserDto): Promise<Partial<User>> {
        return await this.authRepository.registerUser(user);
    }
    async loginUser(user: LoginUserDto) {
        return await this.authRepository.loginUser(user);
    }
}
