import { CarMake } from 'src/common/modules/car/entities/car_make.entity';
import { CarModel } from 'src/common/modules/car/entities/car_model.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_fitment')
export class ProductFitment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.fitments, { nullable: true })
  product: Product;

  @ManyToOne(() => CarMake, { nullable: true })
  @JoinColumn({ name: 'make', referencedColumnName: 'make' })
  make: CarMake;

  @ManyToOne(() => CarModel, { nullable: true })
  @JoinColumn({ name: 'model', referencedColumnName: 'model' })
  model: CarModel;

  @Column({ length: 50, nullable: true })
  variant: string;

  @Column('int', { array: true, nullable: true })
  modelYear: number[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
