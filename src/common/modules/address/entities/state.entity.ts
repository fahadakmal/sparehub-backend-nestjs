import { Company } from 'src/company/entities/company.entity';
import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Country } from './country.entity';

@Entity('state')
export class State {
  @PrimaryColumn({ length: 10 })
  stateCode: string;

  @Column({ length: 50, nullable: false })
  stateName: string;

  @Column({ length: 50, nullable: true })
  stateNameAr: string;

  @Column({ length: 5, nullable: true })
  iso: string;

  @Column({ length: 5, nullable: true })
  fips: string;

  @Column({ length: 50, nullable: true })
  capital: string;

  @ManyToOne(() => Country, { nullable: false })
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @OneToMany(() => City, (city) => city.state)
  @JoinColumn()
  cities: City;

  @OneToMany(() => Company, (company) => company.state)
  @JoinColumn()
  companies: Company;

  @OneToMany(() => CompanyStore, (companyStore) => companyStore.state)
  @JoinColumn()
  companyStores: CompanyStore;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
