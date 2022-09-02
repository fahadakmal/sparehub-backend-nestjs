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

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ unique: true, length: 15 })
  mobile: string;

  @Column({ default: false })
  isMobileVerified: boolean;

  @Column({ nullable: true })
  profilePhoto: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 100 })
  passwordResetCode: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, default: 0 })
  failedLoginAttempts: number;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ length: 2, nullable: true })
  language: string;

  @Column({ length: 10, default: 'disabled' })
  status: string;

  @Column({ length: 40, nullable: true })
  userUid: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { eager: true })
  userRoles: UserRole[];

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
