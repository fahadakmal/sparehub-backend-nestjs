import { Exclude } from 'class-transformer';
import { Company } from 'src/company/entities/company.entity';
import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Bank } from '../../bank/entities/bank.entity';
import { State } from './state.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  countryName: string;

  @Column({ length: 2, nullable: true })
  countryCode: string;

  @Column({ length: 50, nullable: true })
  countryNameAr: string;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany((_type) => State, (state) => state.country)
  states: State[];

  @OneToMany((_type) => Company, (state) => state.country)
  companies: Company[];
  @OneToMany((_type) => CompanyStore, (companyStore) => companyStore.country)
  companyStores: CompanyStore[];

  @OneToMany((_type) => Bank, (bank) => bank.country)
  banks: CompanyStore[];
}
