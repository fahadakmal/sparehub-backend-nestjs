import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { City } from 'src/common/modules/address/entities/city.entity';
import { Company } from './company.entity';
import { State } from '../../common/modules/address/entities/state.entity';
import { Exclude } from 'class-transformer';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { ProductInventory } from 'src/product/entities/product_inventory.entity';

@Entity()
export class CompanyStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeName: string;

  @Column()
  storeDisplayName: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  coordinates: string;

  @Column({ length: 50, nullable: true })
  inchargeUsername: string;

  @Column({ length: 20, nullable: true })
  storePhone: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => State, (state) => state.companyStores, {
    eager: false,
  })
  state: State;

  @RelationId((companyStore: CompanyStore) => companyStore.state)
  stateId: number;

  @ManyToOne(() => Country, (country) => country.companyStores, {
    eager: false,
  })
  country: Country;

  @RelationId((companyStore: CompanyStore) => companyStore.country)
  countryId: number;

  @ManyToOne(() => City, (city) => city.companyStores, {
    eager: false,
  })
  city: City;
  @RelationId((companyStore: CompanyStore) => companyStore.city)
  cityId: number;

  @ManyToOne(() => Company, (company) => company.stores, { eager: false })
  company: Company;

  @OneToMany(
    () => ProductInventory,
    (productInventory) => productInventory.store,
    {
      eager: false,
    },
  )
  productToInventory: ProductInventory[];

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
