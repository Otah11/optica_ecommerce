import { Categories } from "src/products/entities/categories.entity";
import { Cart } from "../../purchase_orders/cart.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ProductsType } from './productsType.entity';
import { Gender } from "./gender.entity";
import { Measurements } from "./measurements";
import { ProductsColors } from './productsColors.entity';

@Entity({name: 'products'})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    price: number

    @Column()
    description: string

    @Column({default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'})
    image: string

    @Column(()=> Measurements)
    measurements: Measurements

    @ManyToMany(()=> Cart, cart => cart.products)
    @JoinTable({name: 'products_cart', joinColumn: {name: 'product_id'}, inverseJoinColumn: {name: 'cart_id'}})
    cart: Cart[]

    @ManyToMany(()=> Categories, categories => categories.products)
    @JoinTable({name: 'products_categories', joinColumn: {name: 'product_id'}, inverseJoinColumn: {name: 'category_id'}})
    categories: Categories[]

    @ManyToOne(()=> ProductsType, productsType => productsType.products)
    @JoinColumn({name: 'type_product_id'})
    productsType: ProductsType
    
    @ManyToOne(()=> Gender, gender => gender.products)
    @JoinColumn({name: 'gender_id'})
    gender: Gender

    @OneToMany(()=> ProductsColors, productsColors => productsColors.products)
    @JoinColumn({name: 'productsColors_id'})
    productsColors: ProductsColors[]
}