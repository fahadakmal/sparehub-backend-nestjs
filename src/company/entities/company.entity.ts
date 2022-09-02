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
  RelationId,
} from 'typeorm';
import { City } from 'src/common/modules/address/entities/city.entity';
import { CompanyBank } from './company_bank.entity';
import { CompanyDocument } from './company_document.entity';
import { CompanyStore } from './company_store.entity';
import { State } from '../../common/modules/address/entities/state.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

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

  @ManyToOne(() => City, (city) => city.companyStores, {
    eager: false,
  })
  city: City;

  @RelationId((company: Company) => company.city)
  cityId: number;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @ManyToOne(() => State, (state) => state.companyStores, {
    eager: false,
  })
  state: State;

  @RelationId((company: Company) => company.state)
  stateId: number;

  @ManyToOne(() => Country, (country) => country.companies, {
    eager: false,
  })
  country: Country;

  @RelationId((company: Company) => company.country)
  countryId: number;

  @Column({ length: 50, nullable: false })
  status: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @OneToOne(() => CompanyBank, {
    eager: false,
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  @JoinColumn()
  bank: CompanyBank;

  @OneToMany(() => CompanyDocument, (document) => document.company, {
    eager: false,
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  documents: CompanyDocument[];

  @OneToMany(() => CompanyStore, (store) => store.company, {
    eager: false,
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  stores: CompanyStore[];

  @OneToMany(() => Product, (product) => product.company, {
    eager: false,
  })
  products: Product[];

  @OneToMany((_type) => User, (user) => user.company)
  @JoinColumn()
  users: User;
}
