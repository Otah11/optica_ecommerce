import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { PurchaseOrders } from "./purchase_orders.entity";
import { Products } from "src/products/entities/products.entity";

@Entity({name:'cart'})
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @Column()
    total_price: number;
    
    @Column()
    status: string;

    @OneToOne(() => PurchaseOrders, purchase_orders => purchase_orders.cart)
    @JoinColumn({name: 'purchase_orders_id'})
    purchase_orders: PurchaseOrders

    @ManyToMany(() => Products, product => product.cart)
    @JoinTable({name: 'products_id'})
    products: Products[]
}