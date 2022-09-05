import { User } from 'src/auth/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyStore } from 'src/company/entities/company_store.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Bank } from '../../bank/entities/bank.entity';
import { City } from './city.entity';
import { State } from './state.entity';

@Entity('country')
export class Country {
  @PrimaryColumn({ length: 2 })
  countryCode: string;

  @Column({ length: 50, nullable: false })
  countryName: string;

  @Column({ length: 50, nullable: true })
  countryNameAr: string;

  @Column({ length: 5, nullable: true })
  dialCode: string;

  @Column({ length: 5, nullable: true })
  mobilePrefix: string;

  @Column({ length: 3, nullable: true })
  countryCodeISO3: string;

  @Column({ nullable: true })
  IbanLength: number;

  @Column({ length: 2, nullable: true })
  flag: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany(() => State, (state) => state.country)
  @JoinColumn()
  states: State;

  @OneToMany(() => Product, (product) => product.country)
  @JoinColumn()
  products: Product;

  @OneToMany(() => State, (state) => state.country)
  @JoinColumn()
  cities: City;

  @OneToMany(() => User, (user) => user.country)
  @JoinColumn()
  users: User;

  @OneToMany(() => Company, (company) => company.country)
  @JoinColumn()
  companies: Company;

  @OneToMany(() => CompanyStore, (companyStore) => companyStore.country)
  @JoinColumn()
  companyStores: CompanyStore;

  @OneToMany(() => Bank, (bank) => bank.country)
  @JoinColumn()
  banks: Bank;
}
