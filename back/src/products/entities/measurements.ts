import { Column } from "typeorm";

export class Measurements {

    @Column('int')
    lenses: number;
    
    @Column('int')
    bridge: number;

    @Column('int')
    temple: number;

}