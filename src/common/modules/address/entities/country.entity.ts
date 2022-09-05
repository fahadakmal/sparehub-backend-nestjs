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

  @Column({ length: 50 })
  countryName: string;

  @Column({ length: 50 })
  countryNameAr: string;

  @Column({ length: 5 })
  dialCode: string;

  @Column({ length: 5 })
  mobilePrefix: string;

  @Column({ length: 3 })
  countryCodeSO3: string;

  @Column()
  IbanLength: number;

  @Column({ length: 2 })
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
