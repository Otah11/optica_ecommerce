import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export  class LoginUserDto {
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Ingrese su email',
        example: 'hZkzK@example.com'
    })
    email: string;
    
    @IsNotEmpty()
    @ApiProperty({
        description: 'Ingrese su contraseña',
        example: 'contraseña'
    })
    password: string;
}