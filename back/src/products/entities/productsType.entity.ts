import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Products } from "./products.entity";

@Entity({ name: 'type_product' })
export class ProductsType {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @Column()
    name: string;

    @OneToMany(() => Products, products => products.productsType)
    @JoinColumn({ name: 'product_id' })
    products: Products[]


}