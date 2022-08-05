import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  roleName: string;

  @Column()
  roleDescription: string;

  @Column({ length: 10 })
  module: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany((type) => Permission)
  @JoinTable()
  permissions: Permissions[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
