import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('prod_type')
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  sortOrder: number;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @Column({ length: 500, nullable: true })
  text1Att: string;

  @Column({ length: 500, nullable: true })
  text2Att: string;

  @Column({ length: 500, nullable: true })
  text3Att: string;

  @Column({ length: 500, nullable: true })
  text4Att: string;

  @Column({ length: 500, nullable: true })
  text5Att: string;

  @Column({ length: 500, nullable: true })
  num1Att: string;

  @Column({ length: 500, nullable: true })
  num2Att: string;

  @Column({ length: 500, nullable: true })
  date1Att: string;

  @Column({ length: 500, nullable: true })
  date2Att: string;

  @Column({ length: 500, nullable: true })
  id1Att: string;

  @Column({ length: 500, nullable: true })
  id2Att: string;

  @Column({ length: 500, nullable: true })
  id3Att: string;

  @Column({ length: 500, nullable: true })
  id4Att: string;

  @Column({ length: 500, nullable: true })
  listId1Att: string;

  @OneToMany(() => Product, (product) => product.type)
  @JoinColumn()
  products: Product;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
