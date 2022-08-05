import { Role } from 'src/role-permission/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column()
  role: Role;

  @Column({ type: 'timestamptz' })
  expiryDate: Date;

  @Column()
  assignedBy: User;

  @Column({ type: 'timestamptz' })
  assignDate: Date;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
