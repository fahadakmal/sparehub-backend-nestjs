import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ length: 50, nullable: true })
  @Column({ nullable: false })
  saveAsDraft: boolean;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => State, (state) => state.companyStores, {
    eager: true,
  })
  state: State;

  @ManyToOne(() => Country, (country) => country.companyStores, {
    eager: true,
  })
  country: Country;

  @ManyToOne(() => City, (city) => city.companyStores, {
    eager: true,
  })
  city: City;

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
