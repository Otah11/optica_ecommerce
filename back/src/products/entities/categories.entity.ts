import { Products } from "./products.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({name: 'categories'})
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name: string

    @ManyToMany(() => Products, products => products.categories)
    @JoinTable({name: 'products_categories',joinColumn: { name: 'category_id' }, inverseJoinColumn: { name: 'product_id' }})
    products: Products[];
}