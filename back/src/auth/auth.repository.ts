import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../users/user.dto";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./loginUser.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthRepository {
    constructor(@InjectRepository(User) private readonly userRepository: Repository <User>,
                                        private readonly jwtSerivce: JwtService
    ) {}

    async registerUser(user: CreateUserDto): Promise<Partial<User>> {
        
        if(user.password !== user.confirmPassword){
            throw new BadRequestException('Los Passwords no coinciden.');
        }

        const foundUser = await this.userRepository.findOneBy({email: user.email});
        if (foundUser){
            throw new BadRequestException('El Usuario ya existe.')
        }

        const foundCuilCuit = await this.userRepository.findOneBy({cuilcuit: user.cuilcuit});
        if (foundCuilCuit){
            throw new BadRequestException('El CUIT/CUIL ya existe.')
        }

        const foundIngresosBrutos = await this.userRepository.findOneBy({ingresosbrutos: user.ingresosbrutos})
        if (foundIngresosBrutos){
            throw new BadRequestException('El Numero de Ingresos Brutos ya existe.')
        }

        const hashedPassword = await bcrypt.hash(user.password, 12);
        if(!hashedPassword){
            throw new BadRequestException('Error al encriptar el Password');
        }

        const newUser = this.userRepository.create({ ...user, password: hashedPassword});
        await this.userRepository.save(newUser);

        const { role, password, ... userWithOutPassword } = newUser;
        return userWithOutPassword;

    }
    
    loginUser(user: LoginUserDto) {
        return this.userRepository.findOne({where:{email: user.email, password: user.password}});
    }

    
}