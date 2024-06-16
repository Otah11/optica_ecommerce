import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/products.entity";
import { Repository } from "typeorm";
import { Categories } from "./entities/categories.entity";
import { ProductsType } from "./entities/productsType.entity";
import { Gender } from "./entities/gender.entity";
import { ProductsColors } from "./entities/productsColors.entity";

@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
        @InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>,
        @InjectRepository(ProductsType) private readonly productsTypeRepository: Repository<ProductsType>,
        @InjectRepository(Gender) private readonly genderRepository: Repository<Gender>,
        @InjectRepository(ProductsColors) private readonly productsColorsRepository: Repository<ProductsColors>,
    ){}

    async getAllProducts(): Promise<Products[]>{
       return await this.productsRepository.find({
        relations: [
            'categories','productsType','gender','productsColors.colors'
        ]
       })
    }
    async getProductById(id: string){
        return await this.productsRepository.findOne({where: {id}, relations: {
            categories: true,
            productsType: true,
            gender: true,
        }});
    }
    
    async getPolarized(): Promise<Products[]> {
        const isPolarized = await this.productsRepository
          .createQueryBuilder('products')
          .leftJoinAndSelect('products.productsColors', 'productsColors')
          .leftJoinAndSelect('products.productsType', 'productsType')
          .leftJoinAndSelect('products.gender', 'gender')
          .leftJoinAndSelect('products.categories', 'categories')
          .leftJoinAndSelect('productsColors.colors', 'colors')
          .where('productsColors.isPolarized = :isPolarized', { isPolarized: true })
          .getMany();
    
        return isPolarized;
      }
}