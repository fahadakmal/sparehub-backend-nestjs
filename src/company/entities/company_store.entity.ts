import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { City } from 'src/common/modules/address/entities/city.entity';
import { Company } from './company.entity';
import { State } from '../../common/modules/address/entities/state.entity';

@Entity()
export class CompanyStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => Company, (company) => company.stores)
  company: Company;

  @Column()
  storeName: string;

  @Column()
  storeDisplayName: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @OneToOne(() => City)
  @JoinColumn()
  cityId: City;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @OneToOne(() => State)
  @JoinColumn()
  stateId: State;

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

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
