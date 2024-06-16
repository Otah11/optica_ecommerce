import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Products } from './entities/products.entity';
import { Gender } from './entities/gender.entity';
import { ProductsType } from './entities/productsType.entity';
import { ProductsRepository } from './products.repository';
import { ProductsColors } from './entities/productsColors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products, Gender, ProductsType, ProductsColors])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
