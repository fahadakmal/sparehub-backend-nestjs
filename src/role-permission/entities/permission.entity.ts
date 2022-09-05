import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  permissionName: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 10 })
  module: string;

  @Column({ length: 20, default: null })
  code: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({ name: 'role_permission' })
  roles: Role[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
