import { Contact } from "./Contact";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("clients")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "numeric" })
    phone: number;

    @CreateDateColumn()
    registered_date: Date;

    @Column({ default: true })
    is_active: boolean;

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[];
}
