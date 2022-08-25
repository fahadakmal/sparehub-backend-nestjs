import { Company } from 'src/company/entities/company.entity';
import { Role } from 'src/role-permission/entities/role.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user_role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  awsUserName: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ unique: true, length: 15 })
  phoneNo: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, default: 0 })
  failedLoginAttempts: number;

  @Column({ length: 2, nullable: true })
  country: string;

  @Column({ length: 2, nullable: true })
  language: string;

  @Column({ length: 10, default: 'disabled' })
  status: string;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { eager: true })
  userRoles: UserRole[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
