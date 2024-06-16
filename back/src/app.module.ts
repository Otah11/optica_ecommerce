import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import typeOrmConfig from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({ 
      isGlobal: true, load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], useFactory: (configService: ConfigService) => configService.get('typeorm') 
    }),
    ProductsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}

