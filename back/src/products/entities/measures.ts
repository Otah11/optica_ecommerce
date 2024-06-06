import { Column } from "typeorm";

export class Measures {

    @Column('int')
    lenses: number;
    
    @Column('int')
    bridge: number;

    @Column('int')
    temple: number;

}