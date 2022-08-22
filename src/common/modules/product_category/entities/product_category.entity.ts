import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  nameAr: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 500 })
  descriptionAr: string;

  @Column({ length: 10 })
  code: string;

  @Column({ nullable: true })
  priceTiers: string;

  @Column({ nullable: true })
  images: string;

  @Column({ nullable: true })
  childCount: number;

  @Column({ nullable: true })
  itemCount: number;

  @Column({ default: null })
  parentId: number;

  @Column({ nullable: true })
  hierLevel: number;

  @Column({ nullable: true })
  sortOrder: number;

  @Column({ nullable: true })
  isActive: boolean;

  @ManyToMany(() => Product, (product) => product.categories, {
    eager: false,
  })
  products: Product[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
