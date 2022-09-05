import { Company } from 'src/company/entities/company.entity';
import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { State } from './state.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  cityName: string;

  @Column({ length: 50, nullable: true })
  cityNameAr: string;

  @Column({ length: 10, nullable: true })
  stateCode1: string;

  @ManyToOne(() => State, { nullable: false })
  @JoinColumn({ name: 'stateCode', referencedColumnName: 'stateCode' })
  state: State;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @OneToMany(() => CompanyStore, (companyStore) => companyStore.city)
  companyStores: CompanyStore[];

  @OneToMany(() => Company, (companyStore) => companyStore.city)
  companies: Company[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
