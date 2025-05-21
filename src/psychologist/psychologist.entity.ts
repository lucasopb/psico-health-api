// src/psychologist/psychologist.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Psychologist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.psychologistProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  licenseNumber: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column('simple-array', { nullable: true })
  specialties?: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pricePerSession?: number;
}
