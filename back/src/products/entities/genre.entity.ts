import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./products.entity";

@Entity({name: 'genres'})
export class Genre {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    
    @Column()
    name: string

    @OneToMany(() => Products, products => products.genre)
    @JoinColumn({name: 'genre_id'})
    products: Products[]

}