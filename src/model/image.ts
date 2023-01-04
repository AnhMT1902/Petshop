import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn({type: "int"})
    public readonly id: number;
    @Column({type: "int"})
    public id_product: number;
    @Column({type: "text"})
    public image: string;
}