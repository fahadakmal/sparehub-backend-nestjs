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
} from 'typeorm';
import { State } from './state.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  cityName: string;

  @Column({ length: 50, nullable: true })
  cityNameAr: string;

  @ManyToOne((_type) => State, (state) => state.cities)
  state: State;

  @OneToMany((_type) => CompanyStore, (companyStore) => companyStore.city, {
    eager: false,
  })
  companyStores: CompanyStore[];

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
