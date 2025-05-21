// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Psychologist } from 'src/psychologist/psychologist.entity';

export type UserRole = 'PATIENT' | 'PSYCHOLOGIST';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['PATIENT', 'PSYCHOLOGIST'] })
  role: UserRole;

  @OneToOne(() => Psychologist, (psychologist) => psychologist.user)
  psychologistProfile?: Psychologist;
}
