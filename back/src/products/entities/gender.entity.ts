import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./products.entity";

@Entity({name: 'genders'})
export class Gender {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
       
    @Column()
    name: string

    @OneToMany(() => Products, products => products.gender)
    @JoinColumn({name: 'gender_id'})
    products: Products[]

}