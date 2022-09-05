import { CompanyStore } from 'src/company/entities/company_store.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_inventory')
export class ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => CompanyStore, (store) => store.productToInventory, {
    nullable: true,
  })
  store: CompanyStore;

  @ManyToOne(() => Product, (product) => product.productToInventory, {
    nullable: true,
  })
  product: Product;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
