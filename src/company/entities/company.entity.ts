import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { City } from './city.entity';
import { CompanyBank } from './company_bank.entity';
import { CompanyDocument } from './company_document.entity';
import { CompanyStore } from './company_store.entity';
import { Country } from './country.entity';
import { State } from './state.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  companyName: string;

  @Column({ length: 100, nullable: true })
  companyNameAr: string;

  @Column({ length: 100, nullable: true })
  displayName: string;

  @Column({ length: 100, nullable: true })
  displayNameAr: string;

  @Column({ length: 10, nullable: true })
  businessType: string;

  @Column({ length: 50, nullable: true })
  registrationNo: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ length: 50, nullable: true })
  inchargeUsername: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ length: 50, nullable: true })
  website: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @OneToOne(() => City)
  @JoinColumn()
  cityId: City;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @OneToOne(() => State)
  @JoinColumn()
  stateId: State;

  @Column({ length: 2, nullable: true })
  country: string;

  @Column({ length: 10, nullable: true })
  status: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany((_type) => CompanyBank, (bank) => bank.company)
  banks: CompanyBank[];

  @OneToMany((_type) => CompanyDocument, (document) => document.company)
  documents: CompanyDocument[];

  @OneToMany((_type) => CompanyStore, (store) => store.company)
  stores: CompanyStore[];
}
