import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => CompanyStore, (store) => store.productToInventory, {
    eager: false,
  })
  store: CompanyStore;

  @RelationId((productInventory: ProductInventory) => productInventory.store)
  storeId: number;

  @ManyToOne(() => Product, (product) => product.productToInventory, {
    eager: false,
  })
  product: Product;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
