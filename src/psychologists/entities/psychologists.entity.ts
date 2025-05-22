import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Psychologist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 50 })
    firstName: string;

    @Column({ nullable: false, length: 120 })
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    birth: string;

    @Column({ nullable: true })
    registration: string;

    @Column({ nullable: false, unique: true })
    cpf: string;

    @Column({ nullable: true })
    area: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}