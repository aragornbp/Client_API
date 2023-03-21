import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Client, (client) => client.contacts)
    @JoinColumn({ name: "client_id" })
    client: Client;
}
