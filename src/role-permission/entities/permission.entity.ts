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

  @Column({ length: 50, nullable: true })
  permissionName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @Column({ length: 10, nullable: true })
  module: string;

  @Column({ length: 20, nullable: true })
  code: string;

  @ManyToMany(() => Role, (role) => role.permissions, { nullable: true })
  @JoinTable({ name: 'role_permission' })
  roles: Role[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
