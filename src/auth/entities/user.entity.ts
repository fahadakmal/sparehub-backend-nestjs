import { Company } from 'src/company/entities/company.entity';
import { CompanyStatus } from 'src/common/constants/enums/save_company.enum';

import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user_role.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, length: 50, nullable: false })
  awsUsername: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ unique: true, length: 50, nullable: true })
  email: string;

  @Column({ default: false, nullable: true })
  isEmailVerified: boolean;

  @Column({ unique: true, length: 15, nullable: true })
  mobile: string;

  @Column({ default: false, nullable: true })
  isMobileVerified: boolean;

  @Column({ nullable: true })
  profilePhoto: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column({ length: 50, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  passwordResetCode: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, default: 0 })
  failedLoginAttempts: number;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ length: 2, nullable: true })
  language: string;

  @Column({ length: 10, default: 'disabled', nullable: true })
  status: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  @JoinColumn()
  userRoles: UserRole;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  public get isOnboardingCompleted(): boolean {
    return this.company
      ? this.company.status == CompanyStatus.DRAFT
        ? false
        : true
      : false;
  }
}
