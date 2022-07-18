import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
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

  @OneToOne((_type) => Company)
  @JoinColumn()
  company: Company;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
