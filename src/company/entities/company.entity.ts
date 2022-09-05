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
import { CompanyDocument } from './company_document.entity';
import { CompanyStore } from './company_store.entity';
import { State } from '../../common/modules/address/entities/state.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  companyName: string;

  @Column({ length: 100, nullable: true })
  companyNameAr: string;

  @Column({ length: 100, nullable: true })
  displayName: string;

  @Column({ length: 100, nullable: true })
  displayNameAr: string;

  @Column({ length: 10, nullable: false })
  businessType: string;

  @Column({ length: 50, nullable: true })
  registrationNo: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ length: 50, nullable: true })
  inchargeUsername: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ default: false, nullable: true })
  isEmailVerified: boolean;

  @Column({ length: 100, nullable: true })
  website: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @ManyToOne(() => City, (city) => city.companyStores, { nullable: true })
  city: City;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @ManyToOne(() => State, { nullable: true })
  @JoinColumn({ name: 'stateCode', referencedColumnName: 'stateCode' })
  state: State;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ length: 50, nullable: false })
  status: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany(() => CompanyDocument, (document) => document.company, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  @JoinColumn()
  documents: CompanyDocument[];

  @OneToMany(() => CompanyStore, (store) => store.company, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  stores: CompanyStore[];

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @OneToMany(() => User, (user) => user.company)
  @JoinColumn()
  users: User;
}
