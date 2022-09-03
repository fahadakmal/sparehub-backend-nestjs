import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_image')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Column({ length: 50, default: null })
  imageFileName: string;

  @Column({ length: 20, default: null })
  imageFileExt: string;

  @Column({ default: null })
  imageData: string;

  @Column({ length: 200, default: null })
  imagePath: string;

  @Column({ length: 50, default: null })
  imageType: string;

  @Column({ default: null })
  sortOrder: number;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
