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
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductFitment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.fitments)
  product: Product;

  @ManyToOne(() => CarMake)
  @JoinColumn({ name: 'make', referencedColumnName: 'make' })
  make: CarMake;

  @ManyToOne(() => CarModel)
  @JoinColumn({ name: 'model', referencedColumnName: 'model' })
  model: CarModel;

  @Column({ length: 50, nullable: true })
  variant: string;

  @Column('int', { array: true })
  modelYear: number[];

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
