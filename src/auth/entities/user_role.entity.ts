import { Role } from 'src/role-permission/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, {})
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

  @Column({ type: 'timestamptz', default: null })
  assignDate: Date;

  @Column({ default: null })
  assignedBy: number;

  @Column({ type: 'timestamptz', default: null })
  expiryDate: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;
}
