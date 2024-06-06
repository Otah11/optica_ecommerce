import { Categories } from "src/products/entities/categories.entity";
import { Cart } from "../../purchase_orders/cart.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { TypeProduct } from "./typeProduct.entity";
import { Genre } from "./genre.entity";
import { Measures } from "./measures";

@Entity({name: 'products'})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name: string

    @Column()
    stock: number

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    image: string

    @Column(()=> Measures)
    measures: Measures

    @ManyToMany(()=> Cart, cart => cart.products)
    @JoinTable({name: 'products_cart', joinColumn: {name: 'product_id'}, inverseJoinColumn: {name: 'cart_id'}})
    cart: Cart[]

    @ManyToMany(()=> Categories, categories => categories.products)
    @JoinTable({name: 'products_categories', joinColumn: {name: 'product_id'}, inverseJoinColumn: {name: 'category_id'}})
    categories: Categories[]

    @ManyToOne(()=> TypeProduct, typeProduct => typeProduct.products)
    @JoinColumn({name: 'type_product_id'})
    typeProduct: TypeProduct
    
    @ManyToOne(()=> Genre, genre => genre.products)
    @JoinColumn({name: 'genre_id'})
    genre: Genre
    

}