import { PurchaseOrders } from "../purchase_orders/purchase_orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    name: string;

    @Column({ unique: true }) //para que el email sea unico
    email: string;

    @Column()
    password: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    phone: number;
        
    @Column({default: 'user'})
    role: string;

    @OneToMany(()=> PurchaseOrders, purchase_orders => purchase_orders.user)
    @JoinColumn({ name: 'purchase_orders_id'})
    purchase_orders: PurchaseOrders[]
  
}