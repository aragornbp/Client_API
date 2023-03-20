import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";

@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: "numeric" })
    phone: number;

    @CreateDateColumn()
    registered_date: Date;

    @ManyToOne(() => Client, (client) => client.id)
    client: Client;

    @Column({ default: true })
    is_active: boolean;
}
