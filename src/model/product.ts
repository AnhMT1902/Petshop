import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn({type: "int"})
    public readonly id: number;
    @Column({type: "int"})
    public species: number;
    @Column({type: "int"})
    public price: number;
    @Column({type: "varchar"})
    public name: string;
    @Column({type: "varchar"})
    public gender: number;
    @Column({type: "varchar"})
    public age: number;
    @Column({type: "varchar"})
    public color: number;
    @Column({type: "varchar"})
    public description: string;
}