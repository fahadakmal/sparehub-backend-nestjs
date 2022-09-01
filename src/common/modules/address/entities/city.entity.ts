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
  JoinColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { State } from './state.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  cityName: string;

  @Column({ length: 50 })
  cityNameAr: string;

  @Column({ length: 10 })
  stateCode1: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateCode', referencedColumnName: 'stateCode' })
  state: State;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @OneToMany(() => CompanyStore, (companyStore) => companyStore.city)
  companyStores: CompanyStore[];

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
