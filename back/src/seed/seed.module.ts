import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsType } from "../products/entities/productsType.entity";
import { Gender } from "../products/entities/gender.entity";
import { Categories } from "../products/entities/categories.entity";
import { Products } from "../products/entities/products.entity";
import { Colors } from "../products/entities/colors.entity";
import { ProductsColors } from "../products/entities/productsColors.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductsType, Gender, Categories, Products, Colors, ProductsColors])],
    controllers: [],
    providers: [SeedService, ],
})
export class SeedModule {
        
    }