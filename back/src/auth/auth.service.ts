import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/user.dto';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './loginUser.dto';

@Injectable()
export class AuthService {
    constructor (private readonly authRepository: AuthRepository) {}
    async registerUser(user: CreateUserDto) {
        return await this.authRepository.registerUser(user);
    }
    async loginUser(user: LoginUserDto) {
        return await this.authRepository.loginUser(user);
    }
}
