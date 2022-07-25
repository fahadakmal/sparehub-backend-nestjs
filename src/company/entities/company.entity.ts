import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { City } from 'src/common/modules/address/entities/city.entity';
import { CompanyBank } from './company_bank.entity';
import { CompanyDocument } from './company_document.entity';
import { CompanyStore } from './company_store.entity';
import { State } from '../../common/modules/address/entities/state.entity';
import { Exclude } from 'class-transformer';
import { Country } from 'src/common/modules/address/entities/country.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  companyName: string;

  @Column({ length: 100 })
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

  @ManyToOne((_type) => City, (city) => city.companyStores, {
    eager: true,
  })
  city: City;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @ManyToOne((_type) => State, (state) => state.companyStores, {
    eager: true,
  })
  state: State;

  @ManyToOne((_type) => Country, (country) => country.companies, {
    eager: true,
  })
  country: Country;

  @Column({ length: 10, nullable: true })
  status: string;

  @Column({ nullable: false })
  saveAsDraft: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;

  @OneToOne(() => CompanyBank, { eager: true })
  @JoinColumn()
  bank: CompanyBank;

  @OneToMany((_type) => CompanyDocument, (document) => document.company, {
    eager: true,
  })
  documents: CompanyDocument[];

  @OneToMany((_type) => CompanyStore, (store) => store.company, { eager: true })
  stores: CompanyStore[];
}
