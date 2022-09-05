import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brand')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  brandName: string;

  @Column({ length: 50, nullable: true })
  brandNameAr: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  sortOrder: number;

  @Column({ default: true, nullable: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.brand, {
    eager: false,
  })
  products: Product[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
