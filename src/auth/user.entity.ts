import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  awsUserName: string;

  @Column({ unique: true, length: 50, nullable: true })
  email: string;

  @Column({ unique: true, length: 15, nullable: true })
  phoneNo: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, default: 0 })
  failedLoginAttempts: number;

  @Column({ length: 2, nullable: true })
  country: string;

  @Column({ length: 2, nullable: true })
  language: string;

  @Column({ length: 10, default: 'disabled' })
  status: string;

  @ManyToOne((_type) => Company, (company) => company.users)
  company: Company;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
