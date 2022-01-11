import { Exclude } from 'class-transformer';
import { AccountValidation } from 'src/modules/code-validate/entities/account-validation.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @ManyToOne(() => Role, (role) => role.users, { cascade: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => AccountValidation)
  account_validation: AccountValidation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
