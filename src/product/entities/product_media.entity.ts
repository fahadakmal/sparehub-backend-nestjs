import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, default: null })
  imageFileName: string;

  @Column({ length: 50, default: null })
  imageFileExt: string;

  @Column({ default: null })
  imageData: string;

  @Column({ length: 200 })
  imagePath: string;

  @Column({ length: 50, default: null })
  imageType: string;

  @Column({ default: null })
  sortOrder: number;

  @ManyToOne(() => Product, (product) => product.mediaFiles, {
    eager: false,
  })
  product: Product;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
