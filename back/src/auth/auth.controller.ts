import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/user.dto';
import { LoginUserDto } from './loginUser.dto';

@Controller('auth')
export class AuthController {
 constructor(private readonly authService: AuthService){}
    @Post("register")
    async registerUser(@Body()user: CreateUserDto){
        return await this.authService.registerUser(user);
    }

    @Post("login")
    async loginUser(@Body()user: LoginUserDto){
        return await this.authService.loginUser(user);
    }
}
