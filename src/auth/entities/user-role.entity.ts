import { Exclude } from 'class-transformer';
import { Role } from 'src/role-permission/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRole {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'timestamptz', default: null })
  expiryDate: Date;

  @Exclude()
  @Column({ default: null })
  assignedBy: number;

  @Exclude()
  @Column({ type: 'timestamptz', default: null })
  assignDate: Date;

  @Exclude()
  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { eager: true })
  role!: Role;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;
  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
