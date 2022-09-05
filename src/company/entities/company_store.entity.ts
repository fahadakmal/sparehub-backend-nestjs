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
import { City } from 'src/common/modules/address/entities/city.entity';
import { Company } from './company.entity';
import { State } from '../../common/modules/address/entities/state.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { ProductInventory } from 'src/product/entities/product_inventory.entity';

@Entity('company_store')
export class CompanyStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column()
  storeName: string;

  @Column()
  storeDisplayName: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @ManyToOne(() => City, (city) => city.companyStores)
  city: City;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateId', referencedColumnName: 'stateCode' })
  state: State;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country', referencedColumnName: 'countryCode' })
  country: Country;

  @Column({ nullable: true })
  coordinates: string;

  @Column({ length: 50, nullable: true })
  inchargeUsername: string;

  @Column({ length: 20, nullable: true })
  storePhone: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(
    () => ProductInventory,
    (productInventory) => productInventory.store,
  )
  productToInventory: ProductInventory[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
