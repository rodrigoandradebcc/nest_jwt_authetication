import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column('timestamp with time zone')
  date_of_birth: Date;

  @Column('boolean')
  active: boolean;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('timestamp with time zone')
  last_access: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
