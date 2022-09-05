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

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

  @Column({ type: 'timestamptz', nullable: true })
  assignDate: Date;

  @Column({ length: 50, nullable: true })
  assignedBy: string;

  @Column({ type: 'timestamptz', nullable: true })
  expiryDate: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;
}
