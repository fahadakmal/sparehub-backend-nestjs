import { UserRole } from 'src/auth/entities/user_role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  roleName: string;

  @Column({ nullable: true })
  roleDescription: string;

  @Column({ length: 10, nullable: true })
  moduleId: string;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    nullable: true,
  })
  @JoinTable({ name: 'role_permission' })
  permissions: Permission[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  @JoinColumn()
  userRoles: UserRole;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
