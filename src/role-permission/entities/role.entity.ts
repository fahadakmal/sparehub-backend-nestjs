import { Exclude } from 'class-transformer';
import { UserRole } from 'src/auth/entities/user_role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ length: 20 })
  roleName: string;

  @Exclude()
  @Column({ default: null })
  roleDescription: string;

  @Exclude()
  @Column({ length: 10 })
  module: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @ManyToMany((type) => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
