import { User } from 'src/auth/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
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

  @OneToMany(() => State, (state) => state.country)
  @JoinColumn()
  cities: City;

  @OneToMany(() => User, (user) => user.country)
  @JoinColumn()
  users: User;

  @OneToMany(() => Company, (state) => state.country)
  companies: Company[];
  @OneToMany(() => CompanyStore, (companyStore) => companyStore.country)
  companyStores: CompanyStore[];

  @OneToMany(() => Bank, (bank) => bank.country)
  banks: CompanyStore[];
}
