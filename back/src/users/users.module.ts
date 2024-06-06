import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])], //va todo lo que son modulos (en referencia a una entidad)
  controllers: [UsersController], 
  providers: [UsersService, UsersRepository], //va todo lo que son servicios (injectables)
})
export class UsersModule {}
