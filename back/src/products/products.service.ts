import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository){}

    async getAllProducts(): Promise<Products[]>{
        return await this.productsRepository.getAllProducts()
    }

    async getProductById(id: string){
        return await this.productsRepository.getProductById(id)
    }

    async getPolarized(): Promise<Products[]>{
        return await this.productsRepository.getPolarized()
    }
}
