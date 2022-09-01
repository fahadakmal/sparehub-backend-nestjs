import { Exclude } from 'class-transformer';
import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
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

  @Column({ length: 50 })
  stateName: string;

  @Column({ length: 50 })
  stateNameAr: string;

  @Column({ length: 5, nullable: true })
  iso: string;

  @Column({ length: 5 })
  fips: string;

  @Column({ length: 50, nullable: true })
  capital: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @OneToMany(() => City, (city) => city.state)
  @JoinColumn()
  cities: City;

  @OneToMany(() => CompanyStore, (companyStore) => companyStore.state)
  companyStores: CompanyStore[];

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
