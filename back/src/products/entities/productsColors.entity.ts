import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Products } from "./products.entity";
import { Colors } from "./colors.entity";

@Entity({name: 'productsColors'})
export class ProductsColors{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    stock: number

    @Column()
    isPolarized: boolean

    @ManyToOne(()=> Products, products => products.productsColors)
    @JoinColumn({name: 'products_id'})
    products: Products

    @ManyToOne(()=> Colors, colors => colors.productsColors)
    @JoinColumn({name: 'colors_id'})
    colors: Colors
}