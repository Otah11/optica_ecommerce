import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ProductsColors } from "./productsColors.entity";

@Entity({name: 'colors'})
export class Colors {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    name: string

    @Column()
    hexValue: string

    @OneToMany(()=>ProductsColors, productsColors => productsColors.colors)
    @JoinColumn({name: "productsColors_id"})
    productsColors: ProductsColors[]
}
