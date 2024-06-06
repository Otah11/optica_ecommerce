import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";

@Entity({name:'purchase_orders'})
export class PurchaseOrders {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    date: Date;

    @ManyToOne(() => User, user => user.purchase_orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id'})//la llave foranea
    user: User;

    @OneToOne(() => Cart, cart => cart.purchase_orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'cart_id'})
    cart: Cart
}
