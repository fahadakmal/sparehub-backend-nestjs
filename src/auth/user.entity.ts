import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  password: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ length: 15, nullable: true })
  mobile: string;

  @Column({ default: false })
  isMobileVerified: boolean;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ nullable: true })
  coId: number;

  @Column({ length: 100, nullable: true })
  passwordResetCode: string;

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

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
