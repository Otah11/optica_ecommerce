import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { Products } from './entities/products.entity';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
    constructor (private readonly productsService: ProductsService){}

    @Get()
    async getAllProducts(): Promise<Products[]>{
        return this.productsService.getAllProducts();
    }
    
    @Get('polarized')
    async getPolarized(): Promise<Products[]>{
        return this.productsService.getPolarized();
    }
    
    @Get(":id")
    async getProductById(@Param('id',ParseUUIDPipe)id: string){
        return this.productsService.getProductById(id);
    }

}
