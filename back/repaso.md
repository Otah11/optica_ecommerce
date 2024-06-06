# Creación de un Proyecto NestJS con TypeORM y PostgreSQL

## Crear un nuevo proyecto con NestJS

En la terminal, ejecuta el siguiente comando para crear un nuevo proyecto de NestJS:

```bash
nest new "nombre del proyecto"


Instalar dependencias
Instala las siguientes dependencias necesarias para el proyecto:


npm install @nestjs/typeorm @nestjs/config typeorm pg dotenv
npm install --save-dev @types/uuid




Generar componentes con NestJS
Utiliza el siguiente comando para generar componentes en NestJS. Este comando crea el directorio si aún no está hecho:

nest generate "lo que necesite" "directorio"

Crear y configurar Variables de Entorno y Base de Datos
Archivo .development.env
Crea un archivo .development.env en la raíz del proyecto con el siguiente contenido:

DB_NAME=m4repaso
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=juan1234



Archivo de configuración de TypeORM
Crea una carpeta config y dentro de ella un archivo typeorm.config.ts con el siguiente contenido:


import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.development.env' });

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: ['error'],
    //dropSchema: true
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);


Estructura inicial del módulo de "users"
Crea la estructura inicial para el módulo de usuarios, que incluirá:

controllers
service
repository
entity
# 
## como se arma una entity
import { PurchaseOrders } from "../purchase_orders/purchase_orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    name: string;

    @Column({ unique: true }) //para que el email sea unico
    email: string;

    @Column()
    password: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    phone: number;
        
    @Column()
    role: string;

    @OneToMany(()=> PurchaseOrders, purchase_orders => purchase_orders.user)
    purchase_orders: PurchaseOrders[]
  
}

##

despues creamos la entidad de purchae_order

import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";

@Entity({name:'purchase_orders'})
export class PurchaseOrders {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    date: Date;

    @ManyToOne(() => User, user => user.purchase_orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user:id'})//la llave foranea
    user: User;

    @OneToOne(() => Cart, cart => cart.purchase_orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'cart:id'})
    cart: Cart
}



despues creamos entidad de cart



##
camino para crear usuario

controller --> servicio --> repositorio

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Post("create")
    async createUser(user: CreateUserDto){
        return this.usersService.createUser(user);
    }

}

@Injectable()
export class UsersService {
    constructor (private readonly userRpository: UsersRepository) {}
    async createUser(user: CreateUserDto) {
        return await this.userRpository.createUser(user);
    }
}

@Injectable()
export class UsersRepository {
    constructor(private readonly userRepository: Repository<User>) {}
    async createUser(user: Partial<User>) {
        return this.userRepository.save(user);

    }
    
}


Despues hacemos las rutas del CRUD completas

