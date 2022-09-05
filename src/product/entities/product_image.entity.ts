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

  @ManyToOne(() => Product, (product) => product.images, { nullable: false })
  product: Product;

  @Column({ length: 50, nullable: true })
  imageFileName: string;

  @Column({ length: 20, nullable: true })
  imageFileExt: string;

  @Column({ nullable: true })
  imageData: string;

  @Column({ length: 200, nullable: true })
  imagePath: string;

  @Column({ length: 50, nullable: true })
  imageType: string;

  @Column({ nullable: true })
  sortOrder: number;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
