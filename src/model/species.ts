import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Species {
    @PrimaryGeneratedColumn({type: "int"})
    public readonly id: number;
    @Column({type: "varchar"})
    public species: string;
}