import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/user.dto';
import { LoginUserDto } from './loginUser.dto';

@Controller('auth')
export class AuthController {
 constructor(private readonly authService: AuthService){}
    @Post("register")
    async registerUser(@Body()createUserDto: CreateUserDto){
        const user = await this.authService.registerUser(createUserDto);
        return{
            message: 'Usuario Solicitado, nos podremos en contacto a la brevedad',
            user,
        }
    }

    @Post("login")
    async loginUser(@Body()user: LoginUserDto){
        return await this.authService.loginUser(user);
    }
}
