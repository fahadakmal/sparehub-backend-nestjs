import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { City } from 'src/common/modules/address/entities/city.entity';
import { Company } from './company.entity';
import { State } from '../../common/modules/address/entities/state.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class CompanyStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => Company, (company) => company.stores, { eager: false })
  company: Company;

  @Column()
  storeName: string;

  @Column()
  storeDisplayName: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @ManyToOne((_type) => City, (city) => city.companyStores, {
    eager: true,
  })
  city: City;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @ManyToOne((_type) => State, (state) => state.companyStores, {
    eager: true,
  })
  state: State;

  @Column({ length: 2, nullable: true })
  country: string;

  @Column({ nullable: true })
  coordinates: string;

  @Column({ length: 50, nullable: true })
  inchargeUsername: string;

  @Column({ length: 20, nullable: true })
  storePhone: string;

  @Column({ length: 50, nullable: true })
  storeEmail: string;

  @Column({ nullable: false })
  saveAsDraft: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
