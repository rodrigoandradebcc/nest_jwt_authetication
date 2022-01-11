import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('account_validation')
export class AccountValidation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
